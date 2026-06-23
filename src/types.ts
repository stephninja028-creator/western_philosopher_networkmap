export interface Philosopher {
  id: string;
  name: string;        // e.g., '泰勒斯'
  nameEng: string;     // e.g., 'Thales'
  eraDisp: string;     // e.g., 'BC6世纪'
  school: string;      // e.g., '米利都学派'
  concepts: string[];  // e.g., ['水是万物的本原', '第一哲学']
  isMajor: boolean;    // "黑色加大字代表对西方哲学主体影响很大的人物"
  isOutside: boolean;  // "斜体代表传承或影响不在该主体体系中"
  isSecondary?: boolean; // gray text / less prominent
  x: number;           // relative placement or column (0-100)
  y: number;           // temporal axis or position (0-100)
  details?: string;    // Expanded biography and core tenets
  wikiUrl?: string;
  pedigreeLevel?: number; // Academic pedigree level (1 to 5)
  
  // Enriched Content for deep learning and reflection
  lifeAndTimes?: string;       // 详细个人生平与时代背景 (Detailed biographical context)
  worldviewSummary?: string;   // 主要哲学思想体系与世界观深度阐述 (Key philosophical system & worldview)
  quote?: string;              // 传世哲学金句 (Core famous quote)
  reflectionQuestion?: string; // 针对其世界观的启发自省问题 (Reflective philosophical question)
  comparisons?: {             // 与其他哲学家的关联、异同对比与思索 (Comparative relations)
    withId: string;            // 对照哲学家的ID
    withName: string;          // 对照哲学家的名字 (如 '柏拉图')
    relationType: 'opponent' | 'successor' | 'synthesizer' | 'influence'; // 碰撞性质
    coreDifference: string;    // 核心主张与方法论异同评析
    reflectionPrompt: string;  // 启发读者权衡二人世界观的思辨点
  }[];
}

export interface PedigreeInfo {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  enLabel: string;
  stars: string;
  colorClass: string;
  bgBadgeClass: string;
  desc: string;
}

export function getPhilosopherPedigree(p: Philosopher): PedigreeInfo {
  const getBasePedigree = () => {
    // If explicitly defined on the object, use it
    if (p.pedigreeLevel) {
      return p.pedigreeLevel;
    }

    // Set of absolute level 5 giants
    const LEVEL_5_IDS = new Set([
      'socrates', 'plato', 'aristotle', // Ancient Greece
      'augustine', 'aquinas',            // Middle Ages & Scholasticism
      'descartes', 'kant', 'hegel',     // Rationalists, Idealism
      'hume', 'spinoza', 'locke',        // Key moderns
      'nietzsche', 'nietzche', 'marx',   // Late 19th Century
      'heidegger', 'wittgenstein'        // 20th Century
    ]);

    const pid = p.id?.toLowerCase() || '';

    // Level 5: Major Master
    if (p.isMajor && LEVEL_5_IDS.has(pid)) {
      return 5;
    }

    // Level 4: Eminent Sage
    if (p.isMajor) {
      return 4;
    }

    // Level 1: Outside Explorer
    if (p.isOutside) {
      return 1;
    }

    // Level 2: Contributing Scholar
    if (p.isSecondary) {
      return 2;
    }

    // Level 3: Core Sage
    return 3;
  };

  const level = getBasePedigree() as 1 | 2 | 3 | 4 | 5;

  switch (level) {
    case 5:
      return {
        level: 5,
        label: '巨擘宗师',
        enLabel: 'Major Master',
        stars: '★★★★★',
        colorClass: 'text-amber-500 font-extrabold drop-shadow-[0_1px_2px_rgba(212,175,55,0.4)]',
        bgBadgeClass: 'bg-gradient-to-r from-amber-950 to-slate-900 border border-amber-500/50 text-amber-300',
        desc: '哲学王座的核心。开创或彻底重构了西方形而上学或思辨系统的巅峰思想巨人。'
      };
    case 4:
      return {
        level: 4,
        label: '传世先驱',
        enLabel: 'Eminent Sage',
        stars: '★★★★☆',
        colorClass: 'text-amber-700 font-bold',
        bgBadgeClass: 'bg-amber-100/80 border border-amber-300 text-amber-900',
        desc: '开创、拓展了哲学主要流派，对后世具有系统性与划时代影响的关键先驱贤者。'
      };
    case 3:
      return {
        level: 3,
        label: '核心贤哲',
        enLabel: 'Core Sage',
        stars: '★★★☆☆',
        colorClass: 'text-[#0D5C75] font-semibold',
        bgBadgeClass: 'bg-indigo-50 border border-indigo-150 text-[#0D5C75]',
        desc: '哲学谱系的中坚。代表了特定学派的核心论证与真理探索的关键接续节点。'
      };
    case 2:
      return {
        level: 2,
        label: '沿袭学者',
        enLabel: 'Contributing Scholar',
        stars: '★★☆☆☆',
        colorClass: 'text-slate-600 font-medium',
        bgBadgeClass: 'bg-slate-50 border border-slate-200 text-slate-700',
        desc: '学派的中流砥柱，对其所属思想体系起到了完善、评注与传续作用的杰出学者。'
      };
    case 1:
    default:
      return {
        level: 1,
        label: '界外探索者',
        enLabel: 'Outside Explorer',
        stars: '★☆☆☆☆',
        colorClass: 'text-gray-400 font-normal italic',
        bgBadgeClass: 'bg-gray-50 border border-gray-150 text-gray-500 border-dashed',
        desc: '独立或旁支发展的探求者，传承偏离主体主轴或游历在思想体系边缘的探索灵魂。'
      };
  }
}

export interface Connection {
  from: string;
  to: string;
  type: 'succession' | 'influence'; // succession (solid), influence (dashed)
}

export interface Epoch {
  id: number;
  title: string;       // e.g., '古希腊罗马哲学'
  subtitle: string;    // e.g., 'BC6世纪 ~ AD4世纪'
  description: string; // High level summary of the period
  philosophers: Philosopher[];
  connections: Connection[];
  timeGrid: string[];  // labels on the axis, e.g., ['BC6世纪', 'BC5世纪', ...]
}

export type ThemeMode = 'classic' | 'olympus'; // options to change themes smoothly
