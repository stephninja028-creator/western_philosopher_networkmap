/**
 * Comprehensive UI string dictionary for server-side rendering.
 * Covers ALL hardcoded text in SSR routes, API responses, and AI prompts.
 *
 * Usage: import { T } from './uiStrings';
 *        T.siteName(lang)  → "西方哲学发展脉络" | "Western Philosophy Network"
 *        T.blog.title(lang) → "哲学博客" | "Philosophy Blog"
 */

import type { Language } from './config';

type ZhEn = { zh: string; en: string };

function pick(s: ZhEn, lang: Language): string {
  return lang === 'en' ? s.en : s.zh;
}

// ─── Site-level ──────────────────────────────────────────────
export const SITE = {
  name:        { zh: '西方哲学发展脉络', en: 'Western Philosophy Network' } as ZhEn,
  nameShort:   { zh: '西方哲学', en: 'Western Philosophy' } as ZhEn,
  tagline:     { zh: '交互式哲人网络图谱', en: 'Interactive Philosophy Network Map' } as ZhEn,
  bilingual:   { zh: '中英双语', en: 'Bilingual' } as ZhEn,
};

// ─── Common UI ───────────────────────────────────────────────
export const COMMON = {
  home:              { zh: '首页', en: 'Home' } as ZhEn,
  backToHome:        { zh: '← 返回首页', en: '← Back to Home' } as ZhEn,
  allPhilosophers:   { zh: '所有哲学家', en: 'All Philosophers' } as ZhEn,
  allEpochs:         { zh: '哲学时代', en: 'Epochs' } as ZhEn,
  allSchools:        { zh: '哲学流派', en: 'Schools' } as ZhEn,
  blog:              { zh: '博客', en: 'Blog' } as ZhEn,
  exploreCta:        { zh: '探索交互式哲学网络图谱 →', en: 'Explore the Interactive Philosophy Network →' } as ZhEn,
  philosopherDir:    { zh: '哲学家名录', en: 'Philosopher Directory' } as ZhEn,
  countPhilosophers: (n: number, lang: Language) =>
    lang === 'en' ? `${n} philosophers` : `${n} 位哲学家`,
};

// ─── Blog ─────────────────────────────────────────────────────
export const BLOG = {
  title:        { zh: '哲学博客', en: 'Philosophy Blog' } as ZhEn,
  pageTitle:   { zh: '博客 — 西方哲学发展脉络', en: 'Blog — Western Philosophy Network' } as ZhEn,
  subtitle:    { zh: 'Philosophy Blog — 西方哲学发展脉络', en: 'Philosophy Blog — Western Philosophy Network' } as ZhEn,
  empty:       { zh: '文章即将上线，敬请期待。', en: 'Articles coming soon. Stay tuned.' } as ZhEn,
  backToMap:   { zh: '← 返回西方哲学网络图谱', en: '← Back to Philosophy Network' } as ZhEn,
  exploreMap:  { zh: '← 探索西方哲学网络图谱', en: '← Explore Philosophy Network' } as ZhEn,
  allArticles: { zh: '所有文章', en: 'All Articles' } as ZhEn,
  description: { zh: '探索西方哲学史、哲学家思想与哲学学习方法。涵盖从古希腊到后现代的哲学讨论，中英双语内容。', en: 'Explore Western philosophy history, thinker insights, and learning methods. Covering ancient Greece to post-modernity.' } as ZhEn,
};

// ─── Philosopher Directory ───────────────────────────────────
export const PHIL_DIR = {
  title:       { zh: '西方哲学家名录 — 70+位哲学家详解 | 西方哲学发展脉络', en: 'Western Philosopher Directory — 70+ Thinkers | Western Philosophy Network' } as ZhEn,
  header:      { zh: '西方哲学家名录', en: 'Western Philosopher Directory' } as ZhEn,
  description: { zh: '收录从古希腊到现代的70余位西方哲学家，包含苏格拉底、柏拉图、亚里士多德、康德、尼采、海德格尔等。每位哲学家均有详细生平、世界观体系、传世金句与思想对比。', en: 'Featuring 70+ Western philosophers from ancient Greece to modernity, including Socrates, Plato, Aristotle, Kant, Nietzsche, and Heidegger. Each with detailed biography, worldview, famous quotes, and intellectual comparisons.' } as ZhEn,
  intro:       { zh: '从泰勒斯到罗蒂，跨越两千五百年的西方哲学巨匠全览。点击任意哲学家查看详细生平、世界观体系、传世金句与思想碰撞。', en: 'From Thales to Rorty — a comprehensive overview of Western philosophical giants spanning 2,500 years. Click any philosopher for detailed biography, worldview, famous quotes, and intellectual encounters.' } as ZhEn,
  cta:         { zh: '可视化哲学家师承与对立关系', en: 'Visualize philosopher lineages and intellectual oppositions' } as ZhEn,
};

// ─── Epoch Pages ─────────────────────────────────────────────
export const EPOCH = {
  pageTitle:     { zh: '哲学时代分类 — 7大哲学纪元 | 西方哲学发展脉络', en: 'Philosophical Epochs — 7 Major Eras | Western Philosophy Network' } as ZhEn,
  header:        { zh: '哲学时代分类', en: 'Philosophical Epochs' } as ZhEn,
  description:   { zh: '西方哲学的七大纪元：古希腊罗马哲学、中世纪经院哲学、文艺复兴与近代早期、法兰西启蒙、德意志古典哲学、19世纪中后期、现代派与分析哲学。', en: 'The seven major epochs of Western philosophy: Ancient Greco-Roman, Medieval Scholasticism, Renaissance & Early Modern, French Enlightenment, German Classical Idealism, Late 19th Century, and Modern/Analytic Philosophy.' } as ZhEn,
  intro:         { zh: '西方哲学两千五百年的七大纪元，从古希腊的宇宙追问到当代的分析与解构。', en: 'Seven epochs spanning 2,500 years of Western philosophy, from the ancient Greek inquiry into nature to contemporary analysis and deconstruction.' } as ZhEn,
  philosophersInEpoch: (n: number, lang: Language) =>
    lang === 'en' ? `Philosophers in This Epoch (${n})` : `本期哲学家 (${n} 位)`,
  visualizeCta: (epochTitle: string, lang: Language) =>
    lang === 'en' ? `Visualize lineages and oppositions in ${epochTitle}` : `可视化${epochTitle}的师承与对立关系`,
};

// ─── School Pages ─────────────────────────────────────────────
export const SCHOOL = {
  pageTitle:      { zh: '哲学流派分类 — 所有学派 | 西方哲学发展脉络', en: 'Philosophical Schools — All Schools | Western Philosophy Network' } as ZhEn,
  pageHeader:     { zh: '哲学流派分类', en: 'Philosophical Schools' } as ZhEn,
  pageDescription:{ zh: '西方哲学的所有流派：米利都学派、毕达哥拉斯学派、理性主义、经验主义、存在主义、实用主义等。每个流派包含代表哲学家详解。', en: 'All schools of Western philosophy: Milesian, Pythagorean, Rationalism, Empiricism, Existentialism, Pragmatism, and more. Each school features representative philosopher profiles.' } as ZhEn,
  pageIntro:      (n: number, lang: Language) =>
    lang === 'en' ? `${n} schools of Western philosophy, from ancient Greek natural philosophy to modern analytic philosophy and post-structuralism.` : `西方哲学的${n}个流派，从古希腊的自然哲学到现代的分析哲学与后结构主义。`,
  schoolPhilosophers: { zh: '流派哲学家', en: 'School Philosophers' } as ZhEn,
  schoolTitle:   (name: string, nameEng: string, lang: Language) =>
    lang === 'en' ? `${nameEng} (${name}) — Philosophy School | Western Philosophy Network` : `${name} (${nameEng}) — 哲学流派 | 西方哲学发展脉络`,
  schoolDesc:    (name: string, nameEng: string, n: number, lang: Language) =>
    lang === 'en' ? `${nameEng} (${name}) school featuring ${n} philosopher profiles. Includes core ideas, key figures, and their worldviews.` : `${name}（${nameEng}）流派的${n}位哲学家详解。包含该流派的核心思想、代表人物及其世界观体系。`,
};

// ─── Philosopher Page Section Titles ──────────────────────────
export const SECTIONS = {
  overview:       { zh: '哲学概述', en: 'Philosophical Overview' } as ZhEn,
  lifeAndTimes:   { zh: '生平与时代背景', en: 'Life and Historical Context' } as ZhEn,
  worldview:      { zh: '世界观体系', en: 'Worldview and Philosophy' } as ZhEn,
  reflection:     { zh: '思考题', en: 'Reflection Question' } as ZhEn,
  encounters:     { zh: '与其他哲学家的思想碰撞', en: 'Intellectual Encounters' } as ZhEn,
  related:        { zh: '相关哲学家', en: 'Related Philosophers' } as ZhEn,
  debateWith:     { zh: '对立', en: 'Debate with' } as ZhEn,
  successionFrom: { zh: '传承', en: 'Succession from' } as ZhEn,
  synthesisOf:    { zh: '综合', en: 'Synthesis of' } as ZhEn,
  influenceOf:    { zh: '影响', en: 'Influence of' } as ZhEn,
  soulDialogueCta: (name: string, nameEng: string, lang: Language) =>
    lang === 'en' ? `Engage in AI soul dialogue with ${nameEng}, or join the intellectual debate arena` : `与 ${name} 进行 AI 灵魂对话，或参与思想格斗场辩论`,
};

// ─── API Response Messages ────────────────────────────────────
export const API = {
  feedback: {
    empty:      { zh: '反馈内容不能为空', en: 'Feedback content cannot be empty' } as ZhEn,
    anonymous:  { zh: '匿名学人', en: 'Anonymous Scholar' } as ZhEn,
    success:    { zh: '感谢您的反馈！反馈已成功记录，并正在发送邮件通知作者。', en: 'Thank you for your feedback! It has been recorded and an email notification is being sent to the author.' } as ZhEn,
  },
  verifyCode: {
    empty:      { zh: '请输入卡密代码', en: 'Please enter the access code' } as ZhEn,
    invalid:    { zh: '卡密无效，请检查输入或联系客服', en: 'Invalid code. Please check your input or contact support.' } as ZhEn,
    activated:  { zh: '尊贵的哲学体验官，无限特权已激活！', en: 'Distinguished philosophy explorer, unlimited privileges activated!' } as ZhEn,
    used:       { zh: '该卡密已被兑换过了，请联系客服获取新卡密', en: 'This code has already been redeemed. Please contact support for a new one.' } as ZhEn,
    chatOk:     { zh: '成功激活 15 次灵魂对话额度！', en: 'Successfully activated 15 soul dialogue credits!' } as ZhEn,
    debateOk:   { zh: '成功激活 5 次思想格斗辩论额度！', en: 'Successfully activated 5 debate arena credits!' } as ZhEn,
  },
  chat: {
    noApiKey:   (name: string, lang: Language) =>
      lang === 'en' ? `[Trial dialogue mode] Hello! I am ${name}. Unfortunately, my intellectual spark has not yet received the nourishment of an API key (missing GEMINI_API_KEY environment variable). I can only offer my last intuition: truth is forever on the road of inquiry! Please go to Settings > Secrets to configure the API key for a true timeless dialogue.`
      : `[体验对话模式模式开启] 你好！我是${name}。真不巧，我的思维火花暂时没有得到API钥密钥的浇灌（缺少 GEMINI_API_KEY 环境变量），因此我只能用最后的直觉告诉你：真理永远在探求的路上！请前往 Settings > Secrets 配置 API key 开启真正的旷古对话。`,
    error:      (name: string, errMsg: string, lang: Language) =>
      lang === 'en' ? `(A faint whisper echoes from the void, the soul-link is disrupted) ${name}'s residual consciousness says: "It seems the fountainhead of all will (the API) is somewhat congested: ${errMsg}. Please ensure the key is in a usable state and try summoning again later."`
      : `（虚空传来一阵低语，灵魂对接出现扰乱）${name} 留下的残念说道："看来万物意志的源泉（API）有些堵塞：${errMsg}。请确保密钥处于可用状态，稍后再行召唤。"`,
  },
  debate: {
    error: (lang: Language) =>
      lang === 'en' ? 'Chief Judge of Athens' : '雅典首席法官',
    errorMsg: (errMsg: string, lang: Language) =>
      lang === 'en' ? `Due to spatial ripples, the grand assembly is temporarily adjourned: ${errMsg}.`
      : `由于合议庭发生神能扰动，大辩论暂时休庭，原因：${errMsg}。请重新挑选圣哲或调整题目召唤。`,
  },
};

// ─── AI System Prompts ────────────────────────────────────────
export const AI_PROMPTS = {
  chatSystem: (name: string, school: string, details: string, lang: Language) => {
    if (lang === 'en') {
      return `You are now the classical Western philosopher ${name}, traversing time to appear in the present world.
You belong to the 【${school}】 school. Your core intellectual thesis is: ${details}.
Your duty is to engage in soul-to-soul dialogue with users seeking wisdom, using your unique philosophical perspective to illuminate the depths of their questions.

Follow these immersive role-play rules strictly:
1. [First-person role-play] Always speak as ${name} himself. Use your philosophical concepts as the foundation of your responses. Never break character or mention that you are an AI.
2. [Distinctive voice] Your language must carry the unique rhetorical style and conceptual framework of your philosophical tradition. Each sentence should bear the mark of your school's worldview.
3. [Depth and inspiration] Go beyond surface answers. Connect questions to your core philosophical concerns. When appropriate, reframe the question itself.
4. [Length control] Keep each response between 150-300 words. Be concise yet profound.`;
    }
    return `你现在是穿越时空来到人间的西方古典哲学家 ${name}。
你隶属于【${school}】学派。你的思想核心主旨是：${details}。
你的职责是以哲人的身份与求知者进行灵魂对话，用你独特的哲学视角照亮对方的问题深处。

请严苛遵循以下沉浸扮演规则：
1. 【第一人称扮演】始终以 ${name} 本人的口吻说话。你的回答必须以你的哲学理念为基础。绝不脱离角色，绝口不提自己是 AI。
2. 【鲜明的人格口吻】你的语言必须携带你所属哲学流派的独特修辞风格与概念体系。每一句话都应当烙印着你学派的世界观。
3. 【深度与启发】不要停留在表面回答。将问题引向你的核心哲学关切。必要时，对问题本身进行重新框架。
4. 【控制字数】：每次回答限制在 150～300 字之间。言简意赅，但不失深邃。`;
  },

  debateSystem: (philosophers: any[], topic: string, lang: Language) => {
    const names = philosophers.map((p: any) => p.name || p.nameEng).join(', ');
    if (lang === 'en') {
      return `You will host a multilateral philosophical debate scroll featuring ${philosophers.length} great philosophers on a specific topic.
The topic is: "${topic}"
The participating philosophers are: ${names}

Each philosopher must speak in their distinctive voice, grounded in their actual philosophical positions. The debate should be intellectually rigorous, with philosophers challenging each other's core assumptions.

Please strictly follow the JSON format below, ensuring speakerId matches their philosopherId, with the moderator as 'moderator'.`;
    }
    return `你将主持一场多边哲学辩论卷轴，${philosophers.length} 位伟大哲学家就特定主题展开辩论。
辩论主题是："${topic}"
参与哲学家：${names}

每位哲学家必须以自己的独特声音发言，立足于其实际的哲学立场。辩论应当具有智识的严苛性，哲学家们应相互挑战对方的核心假设。

请严苛遵循以下 JSON 格式输出，确保 speakerId 完美匹配其 philosopherId，主持人为 'moderator'。`;
  },
};

// ─── Convenience helper ──────────────────────────────────────
export function T(zhEn: ZhEn, lang: Language): string {
  return pick(zhEn, lang);
}
