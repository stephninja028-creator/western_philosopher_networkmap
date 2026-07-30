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
  name:        { zh: '东西方哲学发展脉络', en: 'East-West Philosophy Network' } as ZhEn,
  nameShort:   { zh: '东西方哲学', en: 'East-West Philosophy' } as ZhEn,
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
  pageTitle:   { zh: '博客 — 东西方哲学发展脉络', en: 'Blog — East-West Philosophy Network' } as ZhEn,
  subtitle:    { zh: 'Philosophy Blog — 东西方哲学发展脉络', en: 'Philosophy Blog — East-West Philosophy Network' } as ZhEn,
  empty:       { zh: '文章即将上线，敬请期待。', en: 'Articles coming soon. Stay tuned.' } as ZhEn,
  backToMap:   { zh: '← 返回东西方哲学网络图谱', en: '← Back to Philosophy Network' } as ZhEn,
  exploreMap:  { zh: '← 探索东西方哲学网络图谱', en: '← Explore Philosophy Network' } as ZhEn,
  allArticles: { zh: '所有文章', en: 'All Articles' } as ZhEn,
  description: { zh: '探索东西方哲学史、哲学家思想与哲学学习方法。涵盖从古希腊到后现代的西方哲学，以及从先秦诸子到近代的中国哲学，中英双语内容。', en: 'Explore East-West philosophy history, thinker insights, and learning methods. Covering ancient Greek to post-modern Western philosophy and Pre-Qin Hundred Schools to modern Chinese philosophy.' } as ZhEn,
};

// ─── Philosopher Directory ───────────────────────────────────
export const PHIL_DIR = {
  title:       { zh: '东西方哲学家名录 — 150+位哲学家详解 | 东西方哲学发展脉络', en: 'East-West Philosopher Directory — 150+ Thinkers | East-West Philosophy Network' } as ZhEn,
  header:      { zh: '东西方哲学家名录', en: 'East-West Philosopher Directory' } as ZhEn,
  description: { zh: '收录从古希腊到现代的西方哲学家，以及从先秦诸子到近代的中国哲学家，共150余位。包含苏格拉底、柏拉图、亚里士多德、康德、尼采、孔子、老子、庄子、王阳明、朱熹等。每位哲学家均有详细生平、世界观体系、传世金句与思想对比。', en: 'Featuring 150+ philosophers from both Western and Eastern traditions. Western thinkers from ancient Greece to modernity (Socrates, Plato, Aristotle, Kant, Nietzsche) and Chinese thinkers from Pre-Qin Hundred Schools to the modern era (Confucius, Laozi, Zhuangzi, Wang Yangming, Zhu Xi). Each with detailed biography, worldview, famous quotes, and intellectual comparisons.' } as ZhEn,
  intro:       { zh: '从泰勒斯到罗蒂，从孔子到冯友兰——跨越两千五百年的东西方哲学巨匠全览。点击任意哲学家查看详细生平、世界观体系、传世金句与思想碰撞。', en: 'From Thales to Rorty, from Confucius to Feng Youlan — a comprehensive overview of East-West philosophical giants spanning 2,500 years. Click any philosopher for detailed biography, worldview, famous quotes, and intellectual encounters.' } as ZhEn,
  cta:         { zh: '可视化哲学家师承与对立关系', en: 'Visualize philosopher lineages and intellectual oppositions' } as ZhEn,
};

// ─── Epoch Pages ─────────────────────────────────────────────
export const EPOCH = {
  pageTitle:     { zh: '哲学时代分类 — 13大哲学纪元 | 东西方哲学发展脉络', en: 'Philosophical Epochs — 13 Major Eras | East-West Philosophy Network' } as ZhEn,
  header:        { zh: '哲学时代分类', en: 'Philosophical Epochs' } as ZhEn,
  description:   { zh: '东西方哲学的十三大纪元：西方七大纪元从古希腊罗马到现代分析哲学，中国六大纪元从先秦诸子百家到清代实学与近代哲学。', en: 'Thirteen major epochs of East-West philosophy: seven Western epochs from Ancient Greco-Roman to Modern Analytic, and six Chinese epochs from Pre-Qin Hundred Schools to Qing Practical Learning.' } as ZhEn,
  intro:         { zh: '东西方哲学两千五百年的十三大纪元，从古希腊的宇宙追问到当代的分析与解构，从先秦诸子百家争鸣到清代实学转型。', en: 'Thirteen epochs spanning 2,500 years of East-West philosophy, from ancient Greek inquiry into nature to contemporary analysis, and from Pre-Qin Hundred Schools to Qing practical learning.' } as ZhEn,
  philosophersInEpoch: (n: number, lang: Language) =>
    lang === 'en' ? `Philosophers in This Epoch (${n})` : `本期哲学家 (${n} 位)`,
  visualizeCta: (epochTitle: string, lang: Language) =>
    lang === 'en' ? `Visualize lineages and oppositions in ${epochTitle}` : `可视化${epochTitle}的师承与对立关系`,
};

// ─── School Pages ─────────────────────────────────────────────
export const SCHOOL = {
  pageTitle:      { zh: '哲学流派分类 — 所有学派 | 东西方哲学发展脉络', en: 'Philosophical Schools — All Schools | East-West Philosophy Network' } as ZhEn,
  pageHeader:     { zh: '哲学流派分类', en: 'Philosophical Schools' } as ZhEn,
  pageDescription:{ zh: '东西方哲学的所有流派：西方包括米利都学派、毕达哥拉斯学派、理性主义、经验主义、存在主义、实用主义等；中国包括儒家、道家、法家、墨家、佛学、理学、心学等。每个流派包含代表哲学家详解。', en: 'All schools of East-West philosophy: Western schools include Milesian, Pythagorean, Rationalism, Empiricism, Existentialism, Pragmatism; Chinese schools include Confucianism, Daoism, Legalism, Mohism, Buddhism, Neo-Confucianism, School of Mind. Each school features representative philosopher profiles.' } as ZhEn,
  pageIntro:      (n: number, lang: Language) =>
    lang === 'en' ? `${n} schools of East-West philosophy, from ancient Greek natural philosophy to modern analytic philosophy, and from Pre-Qin Hundred Schools to Ming-Qing Neo-Confucianism.` : `东西方哲学的${n}个流派，从古希腊的自然哲学到现代的分析哲学，从先秦诸子到明清理学与心学。`,
  schoolPhilosophers: { zh: '流派哲学家', en: 'School Philosophers' } as ZhEn,
  schoolTitle:   (name: string, nameEng: string, lang: Language) =>
    lang === 'en' ? `${nameEng} (${name}) — Philosophy School | East-West Philosophy Network` : `${name} (${nameEng}) — 哲学流派 | 东西方哲学发展脉络`,
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

// ─── Convenience helper ──────────────────────────────────────
export function T(zhEn: ZhEn, lang: Language): string {
  return pick(zhEn, lang);
}
