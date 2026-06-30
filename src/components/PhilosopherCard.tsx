import React from 'react';
import { Philosopher, getPhilosopherPedigree } from '../types';
import { schoolTranslations, philosopherFallbackTranslations, conceptTranslations } from '../data/translationsEng';

interface PhilosopherCardProps {
  philosopher: Philosopher;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onDoubleClick?: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  highlightedIds: Set<string>;
  selectedLevels?: number[];
  isHoverActive?: boolean;
  language?: 'zh' | 'en';
  translatedValues?: {
    details?: string;
    concepts?: string[];
  };
}

export const getSchoolAccent = (school: string) => {
  const s = school || '';
  if (/米利都|毕达哥拉斯|爱利亚|爱奥尼亚|多元论|原子论|自然哲学/.test(s)) {
    return {
      border: 'border-l-teal-500',
      borderFull: 'border-teal-200 hover:border-teal-400',
      text: 'text-teal-900',
      bg: 'bg-[#F2FAF9]',
      tagBg: 'text-teal-600 bg-teal-50/85 border border-teal-100',
      label: '宇宙科学/自然哲学'
    };
  }
  if (/雅典|智者|昔兰尼|麦加拉|学院/.test(s)) {
    return {
      border: 'border-l-sky-500',
      borderFull: 'border-sky-200 hover:border-sky-400',
      text: 'text-sky-900',
      bg: 'bg-[#F0F7FA]',
      tagBg: 'text-sky-600 bg-sky-50/85 border border-sky-100',
      label: '古希腊雅典流派'
    };
  }
  if (/斯多葛|伊壁鸠鲁|怀疑主义|折中主义|新柏拉图|犬儒|罗马/.test(s)) {
    return {
      border: 'border-l-amber-500',
      borderFull: 'border-amber-200 hover:border-amber-400',
      text: 'text-amber-900',
      bg: 'bg-[#FDF9F4]',
      tagBg: 'text-amber-600 bg-amber-50/85 border border-amber-100',
      label: '希腊化与罗马伦理学'
    };
  }
  if (/教父|中世纪|经院|唯名|圣托马斯|阿奎那|阿尔伯特|概念|意志倾|经验学派（近科学）/.test(s)) {
    return {
      border: 'border-l-emerald-500',
      borderFull: 'border-emerald-200 hover:border-emerald-400',
      text: 'text-emerald-900',
      bg: 'bg-[#F5FAF5]',
      tagBg: 'text-emerald-600 bg-emerald-50/85 border border-emerald-100',
      label: '中世纪神学与经院学派'
    };
  }
  if (/理性主义|唯理论/.test(s)) {
    return {
      border: 'border-l-indigo-500',
      borderFull: 'border-indigo-200 hover:border-indigo-400',
      text: 'text-indigo-900',
      bg: 'bg-[#F4F6FC]',
      tagBg: 'text-indigo-600 bg-indigo-50/85 border border-[#D4AF37]/50',
      label: '近代唯理论'
    };
  }
  if (/经验主义|经验学派/.test(s)) {
    return {
      border: 'border-l-yellow-600',
      borderFull: 'border-yellow-200 hover:border-yellow-400',
      text: 'text-yellow-950',
      bg: 'bg-[#FFFDF3]',
      tagBg: 'text-yellow-700 bg-yellow-50/85 border border-yellow-105',
      label: '近代经验论'
    };
  }
  if (/启蒙|自然神论|百科全书|战斗唯物|激进启|温和启|功利唯|近代唯物|人文学派|人文主义|宗教改革/.test(s)) {
    return {
      border: 'border-l-rose-500',
      borderFull: 'border-rose-250 hover:border-rose-455',
      text: 'text-rose-900',
      bg: 'bg-[#FFF9FA]',
      tagBg: 'text-rose-600 bg-rose-50/85 border border-rose-105',
      label: '文艺复兴与启蒙运动'
    };
  }
  if (/批判哲学|唯心主义|同一唯心/.test(s)) {
    return {
      border: 'border-l-purple-500',
      borderFull: 'border-purple-250 hover:border-purple-455',
      text: 'text-purple-900',
      bg: 'bg-[#FCF8FF]',
      tagBg: 'text-purple-600 bg-purple-50/85 border border-purple-105',
      label: '德意志古典哲学'
    };
  }
  if (/青年黑格尔|人本主义|非理性|存在主义|实证主义|功利主义|社会达尔文|唯物主义\/社会学/.test(s)) {
    return {
      border: 'border-l-red-650',
      borderFull: 'border-red-200 hover:border-red-400',
      text: 'text-red-900',
      bg: 'bg-[#FFFDFD]',
      tagBg: 'text-red-600 bg-red-50/85 border border-red-105',
      label: '现代实证与非理性转向'
    };
  }
  return {
    border: 'border-l-gray-400',
    borderFull: 'border-gray-200 hover:border-gray-300',
    text: 'text-gray-900',
    bg: 'bg-[#FAFAFA]',
    tagBg: 'text-gray-600 bg-gray-50 border border-gray-100',
    label: '其他思想领域'
  };
};

export const PhilosopherCard: React.FC<PhilosopherCardProps> = ({
  philosopher,
  isSelected,
  isHovered,
  onSelect,
  onDoubleClick,
  onHoverStart,
  onHoverEnd,
  highlightedIds,
  selectedLevels,
  isHoverActive,
  language = 'zh',
  translatedValues,
}) => {
  const { name, nameEng, school, isOutside } = philosopher;
  const pedigree = getPhilosopherPedigree(philosopher);
  const isLvl5 = pedigree.level === 5;
  const isLvl4 = pedigree.level === 4;

  const isEn = language === 'en';

  const schoolAccent = getSchoolAccent(school);

  const fontStyle = isOutside ? 'italic' : 'normal';
  const fontWeight = isLvl5 ? 'font-black' : isLvl4 ? 'font-bold' : 'font-medium';
  
  // Highlight system
  const isDirectlyConnected = highlightedIds.has(philosopher.id);
  const belongsToSecondaryHighlight = highlightedIds.size > 0 && !isDirectlyConnected && !isSelected;

  // Level selector / filtering state
  const isUnfiltered = selectedLevels && !selectedLevels.includes(pedigree.level);

  let finalOpacity = 1.0;
  if (isUnfiltered) {
    finalOpacity = isHovered ? 0.45 : isSelected ? 0.8 : 0.15;
  } else if (belongsToSecondaryHighlight) {
    finalOpacity = isHoverActive ? 0.35 : 0.88;
  }

  // Handle bilingualism for fields:
  const displaySchool = isEn ? (schoolTranslations[school] || school) : school;
  const displayMainName = isEn ? (nameEng || name) : name;
  const displaySubName = isEn ? '' : nameEng;

  const displayStars = pedigree.stars;
  const displayPedigreeLabel = isEn ? (
    pedigree.level === 5 ? 'Sovereign Master' :
    pedigree.level === 4 ? 'Pioneering Leader' :
    pedigree.level === 3 ? 'Key Sage' :
    pedigree.level === 2 ? 'Contributor' : 'Peripheral'
  ) : pedigree.label;

  const hoverHeader = isEn ? 'Double click for inner roll' : '双击可查阅生平';
  const displayConcepts = translatedValues?.concepts || 
    (isEn && philosopherFallbackTranslations[philosopher.id]?.concepts) || 
    philosopher.concepts;

  return (
    <div
      id={`philosopher-card-${philosopher.id}`}
      className={`absolute cursor-pointer transition-all duration-300 rounded shadow-xs py-0.5 px-1 md:px-1.5 select-none flex flex-col items-center justify-center w-[100px] md:w-[114px] h-[38px] md:h-[42px] border-l-[3.5px] ${schoolAccent.border}
        ${isSelected 
          ? 'bg-gradient-to-b from-[#0D5C75] to-[#0A4A5E] text-white border-t border-r border-b border-[#D4AF37] shadow-[0_3px_10px_rgba(212,175,55,0.4)] scale-102 z-40 font-semibold' 
          : isHovered
            ? 'bg-[#EBF5F8] text-[#0D5C75] border-t border-r border-b border-[#D4AF37] shadow-[0_3px_8px_rgba(13,92,117,0.15)] scale-102 z-30'
            : isDirectlyConnected
              ? 'bg-[#F2EFE9] text-[#0D5C75] border-t border-r border-b border-[#D4AF37]/60 shadow-xs z-20 animate-pulse'
              : isLvl5
                ? 'gilded-shimmer-border bg-gradient-to-b from-[#FFFDF0] via-[#FCF9EC] to-[#FAF3E0] text-amber-950 border-t border-r border-b border-[#D4AF37] z-25 shadow-[0_2px_8px_rgba(212,175,55,0.25)]'
                : isLvl4
                  ? 'bg-[#FFFDF9] hover:bg-[#FAF5EB] text-gray-900 border-t border-r border-b border-[#D4AF37]/65 z-18 shadow-[0_1.5px_4px_rgba(212,175,55,0.08)] hover:border-[#D4AF37]'
                  : pedigree.level === 1
                    ? `${schoolAccent.bg} text-slate-500 border-t border-r border-b border-gray-200 border-dashed hover:border-gray-400 z-10`
                    : pedigree.level === 2
                      ? `${schoolAccent.bg} text-gray-750 border-t border-r border-b border-gray-200 hover:border-gray-300 z-12`
                      : `${schoolAccent.bg} text-[#0D5C75] border-t border-r border-b border-gray-300 hover:border-[#0D5C75] shadow-xs z-15`
        }
        ${belongsToSecondaryHighlight ? 'saturate-50' : 'saturate-100'}
        ${isUnfiltered ? 'filter grayscale-[30%]' : ''}
      `}
      style={{
        left: `${philosopher.x}%`,
        top: `${philosopher.y}%`,
        transform: 'translate(-50%, -50%) scale(var(--tw-scale-x, 1))',
        opacity: finalOpacity,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (onDoubleClick) onDoubleClick();
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      title={isEn 
        ? `${nameEng} (${displaySchool}) • [Academic Level] ${displayStars} ${displayPedigreeLabel}` 
        : `${name} (${schoolAccent.label}) • 【学术定位】${pedigree.stars} ${pedigree.label}`}
    >
      <div className="flex flex-col items-center text-center w-full truncate">
        {/* School tag - tiny */}
        <span className={`text-[7.5px] tracking-wider uppercase font-mono scale-90 pb-0.2 opacity-85 truncate max-w-full ${isSelected ? 'text-[#D4AF37]' : (isLvl5 || isLvl4) ? 'text-amber-800 font-semibold' : 'text-gray-500'}`}>
          {displaySchool}
        </span>
        
        {/* Greek-accented name layout */}
        <h3 
          className={`tracking-tight text-xs ${fontWeight} ${fontStyle}
            ${isSelected ? 'text-white' : isLvl5 ? 'text-amber-950 text-[12px] filter drop-shadow-[0_0.2px_0.5px_rgba(212,175,55,0.15)]' : isLvl4 ? 'text-amber-900' : 'text-gray-850'}
          `}
          style={{ fontStyle }}
        >
          {displayMainName}
        </h3>
        
        {/* English or Chinese subname below */}
        <span className={`text-[8px] tracking-tight scale-90 opacity-80 font-serif font-light leading-none truncate max-w-full ${isSelected ? 'text-[#F3EFE0]' : 'text-gray-400'}`}>
          {displaySubName}
        </span>
      </div>

      {/* Mini concept bubbles shown on select or hover */}
      {(isSelected || isHovered) && displayConcepts.length > 0 && (
        <div className="absolute top-[102%] left-1/2 -translate-x-1/2 bg-[#0B2545] text-[#FDFDFB] text-[9.5px] rounded px-1.5 py-0.5 w-max max-w-[160px] border border-[#D4AF37] pointer-events-none shadow-md flex flex-col gap-0.5 z-50 leading-tight">
          <div className="font-bold border-b border-[#D4AF37]/30 pb-0.5 text-[#D4AF37] tracking-wider font-mono text-[8px] text-center">{hoverHeader}</div>
          {displayConcepts.slice(0, 3).map((concept, idx) => {
            const conceptText = isEn ? (conceptTranslations[concept] || concept) : concept;
            return (
              <div key={idx} className="flex items-start gap-1 truncate max-w-[150px]">
                <span className="text-[#D4AF37] scale-75">•</span>
                <span className="truncate">{conceptText}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
