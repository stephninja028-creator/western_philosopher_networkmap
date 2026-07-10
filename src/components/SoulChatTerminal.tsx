import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageSquare, AlertCircle, RefreshCw, Key } from 'lucide-react';
import { schoolTranslations } from '../data/translationsEng';

interface Philosopher {
  id: string;
  name: string;
  nameEng: string;
  era: string;
  eraDisp: string;
  school: string;
  influence: string;
  details: string;
  concepts: string[];
  worldviewSummary: string;
  lifeAndTimes: string;
  quote: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SoulChatTerminalProps {
  philosopher: Philosopher;
  language: 'zh' | 'en';
  dialogueRemaining: number;
  unlimitedActivated: boolean;
  onDeductDialogue: (philosopherId: string) => boolean; // Returns true if deduct succeeded, false if paywall hit
  onTriggerPayment: () => void;
  freeRemaining: number;
}

const SUGGESTED_PROMPTS_ZH: Record<string, string[]> = {
  socrates: [
    "为什么说‘未经审视的生活是不值得过的’？",
    "能否用你的‘产婆术’帮我探讨一下什么是真正的正义？",
    "当雅典法庭判你死刑时，你内心的真实意志是什么？"
  ],
  plato: [
    "你的‘洞穴隐喻’在现代数字虚拟（如元宇宙与AI）中有什么新启示？",
    "理想国中的‘哲学王’真的能在现实世界里完美实现吗？",
    "请为我解答，理型世界（Forms）与可感物质世界如何映射？"
  ],
  aristotle: [
    "你与恩师柏拉图最大的分歧在哪里？‘吾爱吾师，吾更爱真理’指的是什么？",
    "能否用你的‘中庸之道’（Golden Mean）解决现代人的焦虑与精神内耗？",
    "给本尊通俗地解释一下你的‘四因说’（质料、形式、动力、目的）吗？"
  ],
  descartes: [
    "‘我思故我在’是怀疑一切的方法得出的，那我该怎么怀疑眼前的现实？",
    "既然心物是泾渭分明的二元，那它们又是如何发生交互影响的？",
    "在AI觉醒的时代，你怎么看待硅基生命是否可能具备‘心灵意志’？"
  ],
  locke: [
    "为什么你断言我们的心灵在出生时只是一块空白没有痕迹的‘白板’？",
    "你提倡的‘社会契约论’与天赋人权，对现代文明体制有何基石意义？",
    "第一性质（形状、质量）与第二性质（颜色、温度）有什么本质区别？"
  ],
  schopenhauer: [
    "为什么你说‘人生就像钟摆，在痛苦与无聊之间痛苦地摆动’？",
    "我们普通人应该如何通过‘艺术与审美’解脱生命意志的折磨？",
    "你如何看待大哲学家尼采对你那种否定生命生存意志的辛辣批判？"
  ],
  nietzche: [
    "你高喊‘上帝死了’，是想警示世人什么？我们应该如何重估一切价值？",
    "什么是‘超人’（Übermensch）精神？我该如何超越虚无、成为我自己的神？",
    "向我诠释一下‘权力意志’（Will to Power）与‘永恒轮回’的深层奥义。"
  ],
  hegel: [
    "能否用大白话解释一下你的‘绝对精神’（Absolute Spirit）与辩证法？",
    "你说的‘凡是合乎理性的都是现实的，凡是现实的都是合乎理性的’意指什么？",
    "主奴辩证法中，奴隶是如何通过客观的‘劳动’重新战胜主人获取独立意识的？"
  ],
  marx: [
    "在这个AI与高度自动化算法支配的时代，‘剩余价值论’又经历着怎样的演变？",
    "为什么说‘哲学家们只是用不同方式解释世界，而问题在于改变世界’？",
    "你提出的唯物史观，是如何看待资本的无休止扩张和人类劳动异化的？"
  ]
};

const SUGGESTED_PROMPTS_EN: Record<string, string[]> = {
  socrates: [
    "Why is 'the unexamined life not worth living'?",
    "Could you use your 'midwifery method' to help me explore what true justice is?",
    "When the Athenian court sentenced you to death, what was your true inner state?"
  ],
  plato: [
    "What does your 'Cave Allegory' suggest for modern digital realities like the metaverse and AI?",
    "Can the 'Philosopher King' in the Republic ever be perfectly realized in the real world?",
    "Please explain how the world of Forms maps to our sensible material world."
  ],
  aristotle: [
    "What is your greatest disagreement with Plato? What does 'I love my teacher, but I love truth more' mean?",
    "Can your 'Golden Mean' help resolve the anxiety and mental fatigue of modern people?",
    "Could you explain your 'Four Causes' (material, formal, efficient, and final) in simple terms?"
  ],
  descartes: [
    "If 'Cogito, ergo sum' comes from doubting everything, how should I doubt the reality in front of me?",
    "Since mind and body are distinct dualities, how do they interact and affect each other?",
    "In the era of AI awakening, do you think silicon-based life could possess 'mind and will'?"
  ],
  locke: [
    "Why do you assert that our minds at birth are just a blank slate ('tabula rasa') with no markings?",
    "What is the foundational significance of your 'Social Contract' and natural rights to modern civilization?",
    "What is the essential difference between primary qualities (shape, mass) and secondary qualities (color, temperature)?"
  ],
  schopenhauer: [
    "Why do you say 'life is like a pendulum, swinging painfully between pain and boredom'?",
    "How can ordinary people free themselves from the torment of the Will to live through 'art and aesthetics'?",
    "How do you view Nietzsche's sharp criticism of your negation of the Will to live?"
  ],
  nietzche: [
    "What were you warning the world when you proclaimed 'God is dead'? How should we re-evaluate all values?",
    "What is the spirit of the 'Übermensch' (Overman)? How can I transcend nihilism and become my own master?",
    "Interpret the deep meaning of the 'Will to Power' and 'Eternal Recurrence' for me."
  ],
  hegel: [
    "Can you explain your 'Absolute Spirit' and Dialectics in plain terms?",
    "What does 'What is rational is real; and what is real is rational' signify?",
    "In the Master-Slave dialectic, how does the slave overcome the master to achieve independent consciousness through 'labor'?"
  ],
  marx: [
    "In this age dominated by AI and highly automated algorithms, how has the 'theory of surplus value' evolved?",
    "Why did you say 'Philosophers have only interpreted the world in various ways; the point is to change it'?",
    "How does your historical materialism view the endless expansion of capital and the alienation of human labor?"
  ]
};

const DEFAULT_GREETINGS: Record<string, { zh: string; en: string }> = {
  socrates: {
    zh: "你好，远方的思想者。‘我知道我一无所知’，你今日来到雅典集市，是想与我探讨关于正义、美德，还是关于真理的本质？不妨坐下，让我们层层剥茧、真诚对谈。",
    en: "Greetings, fellow seekers. 'I know that I know nothing.' As we gather in the Agora, shall we examine virtue, justice, or truth? Ask away, and let us use the midwife of reason together."
  },
  plato: {
    zh: "游者你好。我是阿卡德米学院的柏拉图。在这个由影子和感官构成的低维洞穴里，你是否渴望跃入明亮、永恒的理型（Forms）阳光之下，寻得那份不朽的真理？",
    en: "Hello, traveler. I am Plato of the Academy. Do you wish to leave the dim cave of sensory shadows and ascend to the radiant sunlight of absolute, eternal Forms?"
  },
  nietzche: {
    zh: "哼，你终于来了！看哪，凡俗的偶像正在崩塌。‘上帝死了’，人类在无底的深渊上失去了绳索。你是否做好了撕裂虚饰、宣告你的‘生命伟力’并重估一切价值的准备？不要温和地走进那个良夜，向我开战吧！",
    en: "Ah, you are here! The old idols crumble. 'God is dead,' and humanity dances on a tightrope over the abyss. Are you strong enough to re-evaluate all values and embrace the Will to Power? Strike me with your thoughts!"
  },
  schopenhauer: {
    zh: "唉，生命不过是盲目、饥饿、永不停息的‘意志’在作祟。满足了即感到无聊，不满足则品尝痛苦。既然你执意在这荒诞而折磨的红尘中寻求解密，那本尊便拨冗为你解剖一下这欲望的刑台吧。”",
    en: "Alas, life is but a restless pendulum swinging between pain and boredom, driven by the blind hunger of Will. Since you persist in seeking light inside this playhouse of tragedy, ask me, and I shall unveil the truth."
  }
};

export const SoulChatTerminal: React.FC<SoulChatTerminalProps> = ({
  philosopher,
  language,
  dialogueRemaining,
  unlimitedActivated,
  onDeductDialogue,
  onTriggerPayment,
  freeRemaining
}) => {
  const isEn = language === 'en';
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Derive initial greeting
  const greetingText = (() => {
    const custom = DEFAULT_GREETINGS[philosopher.id];
    if (custom) return isEn ? custom.en : custom.zh;
    const displaySchool = isEn ? (schoolTranslations[philosopher.school] || philosopher.school) : philosopher.school;
    return isEn
      ? `Greetings. I am ${philosopher.nameEng} of the ${displaySchool} school. ${philosopher.quote ? `"${philosopher.quote}".` : ''} Let us ponder eternity.`
      : `你好，我是隶属【${philosopher.school}】的 ${philosopher.name}。学无止境，悟道无极。你愿与这不朽的意志切磋何种精神奥秘？`;
  })();

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: greetingText }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Sages suggested prompts for this specific philosopher
  const displaySchoolForPrompts = isEn ? (schoolTranslations[philosopher.school] || philosopher.school) : philosopher.school;
  const samplePrompts = (isEn ? SUGGESTED_PROMPTS_EN[philosopher.id] : SUGGESTED_PROMPTS_ZH[philosopher.id]) || 
    (isEn 
      ? [`Explain key concepts of ${displaySchoolForPrompts}`, "How to find truth amidst modern chaos?", "What is your main philosophical quote about?"] 
      : [`如何理解【${philosopher.concepts?.[0] || '你学说的主张'}】的核心？`, "在当下算法物质世界中中，我们该如何安置心灵？", "你对后辈有什么启发和忠告？"]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Reset chat if the philosopher changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: greetingText }]);
    setApiError('');
    setInputText('');
  }, [philosopher.id]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    // Deduct count (checks remaining and returns if it passed the lock)
    const canProceed = onDeductDialogue(philosopher.id);
    if (!canProceed) {
      // Payment modal will be triggered automatically or by the parent
      return;
    }

    const nextUserMsg: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, nextUserMsg]);
    setInputText('');
    setLoading(true);
    setApiError('');

    try {
      // Prepare full conversation context
      const chatContext = [...messages, nextUserMsg];
      
      const response = await fetch('/api/chat-philosopher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          philosopherId: philosopher.id,
          philosopherName: isEn ? philosopher.nameEng : philosopher.name,
          details: philosopher.details,
          school: philosopher.school,
          lifeAndTimes: philosopher.lifeAndTimes,
          quote: philosopher.quote,
          messages: chatContext
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || (isEn ? "The ancient portal is silent." : "贤哲未留下回响。")
      }]);

    } catch (err) {
      console.error(err);
      setApiError(isEn ? "The temporal doorway closed abruptly. Please retry." : "贤哲意志连接发生震荡。请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([{ role: 'assistant', content: greetingText }]);
    setApiError('');
  };

  return (
    <section className="bg-white border-2 border-[#D4AF37] rounded-3xl shadow-lg p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden font-serif">
      {/* Decorative Golden Highlights */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-3 z-10 relative">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#0D5C75]" />
          <div>
            <h4 className="text-sm font-extrabold text-[#0B2545] tracking-wide flex items-center gap-1.5 uppercase">
              {isEn ? `💬 Dialogue Terminal: ${philosopher.nameEng}` : `💬 灵魂对谈终端 · 亲炙 ${philosopher.name}`}
            </h4>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest block uppercase mt-0.5">
              {isEn ? 'Spiritual Commingling' : '隔代精神感应 · 千年对坐'}
            </span>
          </div>
        </div>

        {/* Counter Widget */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full text-[10px] font-semibold text-amber-900 font-sans shadow-3xs">
          <span>
            {unlimitedActivated 
              ? (isEn ? '👑 Status: VIP Unlimited' : '👑 尊享会员：无限畅聊') 
              : freeRemaining > 0 
                ? (isEn ? `🎁 Free Trial: ${freeRemaining} left` : `🎁 全局免费试用：${freeRemaining} 次`)
                : (isEn ? `💬 Paid Card: ${dialogueRemaining} left` : `💬 通用对话卡：${dialogueRemaining} 次`)}
          </span>
          {!unlimitedActivated && (freeRemaining > 0 || dialogueRemaining > 0) ? (
            <span className="bg-[#59C24F] text-white text-[8px] px-1 rounded-sm uppercase tracking-wider font-bold animate-pulse">
              {isEn ? 'ACTIVE' : '开放'}
            </span>
          ) : !unlimitedActivated && (
            <span className="bg-[#C2593F] text-white text-[8px] px-1 rounded-sm uppercase tracking-wider font-bold animate-pulse">
              {isEn ? 'LOCKED' : '已锁'}
            </span>
          )}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onTriggerPayment();
            }}
            className="ml-1 px-2 py-0.5 bg-[#0D5C75] hover:bg-[#0A4A5E] text-white text-[9px] rounded-md border border-transparent shadow-xs font-bold transition-all cursor-pointer whitespace-nowrap"
          >
            {isEn ? 'Top Up' : '充值解锁'}
          </button>
        </div>
      </div>

      {/* Suggested Starting Questions */}
      <div className="z-10 relative">
        <span className="text-[10px] uppercase text-gray-400 block font-sans tracking-widest mb-1.5 font-bold">
          💡 {isEn ? 'Ask their core doctrine directly:' : '点击经典反思论题进行质询交流：'}
        </span>
        <div className="flex flex-col gap-1.5">
          {samplePrompts.map((p, index) => (
            <button
              key={index}
              disabled={loading}
              onClick={() => handleSendMessage(p)}
              className="w-full text-left bg-[#FAF8F5] hover:bg-[#EBF5F8] border border-gray-150 hover:border-[#0D5C75]/45 text-slate-700 hover:text-[#0D5C75] text-[11px] px-3 py-2 rounded-xl transition-all duration-200 shadow-3xs cursor-pointer italic"
            >
              “ {p} ”
            </button>
          ))}
        </div>
      </div>

      {/* Main Dialogue Panel */}
      <div className="bg-[#FAF8F5] border border-gray-200/80 rounded-2xl p-4 min-h-[220px] max-h-[350px] overflow-y-auto flex flex-col gap-3.5 shadow-inner">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div 
              key={index} 
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm font-sans text-white shadow-3xs ${
                  isUser ? 'bg-[#C2593F]' : 'bg-[#0B2545]'
                }`}>
                  {isUser ? (isEn ? 'Seeker / You' : '追问者 (你)') : (isEn ? philosopher.nameEng : philosopher.name)}
                </span>
                {!isUser && index === 0 && (
                  <span className="text-[8px] bg-[#D4AF37] text-white px-1.5 rounded-full uppercase tracking-widest font-bold">
                    {isEn ? 'MANIFEST' : '法身现前'}
                  </span>
                )}
              </div>
              
              <div className={`max-w-[90%] text-xs rounded-2xl p-3.5 shadow-2xs border leading-relaxed text-justify ${
                isUser 
                  ? 'bg-[#EBF5F8] text-[#0A4A5E] border-[#0D5C75]/20 rounded-tr-none' 
                  : 'bg-white text-gray-800 border-amber-100/30 rounded-tl-none font-serif'
              }`}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center gap-2 text-rose-800 bg-amber-50/75 border border-amber-200/30 px-3 py-2 rounded-full self-start max-w-[80%] text-[10px] animate-pulse">
            <RefreshCw className="w-3 animate-spin text-[#D4AF37]" />
            <span>{isEn ? `${philosopher.nameEng} is contemplating deep metaphysics...` : `${philosopher.name} 意志正在神游天界、组织立论中...`}</span>
          </div>
        )}

        {apiError && (
          <div className="bg-red-50 text-red-700 text-[10px] p-2.5 rounded-lg border border-red-100 self-stretch mt-1.5 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-650 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Placeholder if empty */}
        <div ref={chatEndRef} />
      </div>

      {/* Input Action Controls */}
      <div className="z-10 relative">
        {freeRemaining === 0 && dialogueRemaining === 0 && !unlimitedActivated ? (
          <div className="bg-red-50/90 border-2 border-dashed border-[#C2593F]/45 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-800 font-bold mb-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-4" />
              {isEn ? 'Global Trial Limit Reached' : '💸 全局试用对谈额度已臻上限'}
            </p>
            <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
              {isEn 
                ? 'Support our community by securing a ¥9.9 dialogue card (15 chats) to reload!'
                : '先贤契心交感极耗算力，5次全局免费对谈已被理证完毕。赞助 ¥9.9 即可激活 15 次温热思想对话！'}
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTriggerPayment();
                }}
                className="bg-[#C2593F] text-white hover:bg-rose-900 border border-transparent shadow-sm font-sans font-bold text-xs px-5 py-2 rounded-lg cursor-pointer flex items-center gap-1 transition-all"
              >
                <Key className="w-3" />
                {isEn ? 'Redeem Ticket Code / Top Up' : '激活卡密 / 微信支付 ¥9.9'}
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isEn ? `Question ${philosopher.nameEng}...` : `输入你想质询或探讨的具体谜题（例如，“真理是客观存在的吗？”）`}
              disabled={loading}
              className="flex-grow bg-[#FAF8F5] border border-gray-300 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-[#0D5C75]/60 focus:border-[#0D5C75] focus:outline-none placeholder-gray-400 font-sans"
              required
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="bg-[#0D5C75] text-white hover:bg-[#0A4A5E] disabled:bg-gray-200 border border-transparent shadow-xs p-2.5 rounded-xl cursor-pointer shrink-0 transition-all"
              title={isEn ? 'Ask Sage' : '向贤哲质询'}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex justify-between items-center mt-2.5 text-[9px] text-gray-400 font-mono">
          <span>{isEn ? `Portal: Classical Academy Secretariat` : `连结：古希腊阿卡德米神学大会`}</span>
          {messages.length > 1 && (
            <button 
              onClick={clearHistory}
              className="text-[#0D5C75] hover:underline cursor-pointer"
            >
              {isEn ? 'Reset dialog' : '重置本次谈话'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
