import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

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
  const PORT = 3000;

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

    try {
      const key = process.env.GEMINI_API_KEY;
      if (!key) {
        return res.json({
          success: false,
          isFallback: true,
          rounds: [
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
        contents: `你现在是雅典露天学园的大会主持法官。
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

请按照极其严苛的 JSON 格式输出，内容语言与用户提问语言（默认为中文）对齐，确保能顺利解析成带发言人ID的对象数组。`,
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
                    utterance: { type: Type.STRING, description: "该发言人在本回合的精湛辩词，极度切合其性格" }
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
            speakerName: "雅典大审判官",
            speakerId: "moderator",
            utterance: `辩论遭遇时空裂缝纠纷：${err.message || err}。请重新调整辩题及召唤能量。`
          }
        ]
      });
    }
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
