/**
 * Philosophy Soul Test Data
 * 16 philosopher archetypes, 10 questions, bilingual (zh/en)
 * v2: primary/secondary weighted scoring (primary=2, secondary=1)
 * Each answer option maps to 1 primary archetype (weight 2) + 1 secondary (weight 1)
 */

export interface QuizOption {
  text: { zh: string; en: string };
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  question: { zh: string; en: string };
  options: QuizOption[];
}

export interface PhilosopherArchetype {
  philosopherId: string;
  philosopherName: { zh: string; en: string };
  typeName: { zh: string; en: string };
  emoji: string;
  traits: { zh: string[]; en: string[] };
  description: { zh: string; en: string };
  ideology: { zh: string; en: string };
  quote: { zh: string; en: string };
  theme: {
    gradient: string;
    accent: string;
    tagBg: string;
  };
}

// ============================================================
// 16 PHILOSOPHER ARCHETYPES (unchanged from v1)
// ============================================================

export const archetypes: Record<string, PhilosopherArchetype> = {

  // ── WESTERN ──────────────────────────────────────────────

  socrates: {
    philosopherId: 'socrates',
    philosopherName: { zh: '苏格拉底', en: 'Socrates' },
    typeName: { zh: '追问者', en: 'The Questioner' },
    emoji: '🧠',
    traits: {
      zh: ['质疑精神', '辩证思维', '自省觉醒', '求真意志'],
      en: ['Critical Spirit', 'Dialectical Mind', 'Self-Reflection', 'Will to Truth'],
    },
    description: {
      zh: '你像苏格拉底一样，相信"未经审视的人生不值得过"。你不盲从权威，不满足于表面答案，总是用不断的追问来层层剥开思想的内核。你的力量不在于给出答案，而在于提出正确的问题。',
      en: 'Like Socrates, you believe "the unexamined life is not worth living." You refuse to blindly follow authority or settle for surface-level answers. Your strength lies not in providing answers, but in asking the right questions.',
    },
    ideology: {
      zh: '苏格拉底式辩证法：通过不断追问揭示认知的矛盾与局限，最终抵达更深层的真理。知识即德性，无知即恶。',
      en: 'Socratic dialectic: revealing contradictions through relentless questioning to reach deeper truth. Knowledge is virtue; ignorance is vice.',
    },
    quote: {
      zh: '未经审视的人生不值得过。',
      en: 'The unexamined life is not worth living.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #1a3a5c 0%, #0B2545 50%, #152d4a 100%)',
      accent: '#D4AF37',
      tagBg: 'rgba(212,175,55,0.2)',
    },
  },

  plato: {
    philosopherId: 'plato',
    philosopherName: { zh: '柏拉图', en: 'Plato' },
    typeName: { zh: '理想主义者', en: 'The Idealist' },
    emoji: '📐',
    traits: {
      zh: ['超越视野', '理念追求', '灵魂至上', '完美主义'],
      en: ['Transcendent Vision', 'Ideal Forms', 'Soul First', 'Perfectionism'],
    },
    description: {
      zh: '你像柏拉图一样，目光总望向超越现实的理念世界。你相信在变动不居的表象之下，存在着永恒不变的完美形式。真正的美、善与真，存在于更高的维度。',
      en: 'Like Plato, your gaze is always fixed on the world of Ideas beyond material reality. You believe beneath ever-changing appearances lies an eternal realm of perfect Forms, where true Beauty, Goodness, and Truth reside.',
    },
    ideology: {
      zh: '理念论：感官世界只是完美理念世界的影子。哲学的使命是引导灵魂从洞穴中走出，直面真实的光明。',
      en: 'Theory of Forms: the sensory world is but a shadow of the perfect realm of Ideas. Philosophy guides the soul out of the cave into the light of truth.',
    },
    quote: {
      zh: '洞穴中的囚徒只看到影子，却以为那就是真实。',
      en: 'The prisoners in the cave see only shadows, yet take them for reality.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #2a1551 0%, #1a0f3a 50%, #251a4e 100%)',
      accent: '#c9a0e8',
      tagBg: 'rgba(201,160,232,0.2)',
    },
  },

  aristotle: {
    philosopherId: 'aristotle',
    philosopherName: { zh: '亚里士多德', en: 'Aristotle' },
    typeName: { zh: '中道实践者', en: 'The Pragmatist' },
    emoji: '⚖️',
    traits: {
      zh: ['中庸之道', '逻辑严密', '系统思维', '实践智慧'],
      en: ['Golden Mean', 'Logical Rigor', 'Systematic Mind', 'Practical Wisdom'],
    },
    description: {
      zh: '你像亚里士多德一样，在两个极端之间寻找最佳的平衡点。你重视经验和观察，用严密的逻辑构建知识体系。德性不是抽象的理念，而是在具体实践中养成的习惯。',
      en: 'Like Aristotle, you seek the optimal balance between extremes. You value experience and observation, building knowledge through rigorous logic. Virtue is not an abstract ideal but a habit cultivated through practice.',
    },
    ideology: {
      zh: '中庸之道与实体论：德性是两个极端之间的中点。通过观察和分类理解世界，幸福是灵魂合于德性的活动。',
      en: 'The Golden Mean and substance theory: virtue lies between extremes. Understanding through observation and classification; happiness is the soul acting in accordance with virtue.',
    },
    quote: {
      zh: '幸福是灵魂合于德性的活动。',
      en: 'Happiness is the activity of the soul in accordance with virtue.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #1a5c3a 0%, #0f3d26 50%, #1a4a30 100%)',
      accent: '#7ec8a0',
      tagBg: 'rgba(126,200,160,0.2)',
    },
  },

  descartes: {
    philosopherId: 'descartes',
    philosopherName: { zh: '笛卡尔', en: 'Descartes' },
    typeName: { zh: '怀疑思辨者', en: 'The Skeptic' },
    emoji: '🔍',
    traits: {
      zh: ['怀疑精神', '理性至上', '清晰分明', '思辨严谨'],
      en: ['Methodical Doubt', 'Reason First', 'Clear & Distinct', 'Rigorous Thought'],
    },
    description: {
      zh: '你像笛卡尔一样，对一切知识保持健康的怀疑。你相信只有通过理性推演、排除一切可疑之后剩下的，才是真正的确定性。"我思故我在"——思考本身就是存在的证明。',
      en: 'Like Descartes, you maintain a healthy skepticism toward all knowledge. You believe true certainty comes only after methodical doubt has eliminated everything questionable. "I think, therefore I am" — thought itself is the proof of existence.',
    },
    ideology: {
      zh: '方法论怀疑与心物二元论：怀疑一切可以怀疑的，直到找到不可怀疑的阿基米德支点。心灵与物质是两个独立的实体。',
      en: 'Methodical doubt and mind-body dualism: doubt everything until reaching an indubitable foundation. Mind and matter are two distinct substances.',
    },
    quote: {
      zh: '我思故我在。',
      en: 'I think, therefore I am.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #1a3a6e 0%, #0f2a5a 50%, #1a3560 100%)',
      accent: '#7eb8e8',
      tagBg: 'rgba(126,184,232,0.2)',
    },
  },

  kant: {
    philosopherId: 'kant',
    philosopherName: { zh: '康德', en: 'Kant' },
    typeName: { zh: '道德立法者', en: 'The Moral Lawgiver' },
    emoji: '📜',
    traits: {
      zh: ['义务至上', '理性自律', '绝对命令', '道德勇气'],
      en: ['Duty First', 'Rational Autonomy', 'Categorical Imperative', 'Moral Courage'],
    },
    description: {
      zh: '你像康德一样，内心有一座不可动摇的道德法庭。你的行为不受欲望和利益驱使，而是遵循理性为自己立下的法则。真正的自由不是想做什么就做什么，而是能够自律。',
      en: 'Like Kant, you carry an unshakeable moral tribunal within. Your actions are not driven by desire or profit, but by laws that reason prescribes to itself. True freedom is not doing whatever you want, but being able to govern yourself.',
    },
    ideology: {
      zh: '绝对命令与先验哲学：只按照你能同时愿意它成为普遍法则的准则去行动。人为自然立法，人为自身立法。',
      en: 'Categorical imperative and transcendental philosophy: act only on maxims you can will as universal laws. Man legislates for nature and for himself.',
    },
    quote: {
      zh: '要有勇气运用你自己的理智。',
      en: 'Have the courage to use your own reason.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #3a2a5e 0%, #2a1f4a 50%, #352a55 100%)',
      accent: '#b89cd8',
      tagBg: 'rgba(184,156,216,0.2)',
    },
  },

  nietzsche: {
    philosopherId: 'nietzsche',
    philosopherName: { zh: '尼采', en: 'Nietzsche' },
    typeName: { zh: '自由超人', en: 'The Übermensch' },
    emoji: '⚡',
    traits: {
      zh: ['权力意志', '自我超越', '创造价值', '孤独反叛'],
      en: ['Will to Power', 'Self-Overcoming', 'Value Creation', 'Solitary Rebel'],
    },
    description: {
      zh: '你像尼采一样，拒绝接受既定的价值观，选择自己创造价值。你拥抱着生命中的痛苦和欢愉，将它们化作超越自我的力量。你不是跟随者，你是开路者。',
      en: 'Like Nietzsche, you refuse to accept ready-made values and choose to create your own. You embrace both the pain and ecstasy of life, transforming them into fuel for self-overcoming. You are not a follower — you are a pathfinder.',
    },
    ideology: {
      zh: '权力意志与永恒轮回：生命的意义在于不断超越自身，创造价值。上帝已死，人必须成为自己的创造者。',
      en: 'Will to power and eternal recurrence: life\'s meaning lies in perpetual self-overcoming and value creation. God is dead — man must become his own creator.',
    },
    quote: {
      zh: '那些杀不死我的，使我更强大。',
      en: 'What does not kill me makes me stronger.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #5a1a1a 0%, #3a0f0f 50%, #4a1515 100%)',
      accent: '#e8a07e',
      tagBg: 'rgba(232,160,126,0.2)',
    },
  },

  marx: {
    philosopherId: 'marx',
    philosopherName: { zh: '马克思', en: 'Marx' },
    typeName: { zh: '实践变革者', en: 'The Revolutionary' },
    emoji: '🔨',
    traits: {
      zh: ['实践精神', '批判意识', '变革勇气', '社会关怀'],
      en: ['Praxis', 'Critical Consciousness', 'Revolutionary Courage', 'Social Concern'],
    },
    description: {
      zh: '你像马克思一样，不满足于解释世界，更渴望改变世界。你敏锐地觉察到社会结构中的不平等，并相信实践是推动历史前进的真正力量。思想只有转化为行动才有意义。',
      en: 'Like Marx, you are not content with merely interpreting the world — you want to change it. You keenly perceive structural inequalities and believe that praxis is the true force driving history forward. Ideas only matter when transformed into action.',
    },
    ideology: {
      zh: '历史唯物主义与实践哲学：哲学家们只是解释世界，而问题在于改变世界。社会存在决定社会意识。',
      en: 'Historical materialism and philosophy of praxis: philosophers have only interpreted the world — the point is to change it. Social being determines consciousness.',
    },
    quote: {
      zh: '哲学家们只是用不同的方式解释世界，而问题在于改变世界。',
      en: 'Philosophers have only interpreted the world; the point is to change it.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #4a1520 0%, #3a0f18 50%, #451220 100%)',
      accent: '#e87e7e',
      tagBg: 'rgba(232,126,126,0.2)',
    },
  },

  schopenhauer: {
    philosopherId: 'schopenhauer',
    philosopherName: { zh: '叔本华', en: 'Schopenhauer' },
    typeName: { zh: '悲观智者', en: 'The Pessimist Sage' },
    emoji: '🌊',
    traits: {
      zh: ['深刻洞察', '审美超脱', '意志审视', '悲悯情怀'],
      en: ['Profound Insight', 'Aesthetic Detachment', 'Will Examination', 'Compassion'],
    },
    description: {
      zh: '你像叔本华一样，看透了生命意志驱动下的无尽欲求和痛苦。但你的悲观不是消极，而是一种深刻的清醒。你通过艺术、审美和同情来超越意志的奴役，在喧嚣中找到宁静。',
      en: 'Like Schopenhauer, you see through the endless striving and suffering driven by the Will. But your pessimism is not passivity — it is a profound lucidity. You transcend the Will\'s servitude through art, aesthetic contemplation, and compassion.',
    },
    ideology: {
      zh: '生命意志与审美解脱：世界是意志的表象，欲望是一切痛苦之源。通过审美、艺术和同情可以暂时摆脱意志的束缚。',
      en: 'The Will and aesthetic liberation: the world is the representation of Will; desire is the root of all suffering. Art, aesthetics, and compassion offer temporary release.',
    },
    quote: {
      zh: '生命是一团欲望，欲望不满足便痛苦，满足便无聊。',
      en: 'Life is a bundle of desires: unfulfilled, they bring pain; fulfilled, they bring boredom.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #1a3a4a 0%, #0f2a3a 50%, #1a3545 100%)',
      accent: '#7ec8d8',
      tagBg: 'rgba(126,200,216,0.2)',
    },
  },

  // ── EASTERN ──────────────────────────────────────────────

  laozi: {
    philosopherId: 'laozi',
    philosopherName: { zh: '老子', en: 'Laozi' },
    typeName: { zh: '无为智者', en: 'The Sage of Wu Wei' },
    emoji: '🍃',
    traits: {
      zh: ['自然无为', '柔弱胜刚', '虚静观复', '上善若水'],
      en: ['Natural Non-Action', 'Soft Overcomes Hard', 'Still Contemplation', 'Highest Good Like Water'],
    },
    description: {
      zh: '你像老子一样，深谙"无为而无不为"的智慧。你不与自然对抗，而是顺应万物的自然规律。柔弱胜刚强，你以退为进，以柔克刚，在虚静中观照万物的本源。',
      en: 'Like Laozi, you deeply understand the wisdom of "wu wei" — accomplishing everything through non-action. You don\'t fight against nature but flow with its patterns. The soft overcomes the hard; you advance by yielding and find strength in stillness.',
    },
    ideology: {
      zh: '道法自然：人法地，地法天，天法道，道法自然。无为而治，不争而胜，大音希声，大象无形。',
      en: 'The Dao follows nature: man follows earth, earth follows heaven, heaven follows the Dao, the Dao follows what is natural. Govern by non-action, win by non-contention.',
    },
    quote: {
      zh: '上善若水，水善利万物而不争。',
      en: 'The highest good is like water, benefiting all things without contending.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #1a4a3a 0%, #0f3a2a 50%, #1a4035 100%)',
      accent: '#7ed8b0',
      tagBg: 'rgba(126,216,176,0.2)',
    },
  },

  zhuangzi: {
    philosopherId: 'zhuangzi',
    philosopherName: { zh: '庄子', en: 'Zhuangzi' },
    typeName: { zh: '逍遥游者', en: 'The Free Wanderer' },
    emoji: '🦋',
    traits: {
      zh: ['逍遥自在', '超越物我', '相对齐物', '精神自由'],
      en: ['Carefree Wandering', 'Beyond Self & World', 'Relativity of Things', 'Spiritual Freedom'],
    },
    description: {
      zh: '你像庄子一样，是精神世界的逍遥游者。你不为世俗的名利所困，不为生死的边界所惧。在你眼中，万物齐一，蝴蝶与我并无分别。真正的自由，是心灵的无所待。',
      en: 'Like Zhuangzi, you are a free wanderer of the spirit. Worldly fame cannot trap you; the boundary of life and death cannot frighten you. In your eyes, all things are one — butterfly and self are indistinguishable. True freedom is a mind that depends on nothing.',
    },
    ideology: {
      zh: '齐物论与逍遥游：万物齐一，无是无非。真正的自由是无所待——不依赖任何外物，独与天地精神往来。',
      en: 'Equality of all things and carefree wandering: all things are one, beyond right and wrong. True freedom depends on nothing external — communing alone with the spirit of heaven and earth.',
    },
    quote: {
      zh: '不知周之梦为胡蝶与，胡蝶之梦为周与？',
      en: 'Did Zhuang Zhou dream he was a butterfly, or is the butterfly dreaming it is Zhuang Zhou?',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #2a4a5a 0%, #1a3a4a 50%, #254555 100%)',
      accent: '#8ec8e8',
      tagBg: 'rgba(142,200,232,0.2)',
    },
  },

  confucius: {
    philosopherId: 'confucius',
    philosopherName: { zh: '孔子', en: 'Confucius' },
    typeName: { zh: '仁爱师者', en: 'The Benevolent Teacher' },
    emoji: '📚',
    traits: {
      zh: ['仁以为己任', '温故知新', '克己复礼', '有教无类'],
      en: ['Benevolence as Duty', 'Review & Innovate', 'Self-Discipline', 'Education for All'],
    },
    description: {
      zh: '你像孔子一样，以"仁"为核心价值，以教化为终身使命。你相信人性可以通过学习和修养来完善，社会秩序可以通过仁和礼来维系。己所不欲，勿施于人——这是你为人处世的黄金法则。',
      en: 'Like Confucius, you hold benevolence (ren) as your core value and education as your lifelong mission. You believe human nature can be perfected through learning and self-cultivation, and social order maintained through ren and li. Do not impose on others what you yourself do not desire.',
    },
    ideology: {
      zh: '仁学体系：仁是最高道德标准，克己复礼为仁。通过学习和修养达到君子人格，以教化实现社会和谐。',
      en: 'The philosophy of Ren: benevolence is the highest moral standard, achieved through self-restraint and ritual propriety. Education and self-cultivation lead to the junzi ideal and social harmony.',
    },
    quote: {
      zh: '己所不欲，勿施于人。',
      en: 'Do not impose on others what you yourself do not desire.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #4a3a1a 0%, #3a2a0f 50%, #453520 100%)',
      accent: '#d8c07e',
      tagBg: 'rgba(216,192,126,0.2)',
    },
  },

  sun_tzu: {
    philosopherId: 'sun_tzu',
    philosopherName: { zh: '孙子', en: 'Sun Tzu' },
    typeName: { zh: '谋略智者', en: 'The Strategist' },
    emoji: '🎯',
    traits: {
      zh: ['全局视野', '虚实谋略', '不战而胜', '因势利导'],
      en: ['Strategic Vision', 'Deception & Reality', 'Win Without Fighting', 'Adapt to Circumstances'],
    },
    description: {
      zh: '你像孙子一样，拥有超越常人的战略眼光。你深谙"知己知彼，百战不殆"的智慧，善于在复杂的局势中找到最优解。最高的胜利不是击败对手，而是不战而屈人之兵。',
      en: 'Like Sun Tzu, you possess a strategic vision beyond ordinary comprehension. You understand the wisdom of "know yourself and know your enemy, and you will never be defeated." The highest victory is not defeating your opponent, but subduing them without fighting.',
    },
    ideology: {
      zh: '兵学圣典：兵者，诡道也。上兵伐谋，其次伐交，其次伐兵，其下攻城。以正合，以奇胜。',
      en: 'The Art of War: all warfare is based on deception. The supreme art is to subdue the enemy without fighting. Win with the orthodox, triumph with the unorthodox.',
    },
    quote: {
      zh: '知己知彼，百战不殆。',
      en: 'Know yourself and know your enemy, and you will never be defeated.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #3a3a2a 0%, #2a2a1a 50%, #353525 100%)',
      accent: '#c8c07e',
      tagBg: 'rgba(200,192,126,0.2)',
    },
  },

  hu_shi: {
    philosopherId: 'hu_shi',
    philosopherName: { zh: '胡适', en: 'Hu Shi' },
    typeName: { zh: '实验主义者', en: 'The Experimentalist' },
    emoji: '🔬',
    traits: {
      zh: ['实证精神', '渐进改良', '大胆假设', '小心求证'],
      en: ['Empirical Spirit', 'Gradual Reform', 'Bold Hypotheses', 'Careful Verification'],
    },
    description: {
      zh: '你像胡适一样，相信真理需要通过实证来检验。你不迷信任何"主义"和教条，主张"多研究些问题，少谈些主义"。大胆的假设，小心的求证——这是你认识世界的方法论。',
      en: 'Like Hu Shi, you believe truth must be verified through empirical evidence. You don\'t worship any "ism" or dogma, advocating "more problems, fewer isms." Bold hypotheses with careful verification — this is your method for understanding the world.',
    },
    ideology: {
      zh: '实验主义与改良主义：真理是不断验证的过程，不是终极结论。通过渐进的社会改良而非激进革命来推动进步。',
      en: 'Experimentalism and gradual reform: truth is an ongoing process of verification, not a final conclusion. Progress comes through gradual social reform, not radical revolution.',
    },
    quote: {
      zh: '大胆的假设，小心的求证。',
      en: 'Bold hypotheses, careful verification.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #2a3a4a 0%, #1a2a3a 50%, #253545 100%)',
      accent: '#8eb8d8',
      tagBg: 'rgba(142,184,216,0.2)',
    },
  },

  wang_yangming: {
    philosopherId: 'wang_yangming',
    philosopherName: { zh: '王阳明', en: 'Wang Yangming' },
    typeName: { zh: '心学觉者', en: 'The Mind Awakened' },
    emoji: '💡',
    traits: {
      zh: ['心即理', '知行合一', '致良知', '事上磨练'],
      en: ['Mind Is Principle', 'Unity of Knowledge & Action', 'Innate Knowing', 'Tempering Through Affairs'],
    },
    description: {
      zh: '你像王阳明一样，相信天理不在外物，而在每个人的心中。你的智慧不在书斋里，而在事上磨练中。知行合一——知道而不去做，等于不知道。致良知，是你生命的终极指引。',
      en: 'Like Wang Yangming, you believe that heavenly principle resides not in external things but in every person\'s mind. Your wisdom is not found in the study but in the crucible of lived experience. To know and not to act is not to truly know. Extending innate knowing is your ultimate compass.',
    },
    ideology: {
      zh: '心学体系：心外无物，心外无理。知行合一，致良知。在事上磨练中实现道德自觉和人格完善。',
      en: 'School of Mind: nothing exists outside the mind, no principle exists outside the mind. Unity of knowledge and action, extending innate knowing. Moral awakening through engagement with real affairs.',
    },
    quote: {
      zh: '知是行之始，行是知之成。',
      en: 'Knowledge is the beginning of action; action is the completion of knowledge.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #4a2a1a 0%, #3a1a0f 50%, #452515 100%)',
      accent: '#e8b07e',
      tagBg: 'rgba(232,176,126,0.2)',
    },
  },

  zhu_xi: {
    philosopherId: 'zhu_xi',
    philosopherName: { zh: '朱熹', en: 'Zhu Xi' },
    typeName: { zh: '理学集大成者', en: 'The Great Synthesizer' },
    emoji: '🏛️',
    traits: {
      zh: ['格物致知', '理气合一', '居敬穷理', '博学慎思'],
      en: ['Investigation of Things', 'Unity of Li & Qi', 'Reverence & Inquiry', 'Broad Learning & Deep Thought'],
    },
    description: {
      zh: '你像朱熹一样，是中国哲学史上最伟大的体系建构者。你相信通过格物致知——对万物进行深入的探究——可以抵达天理。你的学问博大精深，你的品格端庄严肃，是理性与秩序的化身。',
      en: 'Like Zhu Xi, you are one of the greatest system-builders in Chinese philosophy. You believe that through the investigation of things — deep inquiry into all phenomena — one can arrive at heavenly principle. Your learning is vast, your character dignified; you are the embodiment of reason and order.',
    },
    ideology: {
      zh: '理学体系：理气论——理是宇宙之本体，气是构成万物的材料。格物致知，即物穷理，最终达到豁然贯通。',
      en: 'Neo-Confucian system: Li (principle) is the cosmic substance; Qi (vital force) is the material of all things. Investigate things to exhaust principle, until sudden comprehensive enlightenment.',
    },
    quote: {
      zh: '问渠那得清如许，为有源头活水来。',
      en: 'How can the channel stay so clear? Because fresh water flows from the living source.',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #1a2a4a 0%, #0f1a3a 50%, #152545 100%)',
      accent: '#7e9cd8',
      tagBg: 'rgba(126,156,216,0.2)',
    },
  },

  huineng: {
    philosopherId: 'huineng',
    philosopherName: { zh: '慧能', en: 'Huineng' },
    typeName: { zh: '禅宗顿悟者', en: 'The Sudden Awakened' },
    emoji: '🪷',
    traits: {
      zh: ['明心见性', '不立文字', '顿悟成佛', '平常心是道'],
      en: ['Seeing One\'s True Nature', 'Beyond Words & Letters', 'Sudden Enlightenment', 'Ordinary Mind Is the Way'],
    },
    description: {
      zh: '你像慧能一样，不识字却成为禅宗六祖。你的智慧不来自书本，而来自内心的直接觉悟。菩提本无树，明镜亦非台——你破除了一切形式和执著，在最平凡的日常中看见了最深刻的真理。',
      en: 'Like Huineng, you became the Sixth Patriarch of Zen without formal education. Your wisdom comes not from books but from direct inner awakening. No Bodhi tree, no bright mirror stand — you shattered all forms and attachments, seeing the profoundest truth in the most ordinary moments.',
    },
    ideology: {
      zh: '禅宗顿悟法门：直指人心，见性成佛。佛法在世间，不离世间觉。不立文字，教外别传。',
      en: 'Zen sudden enlightenment: point directly at the human mind, see one\'s nature and become Buddha. The Dharma is in the world; enlightenment is not apart from the world.',
    },
    quote: {
      zh: '菩提本无树，明镜亦非台。本来无一物，何处惹尘埃。',
      en: 'No Bodhi tree, no bright mirror stand. Originally there is nothing — where can dust alight?',
    },
    theme: {
      gradient: 'linear-gradient(135deg, #2a4a4a 0%, #1a3a3a 50%, #254545 100%)',
      accent: '#8ed8c8',
      tagBg: 'rgba(142,216,200,0.2)',
    },
  },
};

// ============================================================
// 10 QUIZ QUESTIONS — v2 weighted scoring
// Primary archetype: weight 2 | Secondary archetype: weight 1
// Each archetype appears in at most 1 option per question
// ============================================================

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: {
      zh: '面对人生的根本困惑，你的第一反应是？',
      en: 'When facing life\'s fundamental confusion, your first reaction is to...',
    },
    options: [
      {
        text: { zh: '不断追问，直到触及本质', en: 'Keep questioning until I reach the essence' },
        scores: { socrates: 2, descartes: 1 },
      },
      {
        text: { zh: '在更高的理想中寻找答案', en: 'Seek answers in higher ideals' },
        scores: { plato: 2, kant: 1 },
      },
      {
        text: { zh: '分析现实条件，寻找最佳方案', en: 'Analyze reality and find the optimal solution' },
        scores: { aristotle: 2, sun_tzu: 1 },
      },
      {
        text: { zh: '接纳困惑，顺应自然', en: 'Accept confusion and go with the flow' },
        scores: { laozi: 2, schopenhauer: 1 },
      },
    ],
  },
  {
    id: 2,
    question: {
      zh: '你认为最重要的知识来源是？',
      en: 'What do you consider the most important source of knowledge?',
    },
    options: [
      {
        text: { zh: '理性推理和逻辑', en: 'Rational reasoning and logic' },
        scores: { descartes: 2, zhu_xi: 1 },
      },
      {
        text: { zh: '经验和观察', en: 'Experience and observation' },
        scores: { hu_shi: 2, aristotle: 1 },
      },
      {
        text: { zh: '内心直觉和顿悟', en: 'Inner intuition and sudden insight' },
        scores: { huineng: 2, wang_yangming: 1 },
      },
      {
        text: { zh: '对话和质疑', en: 'Dialogue and questioning' },
        scores: { confucius: 2, socrates: 1 },
      },
    ],
  },
  {
    id: 3,
    question: {
      zh: '你理想中的生活状态是？',
      en: 'Your ideal state of living is...',
    },
    options: [
      {
        text: { zh: '简朴自足，修身齐家', en: 'Simple and content, cultivating self and family' },
        scores: { zhu_xi: 2, confucius: 1 },
      },
      {
        text: { zh: '充满激情地创造和超越', en: 'Passionately creating and transcending' },
        scores: { nietzsche: 2, marx: 1 },
      },
      {
        text: { zh: '顺应自然，无欲无求', en: 'Following nature, free from desires' },
        scores: { schopenhauer: 2, laozi: 1 },
      },
      {
        text: { zh: '自由自在，逍遥无待', en: 'Free and unfettered, wandering without dependence' },
        scores: { zhuangzi: 2, huineng: 1 },
      },
    ],
  },
  {
    id: 4,
    question: {
      zh: '面对苦难和逆境，你会？',
      en: 'When facing suffering and adversity, you would...',
    },
    options: [
      {
        text: { zh: '理性接受，尽己之责', en: 'Rationally accept it and fulfill my duty' },
        scores: { kant: 2, confucius: 1 },
      },
      {
        text: { zh: '从中汲取力量，变得更强大', en: 'Draw strength from it and grow stronger' },
        scores: { nietzsche: 2, sun_tzu: 1 },
      },
      {
        text: { zh: '寻求内心的平静和超脱', en: 'Seek inner peace and transcendence' },
        scores: { wang_yangming: 2, huineng: 1 },
      },
      {
        text: { zh: '用行动去改变现状', en: 'Take action to change the situation' },
        scores: { marx: 2, hu_shi: 1 },
      },
    ],
  },
  {
    id: 5,
    question: {
      zh: '什么让你感到真正的满足？',
      en: 'What gives you a sense of true satisfaction?',
    },
    options: [
      {
        text: { zh: '做出正确的选择，践行美德', en: 'Making the right choice and practicing virtue' },
        scores: { kant: 2, aristotle: 1 },
      },
      {
        text: { zh: '在知行合一中感到充实', en: 'Feeling fulfilled through unity of knowledge and action' },
        scores: { wang_yangming: 2, marx: 1 },
      },
      {
        text: { zh: '摆脱欲望的束缚，获得安宁', en: 'Breaking free from desire and finding peace' },
        scores: { schopenhauer: 2, zhuangzi: 1 },
      },
      {
        text: { zh: '在求知和探索中找到乐趣', en: 'Finding joy in seeking knowledge and exploring' },
        scores: { socrates: 2, descartes: 1 },
      },
    ],
  },
  {
    id: 6,
    question: {
      zh: '你认为改变世界最好的方式是？',
      en: 'The best way to change the world is...',
    },
    options: [
      {
        text: { zh: '通过理念的传播和启蒙', en: 'Through the spread and enlightenment of ideas' },
        scores: { plato: 2, zhu_xi: 1 },
      },
      {
        text: { zh: '通过行动和变革', en: 'Through action and transformation' },
        scores: { marx: 2, sun_tzu: 1 },
      },
      {
        text: { zh: '通过教育和渐进改良', en: 'Through education and gradual reform' },
        scores: { hu_shi: 2, confucius: 1 },
      },
      {
        text: { zh: '通过内心的觉醒来影响世界', en: 'Through inner awakening to influence the world' },
        scores: { huineng: 2, wang_yangming: 1 },
      },
    ],
  },
  {
    id: 7,
    question: {
      zh: '在社交场合中，你通常是？',
      en: 'In social settings, you are usually...',
    },
    options: [
      {
        text: { zh: '引导对话，启发思考', en: 'Guiding conversations and inspiring thought' },
        scores: { socrates: 2, confucius: 1 },
      },
      {
        text: { zh: '安静观察，深思熟虑', en: 'Quietly observing, thinking deeply' },
        scores: { descartes: 2, zhu_xi: 1 },
      },
      {
        text: { zh: '坚守立场，引领方向', en: 'Standing firm and leading the direction' },
        scores: { nietzsche: 2, kant: 1 },
      },
      {
        text: { zh: '随缘自在，不强求', en: 'Going with the flow, not forcing anything' },
        scores: { laozi: 2, zhuangzi: 1 },
      },
    ],
  },
  {
    id: 8,
    question: {
      zh: '如果让你负责一个团队完成新项目，你最看重什么？',
      en: 'If you were put in charge of a team for a new project, what would you value most?',
    },
    options: [
      {
        text: { zh: '先画出清晰愿景和长远目标', en: 'First, map out a clear vision and long-term goals' },
        scores: { plato: 2, zhu_xi: 1 },
      },
      {
        text: { zh: '营造能让人安心投入的氛围', en: 'Create an atmosphere where people can devote themselves fully' },
        scores: { schopenhauer: 2, aristotle: 1 },
      },
      {
        text: { zh: '制定可执行步骤、尽快拿出成果', en: 'Set executable steps and deliver results quickly' },
        scores: { hu_shi: 2, sun_tzu: 1 },
      },
      {
        text: { zh: '激发每个人内心的责任感和自驱力', en: "Inspire each person's inner sense of responsibility and self-drive" },
        scores: { wang_yangming: 2, descartes: 1 },
      },
    ],
  },
  {
    id: 9,
    question: {
      zh: '你的决策方式更接近？',
      en: 'Your decision-making style is closer to...',
    },
    options: [
      {
        text: { zh: '深思熟虑，权衡利弊', en: 'Deliberate carefully, weighing pros and cons' },
        scores: { aristotle: 2, confucius: 1 },
      },
      {
        text: { zh: '直觉驱动，当机立断', en: 'Intuition-driven, decisive in the moment' },
        scores: { huineng: 2, wang_yangming: 1 },
      },
      {
        text: { zh: '理性分析，严格推演', en: 'Rational analysis and strict deduction' },
        scores: { zhu_xi: 2, descartes: 1 },
      },
      {
        text: { zh: '灵活应变，因势利导', en: 'Flexible adaptation, leveraging circumstances' },
        scores: { sun_tzu: 2, marx: 1 },
      },
    ],
  },
  {
    id: 10,
    question: {
      zh: '如果突然获得一整天的完全自由，你最想做什么？',
      en: 'If you suddenly got a full day of total freedom, how would you spend it?',
    },
    options: [
      {
        text: { zh: '找一本好书，沉浸在深度思考中', en: 'Find a good book and lose myself in deep thought' },
        scores: { socrates: 2, plato: 1 },
      },
      {
        text: { zh: '去探索一个从没去过的地方', en: 'Go explore somewhere I\'ve never been' },
        scores: { zhuangzi: 2, nietzsche: 1 },
      },
      {
        text: { zh: '和重要的人共度温暖时光', en: 'Spend quality time with people I care about' },
        scores: { confucius: 2, kant: 1 },
      },
      {
        text: { zh: '什么也不做，安静地待着', en: 'Do absolutely nothing, just be' },
        scores: { laozi: 2, schopenhauer: 1 },
      },
    ],
  },
];

// ============================================================
// SCORING FUNCTION (supports weighted scores)
// ============================================================

export function computeResult(answers: number[]): { archetypeId: string; scores: Record<string, number> } {
  const scoreMap: Record<string, number> = {};

  answers.forEach((optionIdx, qIdx) => {
    const q = questions[qIdx];
    if (!q || !q.options[optionIdx]) return;
    const scores = q.options[optionIdx].scores;
    for (const [pid, weight] of Object.entries(scores)) {
      scoreMap[pid] = (scoreMap[pid] || 0) + weight;
    }
  });

  let best = 'socrates';
  let bestScore = -1;
  for (const [pid, score] of Object.entries(scoreMap)) {
    if (score > bestScore) {
      bestScore = score;
      best = pid;
    }
  }

  return { archetypeId: best, scores: scoreMap };
}
