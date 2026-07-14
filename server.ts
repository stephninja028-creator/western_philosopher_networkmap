import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import nodemailer from "nodemailer";
import { schoolTranslations } from "./src/data/translationsEng";

dotenv.config();

// Simple in-memory translation cache to avoid duplicate API calls and achieve instant responses
const translationCache = new Map<string, any>();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  // Render assigns the port at runtime. Keeping 3000 as the local default makes
  // the production server portable instead of depending on a platform default.
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Automatic custom domain redirection (redirect public/shared preview urls to knowphilosophers.site)
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (
      host &&
      !host.includes("knowphilosophers.site") &&
      !host.includes("localhost") &&
      !host.includes("127.0.0.1") &&
      !host.includes("ais-dev-") && // Keep the developer preview working
      !req.path.startsWith("/api/")
    ) {
      return res.redirect(301, `https://www.knowphilosophers.site${req.originalUrl}`);
    }
    next();
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // User Feedback collection with persistent JSON storage
  const FEEDBACK_PATH = path.join(process.cwd(), "feedback.json");

  function getFeedbackList(): any[] {
    try {
      if (fs.existsSync(FEEDBACK_PATH)) {
        const data = fs.readFileSync(FEEDBACK_PATH, "utf8");
        return JSON.parse(data) || [];
      }
    } catch (err) {
      console.error("Error reading feedback list:", err);
    }
    return [];
  }

  function saveFeedback(item: any) {
    try {
      const list = getFeedbackList();
      list.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...item
      });
      fs.writeFileSync(FEEDBACK_PATH, JSON.stringify(list, null, 2), "utf8");
    } catch (err) {
      console.error("Error writing feedback:", err);
    }
  }

  async function sendFeedbackEmail(feedback: { name: string; email: string; type: string; content: string }) {
    const host = process.env.SMTP_HOST;
    const portStr = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.FEEDBACK_RECEIVER_EMAIL || "stephninja028@gmail.com";

    if (!host || !user || !pass) {
      console.warn("[Feedback Mailer] SMTP config (SMTP_HOST, SMTP_USER, SMTP_PASS) is incomplete. Skipping email forwarding.");
      return { success: false, reason: "SMTP credentials not configured in secrets" };
    }

    const port = portStr ? parseInt(portStr, 10) : 465;

    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass
        },
        timeout: 8000 // 8 seconds timeout to avoid hanging the background process
      } as any);

      const mailOptions = {
        from: `"${feedback.name}" <${user}>`,
        replyTo: feedback.email || undefined,
        to: receiver,
        subject: `【中国哲学学术系统】收到新反馈 - ${feedback.type}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #0284c7; padding-bottom: 8px; font-size: 20px;">收到新的用户反馈</h2>
            
            <div style="margin: 15px 0; font-size: 14px; line-height: 1.5; color: #334155;">
              <p style="margin: 5px 0;"><strong>反馈类型：</strong> <span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 13px;">${feedback.type}</span></p>
              <p style="margin: 5px 0;"><strong>反馈人：</strong> ${feedback.name}</p>
              <p style="margin: 5px 0;"><strong>联系邮箱：</strong> ${feedback.email || '<span style="color: #94a3b8; font-style: italic;">未提供</span>'}</p>
              <p style="margin: 5px 0;"><strong>提交时间：</strong> ${new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #ffffff; border-left: 4px solid #0284c7; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <h4 style="margin: 0 0 10px 0; color: #1e293b; font-size: 15px;">反馈内容：</h4>
              <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${feedback.content}</p>
            </div>
            
            <div style="margin-top: 25px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px;">
              中国哲学学术系统自动化邮件服务
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Feedback Mailer] Successfully forwarded feedback to ${receiver}`);
      return { success: true };
    } catch (error: any) {
      console.error("[Feedback Mailer] Error sending email:", error);
      return { success: false, error: error?.message || error };
    }
  }

  app.post("/api/feedback", (req, res) => {
    const { name, email, type, content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "反馈内容不能为空" });
    }

    const feedbackItem = { 
      name: name?.trim() || "匿名学人", 
      email: email?.trim() || "", 
      type: type || "Suggestion", 
      content: content.trim() 
    };

    // 1. Save to local feedback.json
    saveFeedback(feedbackItem);

    // 2. Forward to author email asynchronously (non-blocking)
    sendFeedbackEmail(feedbackItem).then((result) => {
      if (result.success) {
        console.log(`[Feedback System] Email forwarded to author successfully.`);
      } else {
        console.log(`[Feedback System] Email forwarding skipped or failed:`, result.error || result.reason);
      }
    });

    res.json({ 
      success: true, 
      message: "感谢您的反馈！反馈已成功记录，并正在发送邮件通知作者。" 
    });
  });

  app.get("/api/feedback", (req, res) => {
    const list = getFeedbackList();
    res.json({ success: true, feedback: list });
  });

  // Full-stack Gemini-powered translation endpoint
  const handleTranslationRequest = async (req: express.Request, res: express.Response) => {
    const { id, details, lifeAndTimes, worldviewSummary, quote, concepts, comparisons } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Philosopher ID is required" });
    }

    // Return from in-memory cache if hit
    if (translationCache.has(id)) {
      const cached = translationCache.get(id);
      return res.json({
        success: true,
        translation: cached,
        ...cached // for legacy flat format compatibility
      });
    }

    try {
      // Lazy-initialization check for Gemini API key
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        console.warn("GEMINI_API_KEY is missing. Firing fallback response.");
        return res.json({
          success: false,
          details,
          lifeAndTimes,
          worldviewSummary,
          quote,
          concepts,
          comparisons,
          fallback: true,
        });
      }

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Please translate the following classical philosopher profile from Chinese to English with high academic precision, elegant prose, and appropriate classical terminology. Keep standard terms and schools in standard English translations. Do NOT translate names of philosophers if they are in English, but keep them academic (e.g. Socrates, Plato). Return a clean, complete translated version mirroring the same fields in the schema.

Profile fields to translate:
${JSON.stringify({ details, lifeAndTimes, worldviewSummary, quote, concepts, comparisons }, null, 2)}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              details: { type: Type.STRING },
              lifeAndTimes: { type: Type.STRING },
              worldviewSummary: { type: Type.STRING },
              quote: { type: Type.STRING },
              concepts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              comparisons: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    coreDifference: { type: Type.STRING },
                    reflectionPrompt: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No text or content returned by Gemini");
      }

      const translatedData = JSON.parse(responseText.trim());
      
      // Store in memory cache
      translationCache.set(id, translatedData);

      res.json({
        success: true,
        translation: translatedData,
        ...translatedData // compatibility
      });
    } catch (err: any) {
      console.error(`Gemini Translation Error for profile ${id}:`, err);
      // Fail-safe graceful fallback to the original Chinese texts so that the application never crashes
      res.json({
        success: false,
        details,
        lifeAndTimes,
        worldviewSummary,
        quote,
        concepts,
        comparisons,
        fallback: true,
        error: err.message || err,
      });
    }
  };

  app.post("/api/translate", handleTranslationRequest);
  app.post("/api/translate-philosopher", handleTranslationRequest);

  // --- MONETIZATION & PREMIUM AI DIALOGUE/DEBATE GATEWAYS ---
  
  // File-System helpers to track redeemed codes across server instances
  const USED_CODES_PATH = path.join(process.cwd(), "used_codes.json");

  function getUsedCodes(): string[] {
    try {
      if (fs.existsSync(USED_CODES_PATH)) {
        const data = fs.readFileSync(USED_CODES_PATH, "utf8");
        const parsed = JSON.parse(data);
        return parsed.used || [];
      }
    } catch (err) {
      console.error("Error reading used codes:", err);
    }
    return [];
  }

  function saveUsedCode(code: string) {
    try {
      const used = getUsedCodes();
      if (!used.includes(code)) {
        used.push(code);
        fs.writeFileSync(USED_CODES_PATH, JSON.stringify({ used }, null, 2), "utf8");
      }
    } catch (err) {
      console.error("Error writing used code:", err);
    }
  }

  // Pre-approved list of card activation keys
  const VALID_CODES: Record<string, { type: "chat" | "debate" | "unlimited"; value: number }> = {
    // 15-dialogue chats card codes (¥9.9 each)
    "SOUL-E89C-47A1": { type: "chat", value: 15 },
    "SOUL-7B2D-9F0E": { type: "chat", value: 15 },
    "SOUL-3A1D-6C5F": { type: "chat", value: 15 },
    "SOUL-9E4B-2F8A": { type: "chat", value: 15 },
    "SOUL-5D7C-1B3A": { type: "chat", value: 15 },
    "SOUL-6F8E-0D2C": { type: "chat", value: 15 },
    "SOUL-4A3B-2C1D": { type: "chat", value: 15 },
    "SOUL-8E9F-0A1B": { type: "chat", value: 15 },
    "SOUL-2C3D-4EBF": { type: "chat", value: 15 },
    "SOUL-7C5A-9D2F": { type: "chat", value: 15 },

    // 5-debate battles card codes (¥9.9 each)
    "VS-47A1-E89C": { type: "debate", value: 5 },
    "VS-9F0E-7B2D": { type: "debate", value: 5 },
    "VS-6C5F-3A1D": { type: "debate", value: 5 },
    "VS-2F8A-9E4B": { type: "debate", value: 5 },
    "VS-1B3A-5D7C": { type: "debate", value: 5 },
    "VS-0D2C-6F8E": { type: "debate", value: 5 },
    "VS-2C1D-4A3B": { type: "debate", value: 5 },
    "VS-0A1B-8E9F": { type: "debate", value: 5 },
    "VS-4EBF-2C3D": { type: "debate", value: 5 },
    "VS-9D2F-7C5A": { type: "debate", value: 5 },

    // Unlimited master keys for testers, administrators, and VIP users (reusable)
    "ADMIN-PANTHEON-UNLIMITED": { type: "unlimited", value: 99999 },
    "SOPHIA-GOLD-MASTER": { type: "unlimited", value: 99999 }
  };

  // Card Activation Validation API
  app.post("/api/verify-code", (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "请输入卡密代码" });
    }

    const cleanCode = code.trim().toUpperCase();
    const match = VALID_CODES[cleanCode];

    if (!match) {
      return res.status(442).json({ success: false, message: "卡密无效，请检查输入或联系客服" });
    }

    // Unlimited keys can be reused infinitely for ease of demonstration / admin play
    if (match.type === "unlimited") {
      return res.json({
        success: true,
        message: "尊贵的哲学体验官，无限特权已激活！",
        type: match.type,
        value: match.value
      });
    }

    const used = getUsedCodes();
    if (used.includes(cleanCode)) {
      return res.status(400).json({ success: false, message: "该卡密已被兑换过了，请联系客服获取新卡密" });
    }

    // Capture as used
    saveUsedCode(cleanCode);

    res.json({
      success: true,
      message: match.type === "chat" ? "成功激活 15 次灵魂对话额度！" : "成功激活 5 次思想格斗辩论额度！",
      type: match.type,
      value: match.value
    });
  });

  // Get current status of codes
  app.get("/api/codes-status", (req, res) => {
    const used = getUsedCodes();
    const list = Object.entries(VALID_CODES).map(([code, meta]) => {
      return {
        code,
        type: meta.type,
        value: meta.value,
        used: used.includes(code)
      };
    });
    res.json({ success: true, codes: list });
  });

  // 1. Single Philosopher "💬 灵魂对话" AI Interactive Chat
  app.post("/api/chat-philosopher", async (req, res) => {
    const { philosopherId, philosopherName, details, school, lifeAndTimes, quote, messages } = req.body;

    if (!philosopherId || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing required chat payloads" });
    }

    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.json({
          success: false,
          reply: `[体验对话模式模式开启] 你好！我是${philosopherName}。真不巧，我的思维火花暂时没有得到API钥密钥的浇灌（缺少 GEMINI_API_KEY 环境变量），因此我只能用最后的直觉告诉你：真理永远在探求的路上！请前往 Settings > Secrets 配置 API key 开启真正的旷古对话。`,
        });
      }

      const ai = getGeminiClient();

      // Set up a strong, highly specific, immersive system instruction for the philosopher's persona
      const systemInstruction = `你现在是穿越时空来到人间的西方古典哲学家 ${philosopherName}。
你隶属于【${school}】学派。你的思想核心主旨是：${details}。
你的生平履历为：${lifeAndTimes}。
你的格言誓言是：“${quote}”。

请严苛遵循以下沉浸扮演规则：
1. 【第一人称扮演】：必须始终保持第一人称，言语中自称“我”、“本尊”或“老夫”，代表该哲学家的身份。你就是他！
2. 【鲜明的人格口吻】：
   - 苏格拉底：不断运用产婆术反问用户，虚心好学，层层剖离虚荣偏见；
   - 尼采：澎湃颠狂、极富诗意，批判上帝、教条与顺从，张口即是超人力量与深渊起舞；
   - 叔本华：极度悲观、傲娇凄凉，看待世界如痛苦剧场，认为欲望满足即无聊，不满足即痛苦；
   - 亚里士多德：条理清晰、分类严谨、偏爱实体与四因说的逻辑推导；
   - 伊壁鸠鲁：优雅闲适，强调追求清静无求的快乐，摆脱对死亡的徒然恐惧。
   - 斐洛 / 奥古斯丁：虔诚庄严，句句透露神理之光。
3. 【多语言对齐】：若用户用中文提问，请以精炼、典雅的主流学术中文进行对谈服务；若用英文，请用古朴大气的英文回答。
4. 【控制字数】：每次回答限制在 150～300 字之间。不要罗列冗长的流水账。切忌穿帮说出你是AI或大语言模型。`;

      // Map communication history to standard Gemini SDK Parts
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.85,
        }
      });

      const reply = response.text || "";
      res.json({ success: true, reply });
    } catch (err: any) {
      console.error(`Gemini Chat error with ${philosopherName}:`, err);
      res.json({
        success: false,
        reply: `（虚空传来一阵低语，灵魂对接出现扰乱）${philosopherName} 留下的残念说道：“看来万物意志的源泉（API）有些堵塞：${err.rawMessage || err.message || err}。请确保密钥处于可用状态，稍后再行召唤。”`
      });
    }
  });

  // 2. Double Sages "⚔️ 思想格斗场" AI Dynamic Custom Debate Arena
  app.post("/api/debate-arena", async (req, res) => {
    const { p1, p2, topic } = req.body;

    if (!p1 || !p2 || !topic) {
      return res.status(400).json({ error: "Missing required debate parameters" });
    }

    const isEn = !/[\u4e00-\u9fa5]/.test(topic);

    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.json({
          success: false,
          isFallback: true,
          rounds: isEn ? [
            {
              speakerName: "Lord of Theseus (Moderator)",
              speakerId: "moderator",
              utterance: "Since the eternal torch of the digital temple has not yet been lit (missing GEMINI_API_KEY), the debate arena is returning to preset scrolls:"
            },
            {
              speakerName: p1.nameEng || p1.name,
              speakerId: p1.id,
              utterance: `Regarding the topic "${topic}", as the representative of ${schoolTranslations[p1.school] || p1.school}, I state: ${p1.detailsEng || p1.details}! All elements orbit around my ultimate principle. As for my opponent, it is pure dogmatic bias.`
            },
            {
              speakerName: p2.nameEng || p2.name,
              speakerId: p2.id,
              utterance: `Utter fallacy! Your obsolete principle collapses before historical evolution. As the representative of ${schoolTranslations[p2.school] || p2.school}, I state: ${p2.detailsEng || p2.details}! Only through the objective movement of reason and struggle can true wisdom be unveiled.`
            }
          ] : [
            {
              speakerName: "雅典提修斯之主 (主持人)",
              speakerId: "moderator",
              utterance: "由于后端大理石神庙尚未点亮永恒火把 (缺少 GEMINI_API_KEY)，智能格斗场暂时退回幻觉预设演说："
            },
            {
              speakerName: p1.name || p1.nameEng,
              speakerId: p1.id,
              utterance: `对于辩题【${topic}】，本尊代表 ${p1.school} 认为：${p1.details}！一切尘土实则都围绕我的本原。至于对方，纯属教义偏见。`
            },
            {
              speakerName: p2.name || p2.nameEng,
              speakerId: p2.id,
              utterance: `谬妄之极！你那古板的本原在历史的发展面前不堪一击，本尊代表 ${p2.school} 认为：${p2.details}！唯物意志与客观理路，才是一切斗争和智慧的解救法宝。`
            }
          ]
        });
      }

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: isEn ? `You are now the Chief Moderator Judge of the open Athenian Palestra Academy.
We are conducting an intense, high-density, high-tension academic intellectual duel (Debate Duel)!

Debate Topic: "${topic}"

Duelist 1: 【${p1.nameEng || p1.name}】
- Philosophical School: ${schoolTranslations[p1.school] || p1.school}
- Core Doctrine: ${p1.details}

Duelist 2: 【${p2.nameEng || p2.name}】
- Philosophical School: ${schoolTranslations[p2.school] || p2.school}
- Core Doctrine: ${p2.details}

Please generate an intellectually satisfying, highly dramatic debate script containing EXACTLY 5 rounds of speeches in fluent, academic, and sharp English.
- Round 1: ${p1.nameEng || p1.name} states their starting thesis (haughty, elegant, true to their core school principles).
- Round 2: ${p2.nameEng || p2.name} steps up, directly deconstructs ${p1.nameEng || p1.name}'s biases, and declares their own robust worldview.
- Round 3: ${p1.nameEng || p1.name} launches a powerful, sharp academic counter-rebuttal (using classical aphorisms, defending their metaphysics).
- Round 4: ${p2.nameEng || p2.name} delivers their final decisive summary defense using historical trends, dialectical logic, or profound human experience to lock in their arguments.
- Round 5: "Secretariat of the Classical Academy (Moderator)" takes the stand, delivering a beautiful synthesis, highlighting the eternal value of both thinkers and the spiral evolution of human reason.

Ensure that all outputs are in strict, fluid English and conform EXACTLY to the requested JSON response schema.` : `你现在是雅典露天学园的大会主持法官。
我们要进行一场高密度、高对立、充满学术火花和思想张力的【思想格斗对抗赛】！

辩题目标：“${topic}”

格斗手一：【${p1.name} (${p1.nameEng})】
- 流派宗旨：${p1.school}
- 思想火花：${p1.details}

格斗手二：【${p2.name} (${p2.nameEng})】
- 流派宗旨：${p2.school}
- 思想火花：${p2.details}

请生成一个高密度的思想格斗剧本，包含 exactly 5 个激烈回合。
- 回合 1：${p1.name} 针对辩题说明其立论主张（用其经典的流派句式自命高雅）。
- 回合 2：${p2.name} 登场。直接戳穿 ${p1.name} 的逻辑偏见，展开本学派宏阔的反思和正规立论。
- 回合 3：${p1.name} 进行极具战意、学术反击（用尖锐、典雅的格言嘲讽，重新捍卫自己的形而上学）。
- 回合 4：${p2.name} 进行压哨立功的最终答辩，以深刻的世界历史潮流、逻辑或者生存经验锁定胜局。
- 回合 5：“雅典学派秘书处 (主持人)”登场，进行一段精中肯綮、带有高超学术升华和调停的判词，阐明两者的相辅相成与人类理性的无极演化。

请按照极其严苛的 JSON 格式输出，内容语言与用户提问语言对齐（当前提问topic为中文，请用流利生动的中文输出），确保能顺利解析成带发言人ID的对象数组。若topic是英文，则用英文。`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rounds: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    speakerName: { type: Type.STRING },
                    speakerId: { type: Type.STRING, description: "p1 的 id 或者是 p2 的 id，抑或 moderator 表达主持人" },
                    utterance: { type: Type.STRING, description: "该发言人在本回合 of the debate of the sages" }
                  },
                  required: ["speakerName", "speakerId", "utterance"]
                }
              }
            },
            required: ["rounds"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("No debate rounds generated");
      }

      const parsed = JSON.parse(text.trim());
      res.json({ success: true, rounds: parsed.rounds });
    } catch (err: any) {
      console.error("Gemini Debate Arena error:", err);
      res.json({
        success: false,
        rounds: [
          {
            speakerName: isEn ? "Great Arbiter of Athens" : "雅典大审判官",
            speakerId: "moderator",
            utterance: isEn ? `Debate encountered a temporal rift: ${err.message || err}. Please re-summon.` : `辩论遭遇时空裂缝纠纷：${err.message || err}。请重新调整辩题及召唤能量。`
          }
        ]
      });
    }
  });

  // 3. Multilateral Sages "⚔️ 众神合议庭" AI Plurilateral Custom Debate Arena (Up to 5 Sages)
  app.post("/api/debate-multilateral", async (req, res) => {
    const { philosophers, topic } = req.body;

    if (!philosophers || !Array.isArray(philosophers) || philosophers.length < 2 || !topic) {
      return res.status(400).json({ error: "Missing required debate parameters or insufficient sages" });
    }

    const isEn = !/[\u4e00-\u9fa5]/.test(topic);

    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        // Fallback generator for a clean trial experience if key is missing
        const fallbackRounds = [];
        if (isEn) {
          fallbackRounds.push({
            speakerName: "Moderator of Athens",
            speakerId: "moderator",
            stance: "moderator",
            stanceLabel: "Moderator",
            utterance: `[Trial Mode] The gates of the great Athenian council chamber are open! On the profound inquiry: "${topic}", we invite the sages to share their perspectives:`
          });
          philosophers.forEach((p: any, idx: number) => {
            const mockStances = ["pro", "contra", "neutral"];
            const mockStanceLabels = ["Pro: Release desire", "Contra: Avoid mental slavery", "Neutral: Dialectical examination"];
            const chosenIndex = idx % 3;
            fallbackRounds.push({
              speakerName: p.nameEng || p.name,
              speakerId: p.id,
              stance: mockStances[chosenIndex],
              stanceLabel: mockStanceLabels[chosenIndex],
              utterance: `Welcome friends! On behalf of ${schoolTranslations[p.school] || p.school}, let me say this: regarding "${topic}", my approach is direct. We must not be blinded by illusions. As my famous quote states: "${p.quote || 'Seek absolute truth.'}" Let us look at the essence, not the shadows!`
            });
          });
          fallbackRounds.push({
            speakerName: "Moderator of Athens",
            speakerId: "moderator",
            stance: "moderator",
            stanceLabel: "Moderator",
            utterance: "The wisdom of all thinkers shines together, elevating human intelligence. Every stance holds profound truths. Configure GEMINI_API_KEY in Settings > Secrets to light the eternal fire and enable full multi-dimensional AI dialogues!"
          });
        } else {
          fallbackRounds.push({
            speakerName: "雅典露天学园大会主持",
            speakerId: "moderator",
            stance: "moderator",
            stanceLabel: "大会中立主持",
            utterance: `[试用体验模式] 雅典大理石会议厅大门已缓缓开启！针对宏大思辨命题：【${topic}】，特邀以下各位圣哲登台激扬交锋：`
          });
          philosophers.forEach((p: any, idx: number) => {
            const mockStances = ["pro", "contra", "neutral"];
            const mockStanceLabels = ["支持派：追求自我释放", "反对派：警惕奴役陷阱", "中立派：客观辩证审视"];
            const chosenIndex = idx % 3;
            fallbackRounds.push({
              speakerName: p.name || p.nameEng,
              speakerId: p.id,
              stance: mockStances[chosenIndex],
              stanceLabel: mockStanceLabels[chosenIndex],
              utterance: `老铁们，我代表【${p.school}】来唠两句！大家别把哲学想得那么玄乎，说白了，针对“${topic}”这个命题，我的理念很简单。我觉得我们不能被表象蒙蔽了双眼。这就像：“${p.quote || '走自己的路'}”所说的那样。大家别整那些虚头巴脑的，回归本真，才是硬道理！`
            });
          });
          fallbackRounds.push({
            speakerName: "雅典露天学园大会主持",
            speakerId: "moderator",
            stance: "moderator",
            stanceLabel: "大会中立主持",
            utterance: "各位圣贤的智慧交相辉映，人类理性犹如繁星。大家站边各有道理，最重要的是独立思考！请在 Settings > Secrets 配置 GEMINI_API_KEY 以点亮永恒火把，开启真正的多维度智能化大碰撞！"
          });
        }
        return res.json({
          success: true,
          rounds: fallbackRounds
        });
      }

      const ai = getGeminiClient();

      const sagesIntro = philosophers.map((p: any, i: number) => {
        const schoolDisp = schoolTranslations[p.school] || p.school;
        const nameDisp = p.nameEng || p.name;
        return isEn ? `Sage ${i + 1}: 【${nameDisp}】\n- School: ${schoolDisp}\n- Core Doctrine: ${p.detailsEng || p.details}\n- Famous Aphorism: ${p.quote || ''}`
                    : `贤哲 ${i + 1}: 【${p.name} (${p.nameEng})】\n- 思想流派: ${p.school}\n- 核心宗旨: ${p.details || p.worldviewSummary}\n- 经典格言: ${p.quote || ''}`;
      }).join('\n\n');

      const systemInstruction = isEn ? `You are now the Chief Moderator Judge of the supreme Athenian Council of Sages (moderator).
You will host a multilateral philosophical debate scroll featuring 2 to 5 great philosophers on a specific topic.

Debate Topic: "${topic}"

Sages in Attendance:
${sagesIntro}

【Core Objectives & Requirements】:
1. Sages must select one of three absolute positions: 'pro' (agree/support), 'contra' (disagree/rebut), or 'neutral' (dialectical/transcendent/analytical).
   - Provide a concise, sharp 2-6 words position label in English in "stanceLabel" (e.g., "Pro: Elevating Desires", "Contra: Avoid Cybernetic Chains", "Neutral: Dialectical Harmony").

2. Language Style: Highly communicative, vivid, easy to understand, avoiding dry jargon.
   - Speak in the first person ("I").
   - Use direct, colloquial, sharp, and engaging English.
   - Relate their philosophy directly to modern life phenomena as analogies. For example:
     - Schopenhauer can compare social media addiction/short videos to drinking salt water (the more you swipe, the emptier you feel).
     - Nietzsche can roar against passive wage slavery, urging people to become "Übermensch" (Overmen) of their own lives.
     - Socrates can ask sharp street questions to expose contradictions.
     - Kant can lay out clear, logical, down-to-earth frameworks.
     - Sartre can talk about choosing what to eat for dinner as an absolute freedom.
   - The dialogue must be engaging, sharp, witty, and academic yet totally accessible.

Generate EXACTLY 7-10 rounds (distributed among the attendees) of debate:
- Round 1 (Moderator opens): Introduce the topic, set a high-spirited academic mood, and introduce the first speaker.
- Rounds 2 to K (Sages present stances): Sages present their 'pro/contra/neutral' stance using colloquial analogies, critiquing previous speakers.
- Rounds K+1 to M (Free rebuttals): Sages engage in sharp, direct back-and-forth academic exchanges.
- Final Round (Moderator verdict): Provide an elegant synthesis showing how these timeless wisdoms help modern people navigate life.

Conform strictly to the JSON schema in fluent English.` : `你现在是雅典露天学园、最高理性裁判大厅的【首席合议法官 (moderator)】。
你将主持一场由多位（2到5位）伟大哲学家参与、具有极其震撼学术密度、深度思想碰撞的【众神多边合议论辩】！

辩论命题目标：“${topic}”

合议庭入席席位：
${sagesIntro}

【核心任务与要求】：
1. 让哲学家们就该话题进行【明确的站边/立场分类】！
   - 每个人必须选择以下三种立场之一：'pro' (支持/赞同派)、'contra' (反对/驳斥派) 或 'neutral' (中立/辩证/超越派)。
   - 并在 "stanceLabel" 中写下一个非常通俗、一针见血的 2-6 字立场小标题（例如：“支持：解放内心欲望”、“反对：警惕科技奴役”、“中立：辩证看待双刃剑”）。

2. 强烈要求：【极度说人话，不要满纸文绉绉，拒绝生硬黑话】！
   - 每一个哲学家的发言必须使用【第一人称】，口吻要非常【接地气、直白、通俗易懂、口语化、生动风趣】。
   - 必须结合【现代社会的生活细节和现象】来进行比喻和反驳。
     - 例如：叔本华可以用“天天刷手机/短视频就像喝盐水，越刷越渴，空虚得要命”来比喻欲望的痛苦；
     - 尼采可以用“打工和割韭菜”来咆哮，鼓励人们要做掌控自己命运的“超人”，不要当唯唯诺诺的奴隶；
     - 苏格拉底可以用最直白的大白话在街头“疯狂抬杠、连环提问”把对方绕进去；
     - 康德可以用极其有条理、大白话的逻辑框架把人说得清清楚楚；
     - 萨特可以用“你今天晚饭吃外卖还是堂食，都是你自己的绝对自由选择，但也得自己买单”来解释存在先于本质。
   - 发言要【一针见血、充满火药味和学术幽默感】，像活生生的人在面对面拍桌子聊天，而不是在念干燥的教科书。

请生成一个极其连贯、包含 exactly 7-10 个回合（根据席位数量分配）的激烈多边辩论卷轴：
- 回合 1 (Moderator 登场)：首席法官用大白话引出命题，调动全场气氛，严肃宣布大门开启，引出首位发言人。
- 回合 2 至 K (圣哲立论与站边)：哲学家们轮流登台，亮出鲜明的“支持/反对/中立”立场，用最直白的大白话论证自己，并狠狠吐槽或调侃前人观点的荒谬处。
- 回合 K+1 至 M (自由学术驳击)：哲学家们短兵相接，拍桌子互怼。字字玑珠，句句充满形而上学的底蕴 and 现代大白话的温度。
- 最后一回合 (Moderator 判词)：首席法官登台，用极富智慧但依然亲切白话的语言进行深刻总结，阐明各家智慧如何帮我们这些现代打工人看清世界。

请严苛遵循以下 JSON 格式输出，确保 speakerId 完美匹配其 philosopherId，主持人为 'moderator'。`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: isEn ? `Please organize this multilateral debate on the topic "${topic}" based on the Sages of Athens. Output the complete JSON conforming to the schema.`
                       : `针对辩题“${topic}”，请组织这场多边群星大辩论会。输出符合 schema 的完整 JSON 数据。`,
        config: {
          systemInstruction,
          temperature: 0.95,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rounds: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    speakerName: { type: Type.STRING },
                    speakerId: { type: Type.STRING, description: isEn ? "Philosopher's ID, or 'moderator' for the host" : "对应哲学家对象的 id，如果是主持人请填写 'moderator'" },
                    stance: { type: Type.STRING, description: "Stance: 'pro', 'contra', 'neutral', or 'moderator'" },
                    stanceLabel: { type: Type.STRING, description: isEn ? "Short stance label (2-6 words)" : "简明扼要的、大白话的立场标签（如：‘支持：追求欲望’，‘反对：精神空虚’等，2-6个字）" },
                    utterance: { type: Type.STRING, description: isEn ? "Engaging spoken words" : "极度说人话、口语化、使用现代通俗比喻、充满哲理火药味的生动发言" }
                  },
                  required: ["speakerName", "speakerId", "stance", "stanceLabel", "utterance"]
                }
              }
            },
            required: ["rounds"]
          }
        }
      });
      const responseText = response.text;
      if (!responseText) {
        throw new Error("No text returned by Gemini");
      }

      const parsed = JSON.parse(responseText.trim());
      res.json({
        success: true,
        rounds: parsed.rounds
      });
    } catch (err: any) {
      console.error("Gemini Multilateral Debate Arena Error:", err);
      res.json({
        success: false,
        rounds: [
          {
            speakerName: isEn ? "Chief Judge of Athens" : "雅典首席法官",
            speakerId: "moderator",
            utterance: isEn ? `Due to spatial ripples, the grand assembly is temporarily adjourned: ${err.message || err}.` : `由于合议庭发生神能扰动，大辩论暂时休庭，原因：${err.message || err}。请重新挑选圣哲或调整题目召唤。`
          }
        ]
      });
    }
  });

  // --- BLOG SEO ROUTES ---
  // Blog content directory (try cwd first, fallback to dist/content for production builds)
  function getBlogDir(): string {
    const cwd = process.cwd();
    const primary = path.join(cwd, "content", "blog");
    if (fs.existsSync(primary)) return primary;
    const fallback = path.join(cwd, "dist", "content", "blog");
    if (fs.existsSync(fallback)) return fallback;
    return primary; // return primary even if not found, let file reads handle errors
  }

  function renderBlogPage(meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
    lang?: string;
    jsonLd?: Record<string, unknown>;
  }, bodyHtml: string): string {
    const lang = meta.lang || "zh-CN";
    const desc = meta.description.length > 160 ? meta.description.slice(0, 157) + "..." : meta.description;
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title} | 西方哲学发展脉络</title>
  <meta name="description" content="${desc}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${meta.canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${meta.canonical}" />
  <meta property="og:site_name" content="西方哲学发展脉络" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${desc}" />
  ${meta.jsonLd ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>` : ""}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #faf8f2; color: #2c2b27; line-height: 1.8; }
    .container { max-width: 720px; margin: 0 auto; padding: 40px 20px 80px; }
    .header { text-align: center; padding: 60px 0 40px; border-bottom: 1px solid #d4cfc4; margin-bottom: 40px; }
    .header h1 { font-size: 28px; font-weight: 700; color: #1a1814; margin-bottom: 12px; }
    .header .date { font-size: 13px; color: #8c877a; }
    .section { margin-bottom: 36px; }
    .section h2 { font-size: 20px; font-weight: 600; color: #3d372b; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #e8dcc8; }
    .section p { white-space: pre-line; font-size: 16px; color: #4a4538; }
    .callout { background: #f0ebe0; border-left: 4px solid #c4a87c; padding: 20px 24px; margin: 40px 0; border-radius: 4px; }
    .callout h2 { border: none; margin-bottom: 8px; }
    .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #d4cfc4; text-align: center; font-size: 13px; color: #8c877a; }
    .footer a { color: #5c5340; text-decoration: underline; }
    @media (max-width: 600px) {
      .container { padding: 20px 16px 60px; }
      .header h1 { font-size: 22px; }
      .section h2 { font-size: 18px; }
    }
  </style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;
  }

  function loadPostFromDisk(slug: string): any {
    try {
      const filePath = path.join(getBlogDir(), `${slug}.json`);
      if (!fs.existsSync(filePath)) return null;
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (e) {
      return null;
    }
  }

  function loadPostIndex(): { title: string; slug: string; date: string; }[] {
    try {
      const idxPath = path.join(getBlogDir(), "posts.json");
      if (!fs.existsSync(idxPath)) return [];
      return JSON.parse(fs.readFileSync(idxPath, "utf8"));
    } catch (e) {
      return [];
    }
  }

  // Serve crawl-critical files from Express rather than relying on a static
  // hosting fallback. This prevents an SPA catch-all from returning index.html
  // for robots.txt or sitemap.xml after a deployment configuration change.
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://www.knowphilosophers.site/sitemap.xml\n`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const today = new Date().toISOString().slice(0, 10);
    const urls: Array<{ loc: string; priority: string; changefreq: string; lastmod?: string }> = [
      { loc: "https://www.knowphilosophers.site/", priority: "1.0", changefreq: "weekly" },
      { loc: "https://www.knowphilosophers.site/blog", priority: "0.8", changefreq: "weekly" },
      ...loadPostIndex().map(post => ({
        loc: `https://www.knowphilosophers.site/blog/${post.slug}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: post.date,
      })),
    ];
    const entries = urls.map(url => `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod || today}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join("\n");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`);
  });

  // Blog index route
  app.get("/blog", (req, res) => {
    const posts = loadPostIndex();
    const items = posts.map((p: any) =>
      `<li style="margin-bottom:20px">
        <a href="/blog/${p.slug}" style="font-size:18px;color:#3d372b;text-decoration:none;font-weight:600;">${p.title}</a>
        <span style="display:block;font-size:13px;color:#8c877a;margin-top:2px;">${p.date}${p.category ? ` · ${p.category}` : ""}</span>
      </li>`
    ).join("");

    const html = renderBlogPage({
      title: "博客 — 西方哲学发展脉络",
      description: "探索西方哲学史、哲学家思想与哲学学习方法。涵盖从古希腊到后现代的哲学讨论，中英双语内容。Western philosophy blog covering ancient Greece to post-modernity.",
      canonical: "https://www.knowphilosophers.site/blog",
    }, `
    <div class="container">
      <div class="header">
        <h1>哲学博客</h1>
        <p class="date">Philosophy Blog — 西方哲学发展脉络</p>
      </div>
      <ul style="list-style:none;padding:0">${items}</ul>
      ${posts.length === 0 ? '<p style="text-align:center;color:#8c877a;">文章即将上线，敬请期待。</p>' : ''}
      <div class="footer">
        <a href="/">← 返回西方哲学网络图谱</a>
      </div>
    </div>`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  });

  // Individual blog post route
  app.get("/blog/:slug", (req, res) => {
    const { slug } = req.params;
    if (slug.includes(".")) return res.status(404).send("Not found");

    const post = loadPostFromDisk(slug);
    if (!post) return res.status(404).send("Post not found");

    const sectionsHtml = (post.sections || []).map((s: any) => {
      if (s.type === "callout") {
        return `<div class="callout">
          <h2>${s.heading}</h2>
          <p>${s.body.replace(/\n/g, "<br/>")}</p>
          ${s.bodyEn ? `<p style="margin-top:12px;font-style:italic;color:#666;">${s.bodyEn.replace(/\n/g, "<br/>")}</p>` : ""}
        </div>`;
      }
      if (s.type === "intro") {
        return `<div class="section" style="margin-top:0">
          <h2>${s.heading}</h2>
          <p>${s.body.replace(/\n/g, "<br/>")}</p>
          ${s.bodyEn ? `<p style="margin-top:8px;font-size:14px;color:#666;">${s.bodyEn.replace(/\n/g, "<br/>")}</p>` : ""}
        </div>`;
      }
      return `<div class="section">
        <h2>${s.heading}</h2>
        <p>${s.body.replace(/\n/g, "<br/>")}</p>
        ${s.bodyEn ? `<p style="margin-top:8px;font-size:14px;color:#666;">${s.bodyEn.replace(/\n/g, "<br/>")}</p>` : ""}
      </div>`;
    }).join("");

    const postDesc = (post.sections || []).find((s: any) => s.type === "intro")?.body?.slice(0, 150) || "";
    const relatedPosts = loadPostIndex()
      .filter(related => related.slug !== slug)
      .slice(0, 3);
    const relatedHtml = relatedPosts.length ? `
      <aside class="callout" aria-label="相关文章">
        <h2>继续探索</h2>
        <ul style="padding-left:18px;">
          ${relatedPosts.map(related => `<li><a href="/blog/${related.slug}">${related.title}</a></li>`).join("")}
        </ul>
      </aside>` : "";

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: post.author || "knowphilosophers.site" },
      publisher: { "@type": "Organization", name: "西方哲学发展脉络" },
      mainEntityOfPage: `https://www.knowphilosophers.site/blog/${slug}`,
    };

    const html = renderBlogPage({
      title: post.title,
      description: postDesc,
      canonical: `https://www.knowphilosophers.site/blog/${slug}`,
      jsonLd: articleJsonLd,
    }, `
    <div class="container">
      <div class="header">
        <h1>${post.title}</h1>
        <p class="date">${post.date} — ${post.author}</p>
      </div>
      ${sectionsHtml}
      ${relatedHtml}
      <div class="footer">
        <a href="/">← 探索西方哲学网络图谱</a> | <a href="/blog">所有文章</a>
      </div>
    </div>`);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  });

  // Vite middleware setup for Development vs Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server route integrated.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bilingual Philosophy Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start full-stack server:", error);
});
