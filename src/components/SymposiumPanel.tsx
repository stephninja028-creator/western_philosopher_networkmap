import React, { useState, useMemo } from 'react';
import { Epoch, Philosopher } from '../types';
import { symposiumDebates, DebateTopic } from '../data/symposiumData';
import { schoolTranslations, symposiumTranslations, philosopherFallbackTranslations, conceptTranslations, translateEraDisp } from '../data/translationsEng';
import { Swords, Landmark, Scroll, MessageSquare, ShieldCheck, Key, RefreshCw, HelpCircle } from 'lucide-react';

interface SymposiumPanelProps {
  epoch: Epoch;
  allEpochs: Epoch[];
  onSelectPhilosopher: (p: Philosopher) => void;
  language?: 'zh' | 'en';
  translatedPhilosopherValues?: Record<string, any>;
  debateRemaining: number;
  unlimitedActivated: boolean;
  onDeductDebate: () => boolean; // returns true if deduct succeeded, false if paywall hit
  onTriggerPayment: () => void;
}

export const SymposiumPanel: React.FC<SymposiumPanelProps> = ({
  epoch,
  allEpochs,
  onSelectPhilosopher,
  language = 'zh',
  translatedPhilosopherValues,
  debateRemaining,
  unlimitedActivated,
  onDeductDebate,
  onTriggerPayment,
}) => {
  const [activePresetId, setActivePresetId] = useState<string>('ideal-real');
  
  // Custom manual thinkers selected for comparative analysis
  const [customP1Id, setCustomP1Id] = useState<string>('');
  const [customP2Id, setCustomP2Id] = useState<string>('');

  // Dual Debate state engines
  const [compareTab, setCompareTab] = useState<'static' | 'ai'>('static');
  const [debateTopic, setDebateTopic] = useState('');
  const [debateRounds, setDebateRounds] = useState<any[]>([]);
  const [debateLoading, setDebateLoading] = useState(false);
  const [debateError, setDebateError] = useState('');

  // Reset debate state if user changes selected philosophers
  React.useEffect(() => {
    setDebateTopic('');
    setDebateRounds([]);
    setDebateError('');
    setCompareTab('static');
  }, [customP1Id, customP2Id]);

  const isEn = language === 'en';

  // All philosophers flat-listed for quick manual dropdown
  const allPhilosophersFlat = useMemo(() => {
    const list: Philosopher[] = [];
    allEpochs.forEach(ep => {
      ep.philosophers.forEach(p => {
        list.push(p);
      });
    });
    return list;
  }, [allEpochs]);

  // Current selected preset debate
  const activePreset = useMemo(() => {
    return symposiumDebates.find(d => d.id === activePresetId) || symposiumDebates[0];
  }, [activePresetId]);

  // Translate active preset dialogue
  const translatedPreset = useMemo(() => {
    if (!isEn) return activePreset;
    const trans = symposiumTranslations[activePreset.id];
    if (!trans) return activePreset;

    const translateSpeaker = (name: string) => {
      if (name.includes('柏拉图')) return 'Plato';
      if (name.includes('亚里士多德')) return 'Aristotle';
      if (name.includes('笛卡尔')) return 'Descartes';
      if (name.includes('洛克')) return 'Locke';
      if (name.includes('叔本华')) return 'Schopenhauer';
      if (name.includes('尼采')) return 'Nietzsche';
      if (name.includes('黑格尔')) return 'Hegel';
      if (name.includes('马克思')) return 'Marx';
      return name;
    };

    return {
      ...activePreset,
      title: trans.title,
      question: trans.question,
      p1Name: translateSpeaker(activePreset.p1Name),
      p2Name: translateSpeaker(activePreset.p2Name),
      dialogue: activePreset.dialogue.map((bubble, i) => ({
        speaker: translateSpeaker(bubble.speaker),
        text: trans.dialogue[i]?.text || bubble.text
      }))
    };
  }, [activePreset, isEn]);

  // Retrieve custom philosopher instances based on selection
  const p1 = useMemo(() => {
    return allPhilosophersFlat.find(p => p.id === customP1Id);
  }, [customP1Id, allPhilosophersFlat]);

  const p2 = useMemo(() => {
    return allPhilosophersFlat.find(p => p.id === customP2Id);
  }, [customP2Id, allPhilosophersFlat]);

  const getPTranslation = (p: Philosopher | undefined) => {
    if (!p) return undefined;
    if (!isEn) {
      return {
        name: p.name,
        subName: p.nameEng,
        school: p.school,
        concepts: p.concepts,
        details: p.details,
        eraDisp: p.eraDisp,
      };
    }
    const dynamic = translatedPhilosopherValues?.[p.id];
    const fallback = philosopherFallbackTranslations[p.id];
    
    const rawConcepts = dynamic?.concepts || fallback?.concepts || p.concepts;
    return {
      name: p.nameEng || p.name,
      subName: p.name,
      school: schoolTranslations[p.school] || p.school,
      concepts: rawConcepts.map(c => isEn ? (conceptTranslations[c] || c) : c),
      details: dynamic?.details || fallback?.details || p.details,
      eraDisp: translateEraDisp(p.eraDisp),
    };
  };

  const p1Trans = useMemo(() => getPTranslation(p1), [p1, isEn, translatedPhilosopherValues]);
  const p2Trans = useMemo(() => getPTranslation(p2), [p2, isEn, translatedPhilosopherValues]);

  return (
    <div className="bg-[#FDFDFB] rounded-xl border border-[#D4AF37] shadow-xl overflow-hidden p-5 sm:p-6 relative font-serif">
      {/* Decorative Greek Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/75 mt-2 ml-2" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/75 mt-2 mr-2" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/75 mb-2 ml-2" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/75 mb-2 mr-2" />

      {/* Header */}
      <div className="text-center mb-6 z-10 relative">
        <span className="text-xs tracking-widest text-[#D4AF37] uppercase font-mono font-bold block mb-1">
          {isEn ? 'THE PALESTRA SYMPOSIUM' : 'THE PALESTRA symposium'}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0D5C75] tracking-widest uppercase">
          {isEn ? 'Athenian Symposium · Dialectical Clash' : '雅典学园之辩 · 思想交锋'}
        </h3>
        <p className="text-xs text-gray-500 font-sans max-w-xl mx-auto mt-1">
          {isEn 
            ? 'Juxtapose two great thinkers inside an intellectual salon. Discover the harmonies and clashes on metaphysics, epistemology, and ethics through highly dramatic virtual dialogues.'
            : '将两位先哲并置于思想沙龙之中。通过极具张力的虚拟对话与辩证对比，洞若观火地解析心物、理路与救赎之争的异同。'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Side: Topic Presets & Selectors */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#D4AF37]/35 shadow-sm">
            <h4 className="text-xs font-bold text-[#0B2545] tracking-widest uppercase mb-3 border-b border-[#D4AF37]/30 pb-2 font-sans">
              {isEn ? '👑 Preset Debates' : '👑 精选思想公案 (Presets)'}
            </h4>
            <div className="flex flex-col gap-2">
              {symposiumDebates.map(debate => {
                const isActive = activePresetId === debate.id && !customP1Id;
                const trans = symposiumTranslations[debate.id];
                const displayTitle = isEn && trans ? trans.title : debate.title;
                const p1DispName = isEn ? (debate.p1Id === 'plato' ? 'Plato' : debate.p1Id === 'aristotle' ? 'Aristotle' : debate.p1Id === 'descartes' ? 'Descartes' : debate.p1Id === 'locke' ? 'Locke' : debate.p1Id === 'schopenhauer' ? 'Schopenhauer' : debate.p1Id === 'nietzche' ? 'Nietzsche' : debate.p1Id === 'hegel' ? 'Hegel' : debate.p1Id === 'marx' ? 'Marx' : debate.p1Name) : debate.p1Name;
                const p2DispName = isEn ? (debate.p2Id === 'plato' ? 'Plato' : debate.p2Id === 'aristotle' ? 'Aristotle' : debate.p2Id === 'descartes' ? 'Descartes' : debate.p2Id === 'locke' ? 'Locke' : debate.p2Id === 'schopenhauer' ? 'Schopenhauer' : debate.p2Id === 'nietzche' ? 'Nietzsche' : debate.p2Id === 'hegel' ? 'Hegel' : debate.p2Id === 'marx' ? 'Marx' : debate.p2Name) : debate.p2Name;
                
                return (
                  <button
                    key={debate.id}
                    onClick={() => {
                      setActivePresetId(debate.id);
                      setCustomP1Id('');
                      setCustomP2Id('');
                    }}
                    className={`w-full text-left py-2 px-3 rounded text-xs transition-all duration-200 border cursor-pointer
                      ${isActive
                        ? 'bg-[#0D5C75] text-white border-[#D4AF37] shadow-sm font-semibold'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-[#F2EFE9] hover:border-[#D4AF37]/60'
                      }`}
                  >
                    <div className="font-bold tracking-wide">{displayTitle}</div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                      {p1DispName} vs {p2DispName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom comparative generator */}
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#D4AF37]/35 shadow-sm">
            <h4 className="text-xs font-bold text-[#0B2545] tracking-widest uppercase mb-3 border-b border-[#D4AF37]/30 pb-2 font-sans">
              {isEn ? '🏛️ Custom Comparison' : '🏛️ 自定义群星对照'}
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <div>
                <label className="block text-gray-500 mb-1 font-sans">
                  {isEn ? 'Select Philosopher 1:' : '选择哲学家一：'}
                </label>
                <select
                  value={customP1Id}
                  onChange={(e) => {
                    setCustomP1Id(e.target.value);
                    setActivePresetId('');
                  }}
                  className="w-full bg-white border border-gray-200 hover:border-[#D4AF37] rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0D5C75]"
                >
                  <option value="">{isEn ? '-- Select Sage --' : '-- 请选择贤哲 --'}</option>
                  {allPhilosophersFlat
                    .filter(p => p.id !== customP2Id)
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {isEn ? p.nameEng : `${p.name} (${p.nameEng})`} - {isEn ? (schoolTranslations[p.school] || p.school) : p.school}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 mb-1 font-sans">
                  {isEn ? 'Select Philosopher 2:' : '选择哲学家二：'}
                </label>
                <select
                  value={customP2Id}
                  onChange={(e) => {
                    setCustomP2Id(e.target.value);
                    setActivePresetId('');
                  }}
                  className="w-full bg-white border border-gray-200 hover:border-[#D4AF37] rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0D5C75]"
                >
                  <option value="">{isEn ? '-- Select Sage --' : '-- 请选择贤哲 --'}</option>
                  {allPhilosophersFlat
                    .filter(p => p.id !== customP1Id)
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {isEn ? p.nameEng : `${p.name} (${p.nameEng})`} - {isEn ? (schoolTranslations[p.school] || p.school) : p.school}
                      </option>
                    ))}
                </select>
              </div>

              {(customP1Id || customP2Id) && (
                <button
                  onClick={() => {
                    setCustomP1Id('');
                    setCustomP2Id('');
                    setActivePresetId('ideal-real');
                  }}
                  className="mt-2 text-right text-[10px] text-amber-700 font-semibold hover:underline cursor-pointer"
                >
                  {isEn ? 'Reset to Classic presets' : '重置为经典公案模式'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Conversation / Comparative Display */}
        <div className="lg:col-span-8 bg-[#FAF8F5] p-5 rounded-lg border border-[#D4AF37]/30 min-h-[300px] flex flex-col justify-between">
          
          {/* Preset Dialogue Mode */}
          {activePresetId && !customP1Id && (
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="border-b border-[#D4AF37]/30 pb-3">
                <span className="text-[10px] tracking-wider uppercase font-bold text-amber-800 font-mono">
                  {isEn ? 'DEBATE QUESTION' : '公案辩题'}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0D5C75] mt-0.5">
                  “{translatedPreset.question}”
                </h4>
              </div>

              {/* Chat-like Dialogue Scroll */}
              <div className="flex flex-col gap-4 overflow-y-auto pr-1 max-h-[300px]">
                {translatedPreset.dialogue.map((bubble, index) => {
                  const isP1 = bubble.speaker === translatedPreset.p1Name;
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col ${isP1 ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] font-bold uppercase font-mono px-1.5 py-0.5 rounded
                          ${isP1 ? 'bg-[#0D5C75] text-white' : 'bg-[#D4AF37] text-white'}`}>
                          {bubble.speaker}
                        </span>
                      </div>
                      <div className={`max-w-[85%] text-xs rounded-lg p-3 shadow-xs border leading-relaxed
                        ${isP1 
                          ? 'bg-[#EBF5F8] text-[#0A4A5E] border-[#0D5C75]/25 rounded-tl-none' 
                          : 'bg-[#FDFDFB] text-gray-800 border-[#D4AF37]/30 rounded-tr-none'}`}>
                        {bubble.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom links */}
              <div className="text-[10px] text-gray-400 mt-2 font-mono flex gap-4 border-t border-gray-100 pt-2 justify-between">
                <span>{isEn ? 'Host: Classical Academy Secretariat' : '主持：古希腊阿卡德米学院秘书处'}</span>
                <div className="flex gap-2">
                  <span className="cursor-pointer text-[#0D5C75] hover:underline whitespace-nowrap" onClick={() => {
                    const found = allPhilosophersFlat.find(p => p.name === activePreset.p1Name || p.nameEng === translatedPreset.p1Name);
                    if (found) onSelectPhilosopher(found);
                  }}>
                    {isEn ? `Profile: ${translatedPreset.p1Name}` : `查阅 ${activePreset.p1Name}`}
                  </span>
                  <span>|</span>
                  <span className="cursor-pointer text-[#0D5C75] hover:underline whitespace-nowrap" onClick={() => {
                    const found = allPhilosophersFlat.find(p => p.name === activePreset.p2Name || p.nameEng === translatedPreset.p2Name);
                    if (found) onSelectPhilosopher(found);
                  }}>
                    {isEn ? `Profile: ${translatedPreset.p2Name}` : `查阅 ${activePreset.p2Name}`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Custom Side-by-Side Comparison Mode */}
          {(customP1Id || customP2Id) && (
            <div className="flex flex-col h-full justify-between">
              
              {/* Tab Navigation selectors */}
              <div className="flex border-b border-[#D4AF37]/30 pb-2 mb-4 justify-between items-center flex-wrap gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCompareTab('static')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                      compareTab === 'static'
                        ? 'bg-[#0D5C75] text-[#FDFDFB] border-[#0D5C75] shadow-2xs'
                        : 'bg-white text-[#0D5C75] border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Landmark className="w-3.5 h-3.5" />
                    {isEn ? 'Static Pedigree' : '🏛️ 思想谱系对照'}
                  </button>
                  <button
                    onClick={() => setCompareTab('ai')}
                    className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 border ${
                      compareTab === 'ai'
                        ? 'bg-[#C2593F] text-[#FDFDFB] border-[#C2593F] shadow-2xs font-extrabold'
                        : 'bg-white text-slate-750 border-gray-200 hover:bg-gray-50 font-semibold'
                    }`}
                  >
                    <Swords className="w-3.5 h-3.5" />
                    {isEn ? 'AI Debate Arena ⚔️' : '⚔️ AI 思想格斗场'}
                    <span className="bg-[#D4AF37] text-white text-[8px] px-1 py-0.2 rounded-sm font-sans shrink-0">{isEn ? 'PREMIUM' : '付费'}</span>
                  </button>
                </div>

                {compareTab === 'ai' && (
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/50 px-2.5 py-1 rounded-full text-[10px] font-semibold text-amber-900 font-sans shadow-3xs">
                    <span>
                      {unlimitedActivated
                        ? (isEn ? '👑 VIP: Unlimited' : '👑 尊享会员：无限格斗')
                        : (isEn ? `Debates: ${debateRemaining}` : `剩余辩论度: ${debateRemaining} 次`)}
                    </span>
                    {!unlimitedActivated && debateRemaining === 0 && (
                      <span className="bg-red-650 text-white text-[8px] px-1 rounded-xs animate-pulse font-sans font-bold">{isEn ? 'LOCKED' : '已锁'}</span>
                    )}
                    <button
                      onClick={onTriggerPayment}
                      className="ml-1 px-2 py-0.5 bg-[#0D5C75] text-white text-[9px] rounded-md font-sans font-bold hover:bg-[#0A4A5E] transition-all cursor-pointer whitespace-nowrap"
                    >
                      {isEn ? 'Top Up' : '激活'}
                    </button>
                  </div>
                )}
              </div>

              {/* TAB 1: Classic Static Comparison View */}
              {compareTab === 'static' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    {/* Column One */}
                    <div className="bg-white p-3.5 rounded border border-gray-200 flex flex-col justify-between">
                      {p1Trans ? (
                        <div>
                          <div className="flex justify-between items-start border-b border-gray-100 pb-1.5 mb-2">
                            <div>
                              <h5 className="font-extrabold text-sm text-[#0D5C75]">{p1Trans.name}</h5>
                              <span className="text-[10px] font-mono text-gray-400">{p1Trans.subName}</span>
                            </div>
                            <span className="text-[10px] bg-sky-50 text-sky-800 px-1.5 py-0.5 rounded font-mono">
                              {p1Trans.eraDisp}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-2 text-xs">
                            <div>
                              <span className="text-amber-800 text-[10px] block font-sans font-bold">
                                {isEn ? 'School & Core Goal' : '流派/学术宗旨'}
                              </span>
                              <span className="font-sans font-medium text-gray-700">
                                {p1Trans.school}
                              </span>
                            </div>

                            <div>
                              <span className="text-amber-800 text-[10px] block font-sans font-bold">
                                {isEn ? 'Core Doctrines' : '核心学说概念'}
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1 font-serif">
                                {p1Trans.concepts.map((c, i) => (
                                  <span key={i} className="bg-[#FAF8F5] border border-gray-200 text-gray-650 rounded px-1.5 py-0.5 text-[10px]">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-dashed border-gray-100 italic">
                              {p1Trans.details}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full border border-dashed border-gray-200 rounded p-4 text-center text-xs text-gray-400 font-sans">
                          {isEn ? 'Please choose Sage 1 on the left dropdown' : '请在左侧选择贤哲一，查看其形而上宗旨。'}
                        </div>
                      )}

                      {p1 && (
                        <button
                          onClick={() => onSelectPhilosopher(p1)}
                          className="mt-3 text-left text-[10px] text-[#0D5C75] font-bold hover:underline font-mono cursor-pointer animate-fade-in"
                        >
                          {isEn ? 'Focus on Main Pedigree →' : '前往主图谱精确定位 →'}
                        </button>
                      )}
                    </div>

                    {/* Column Two */}
                    <div className="bg-white p-3.5 rounded border border-gray-200 flex flex-col justify-between">
                      {p2Trans ? (
                        <div>
                          <div className="flex justify-between items-start border-b border-gray-100 pb-1.5 mb-2">
                            <div>
                              <h5 className="font-extrabold text-sm text-[#D4AF37]">{p2Trans.name}</h5>
                              <span className="text-[10px] font-mono text-gray-400">{p2Trans.subName}</span>
                            </div>
                            <span className="text-[10px] bg-amber-50 text-amber-805 px-1.5 py-0.5 rounded font-mono">
                              {p2Trans.eraDisp}
                            </span>
                          </div>
                          
                          <div className="flex flex-col gap-2 text-xs">
                            <div>
                              <span className="text-amber-800 text-[10px] block font-sans font-bold">
                                {isEn ? 'School & Core Goal' : '流派/学术宗旨'}
                              </span>
                              <span className="font-sans font-medium text-gray-700">
                                {p2Trans.school}
                              </span>
                            </div>

                            <div>
                              <span className="text-amber-800 text-[10px] block font-sans font-bold">
                                {isEn ? 'Core Doctrines' : '核心学说概念'}
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1 font-serif">
                                {p2Trans.concepts.map((c, i) => (
                                  <span key={i} className="bg-[#FAF8F5] border border-gray-200 text-gray-650 rounded px-1.5 py-0.5 text-[10px]">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-dashed border-gray-100 italic">
                              {p2Trans.details}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full border border-dashed border-gray-200 rounded p-4 text-center text-xs text-gray-400 font-sans">
                          {isEn ? 'Please choose Sage 2 on the left dropdown' : '请在左侧选择贤哲二，查看其形而上宗旨。'}
                        </div>
                      )}

                      {p2 && (
                        <button
                          onClick={() => onSelectPhilosopher(p2)}
                          className="mt-3 text-left text-[10px] text-[#0D5C75] font-bold hover:underline font-mono cursor-pointer"
                        >
                          {isEn ? 'Focus on Main Pedigree →' : '前往主图谱精确定位 →'}
                        </button>
                      )}
                    </div>
                  </div>

                  {p1Trans && p2Trans && (
                    <div className="mt-4 bg-[#0D5C75]/10 border border-[#0D5C75]/35 rounded p-3 text-[11px] text-[#0A4A5E] leading-relaxed font-serif animate-fade-in">
                      <span className="font-bold">{isEn ? 'Dialectical Inquiry:' : '辩证启迪：'}</span>
                      {isEn ? (
                        <span>
                          From <span className="font-bold">{p1Trans.name}</span> to <span className="font-bold">{p2Trans.name}</span>, the academic collision between them constitutes the tension poles of mainstream Western philosophy. 
                          The flow of thought from the [<span className="font-bold text-[#0D5C75]">{p1Trans.concepts?.[0] || 'Core Idea'}</span>] of <span className="font-semibold">{p1Trans.school}</span> to [<span className="font-bold text-amber-850">{p2Trans.concepts?.[0] || 'Core Idea'}</span>] of <span className="font-semibold">{p2Trans.school}</span> beautifully demonstrates the spiral evolution of human reason across historical epochs.
                        </span>
                      ) : (
                        <span>
                          从 <span className="font-bold">{p1Trans.name}</span> 到 <span className="font-bold">{p2Trans.name}</span>，两者的学术碰撞构成了西方主流哲学的张力极。
                          思维从
                          <span className="font-bold text-[#0D5C75]"> {p1Trans.school} </span>的【{p1Trans.concepts?.[0]}】转向
                          <span className="font-bold text-amber-800"> {p2Trans.school} </span>的【{p2Trans.concepts?.[0]}】，完美的展现了人类理性在各断代时期的螺旋演进。
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* TAB 2: Dynamic Custom AI Debate Arena */}
              {compareTab === 'ai' && (
                <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/30 shadow-2xs flex flex-col justify-between h-full gap-4">
                  {(!p1 || !p2) ? (
                    <div className="text-center py-10 text-xs text-gray-400 font-sans flex flex-col items-center gap-1.5">
                      <HelpCircle className="w-8 h-8 text-gray-300" />
                      <span>{isEn ? "Both Sages must be selected on the left to activate AI clash." : "您必须先在左侧选择【贤哲一】与【贤哲二】，随后智能格斗场才可开启对话。"}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-between gap-4">
                      {/* Interactive Debate Console Inputs */}
                      {debateRounds.length === 0 && !debateLoading && (
                        <>
                          {/* Quick Preset Topics */}
                          <div className="space-y-1.5 text-[11px]">
                            <span className="text-gray-400 font-sans block">{isEn ? '💡 Suggested Grand Clashes:' : '💡 推荐顶级交锋立场备选：'}</span>
                            {(isEn ? [
                              "Is it possible for Artificial Intelligence (AI) to possess a real soul, suffering, and redemption in the future?",
                              "Is a highly automated society liberating humanity or bringing about new forms of labor enslavement?",
                              "Are desire and money ladders to freedom, or are they the main culprits of all nihilism and suffering?",
                              "Living in a faithless, hyper-materialistic internet fast-food era, how can humans reconstruct authentic value and faith?"
                            ] : [
                              "人工智能（AI）在未来是否有可能产生真正的灵魂、痛苦和救赎感？",
                              "科技高度发达的资本主义自动化社会，究竟是在自我解放还是在带来新的劳动奴化？",
                              "欲望和金钱是通向自由的阶梯，还是一切虚无主义与虚妄痛苦的罪魁之首？",
                              "生活在无信仰、过度物质化的网络快餐时代，人类如何重塑信仰与本真价值？"
                            ]).map((topic, i) => (
                              <button
                                key={i}
                                onClick={() => setDebateTopic(topic)}
                                className="w-full text-left bg-[#FAF8F5] hover:bg-[#FAF0E6] border border-gray-200 text-slate-705 p-2 rounded-lg transition-colors cursor-pointer text-[10.5px] italic font-serif"
                              >
                                “ {topic} ”
                              </button>
                            ))}
                          </div>

                          <div className="mt-2 text-xs">
                            <label className="block text-slate-650 font-bold mb-1.5 font-sans">
                              {isEn ? 'Input custom debate question:' : '✍️ 请输入您想让双方交尾对抗的辩题'}
                            </label>
                            
                            {debateRemaining === 0 && !unlimitedActivated ? (
                              <div className="bg-red-50 text-slate-800 border-2 border-dashed border-[#C2593F]/40 p-4 rounded-xl text-center">
                                <p className="font-bold text-xs text-[#C2593F] mb-1.5 flex items-center justify-center gap-1">
                                  <span>{isEn ? '💸 Global Trial Limit Reached' : '💸 免费试用格斗额度已臻上限'}</span>
                                </p>
                                <p className="text-[10px] text-gray-500 leading-relaxed mb-3">
                                  {isEn 
                                    ? 'Clashes consume double computational power. Secure a ¥9.9 custom pass to unlock 5 custom battles!'
                                    : '古圣对决耗费双倍深度算力。赞助充值 ¥9.9 的专属格斗券，即可解锁 5 次完全自定义神仙论战！'}
                                </p>
                                <button
                                  onClick={onTriggerPayment}
                                  className="mx-auto bg-[#C2593F] hover:bg-rose-900 text-white font-sans font-bold text-xs py-2 px-5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                                >
                                  <Key className="w-4 h-4" />
                                  <span>{isEn ? 'Redeem Code / Top Up' : '激活格斗卡密 / 充值赞助'}</span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={debateTopic}
                                  onChange={(e) => setDebateTopic(e.target.value)}
                                  placeholder={isEn ? "e.g., Is technology a false liberation?" : "e.g., 科技是虚假解放吗？"}
                                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#C2593F] focus:border-[#C2593F] focus:outline-none"
                                />
                                <button
                                  onClick={async () => {
                                    if (!debateTopic.trim()) return;
                                    const deductOk = onDeductDebate();
                                    if (!deductOk) return;

                                    setDebateLoading(true);
                                    setDebateError('');
                                    try {
                                      const res = await fetch('/api/debate-arena', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                          p1: isEn ? { ...p1, ...p1Trans } : p1,
                                          p2: isEn ? { ...p2, ...p2Trans } : p2,
                                          topic: debateTopic.trim()
                                        })
                                      });
                                      if (!res.ok) throw new Error("Server response error");
                                      const data = await res.json();
                                      if (data.success && data.rounds) {
                                        setDebateRounds(data.rounds);
                                      } else {
                                        throw new Error(data.message || "Failed to generate debate");
                                      }
                                    } catch (err: any) {
                                      console.error(err);
                                      setDebateError(isEn ? 'The clash collapsed due to temporal friction. Retry.' : '时空通道发生湍流阻抗，未能在阿卡德米神殿开庭，请重新拟题尝试。');
                                    } finally {
                                      setDebateLoading(false);
                                    }
                                  }}
                                  disabled={!debateTopic.trim()}
                                  className="bg-[#C2593F] text-white hover:bg-rose-950 px-4 py-2.5 rounded-lg font-sans font-bold text-xs transition-all shadow-sm flex items-center gap-1 disabled:bg-gray-300 cursor-pointer"
                                >
                                  <Swords className="w-4 h-4" />
                                  <span>{isEn ? 'Start Duel' : '开启格斗'}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {/* Loading block with cool columns animation */}
                      {debateLoading && (
                        <div className="text-center py-10 flex flex-col items-center justify-center gap-3 font-serif">
                          <RefreshCw className="w-8 h-8 text-[#C2593F] animate-spin" />
                          <div className="font-extrabold text-slate-800 text-sm animate-pulse tracking-wide">
                            {isEn ? 'Assembling historical nodes... Sages on stage' : '🏛️ 正义之审判庭开启，古圣先贤登上雅典剧场审议台'}
                          </div>
                          <p className="text-[10.5px] text-gray-400 font-sans max-w-sm leading-relaxed">
                            {isEn 
                              ? `${p1.nameEng} and ${p2.nameEng} are entering. Structuring 5 heavy rounds of dialectical thesis clashing...`
                              : `【${p1.name}】与【${p2.name}】正在就辩题「${debateTopic}」整理各流派著作卷轴...`}
                          </p>
                        </div>
                      )}

                      {/* Error State */}
                      {debateError && (
                        <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-150 flex flex-col gap-2">
                          <div>❌ {debateError}</div>
                          <button
                            onClick={() => {
                              setDebateError('');
                              setDebateRounds([]);
                            }}
                            className="text-right text-[10px] underline font-sans text-rose-800 font-semibold cursor-pointer"
                          >
                            {isEn ? 'Return to Topic Input' : '返回重新拟题'}
                          </button>
                        </div>
                      )}

                      {/* Debate Rounds Timeline Display */}
                      {debateRounds.length > 0 && (
                        <div className="flex flex-col gap-4 animate-fade-in">
                          <div className="border-b border-gray-100 pb-2.5 flex justify-between items-center">
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-[#C2593F] font-mono font-bold block">
                                {isEn ? 'DEBATE SCROLL VERDICT' : '⚔️ 思想格斗赛辩词卷轴'}
                              </span>
                              <h5 className="text-xs font-black text-slate-800 mt-0.5 font-serif">
                                “ {debateTopic} ”
                              </h5>
                            </div>
                            <button
                              onClick={() => {
                                setDebateRounds([]);
                                setDebateTopic('');
                              }}
                              className="text-[10px] text-[#0D5C75] font-bold hover:underline font-sans cursor-pointer flex items-center gap-1 bg-sky-50 px-2 py-1 rounded border border-sky-100"
                            >
                              <RefreshCw className="w-3" />
                              <span>{isEn ? 'Another Match' : '重选辩题格斗'}</span>
                            </button>
                          </div>

                          {/* Dual Conversation Timeline of exactly 5 Rounds */}
                          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                            {debateRounds.map((round, index) => {
                              const isP1 = round.speakerId === p1.id;
                              const isModerator = round.speakerId === 'moderator' || !isP1 && round.speakerId !== p2.id;
                              
                              return (
                                <div 
                                  key={index}
                                  className={`flex flex-col ${isModerator ? 'items-center' : isP1 ? 'items-start' : 'items-end'}`}
                                >
                                  {/* Speaker label */}
                                  <div className="flex items-center gap-1.5 mb-1 text-[10px]">
                                    <span className={`px-2 py-0.5 rounded-sm font-bold shadow-3xs uppercase font-mono text-white ${
                                      isModerator ? 'bg-amber-800' : isP1 ? 'bg-[#0D5C75]' : 'bg-[#C2593F]'
                                    }`}>
                                      {round.speakerName}
                                    </span>
                                    {!isModerator && (
                                      <span className="text-[9px] text-[#D4AF37] font-semibold">
                                        {isP1 ? `[${p1Trans?.school || p1.school}]` : `[${p2Trans?.school || p2.school}]`}
                                      </span>
                                    )}
                                  </div>

                                  {/* Speech Bubble */}
                                  <div className={`max-w-[85%] text-xs rounded-xl p-3.5 leading-relaxed text-justify border shadow-3xs font-serif ${
                                    isModerator 
                                      ? 'bg-amber-50/50 border-amber-200/50 text-[#0A4A5E] text-[11px] border-dashed text-center font-bold italic'
                                      : isP1 
                                        ? 'bg-[#EBF5F8] text-[#0A4A5E] border-[#0D5C75]/25 rounded-tl-none'
                                        : 'bg-[#FAF8F5] text-slate-800 border-rose-100 rounded-tr-none'
                                  }`}>
                                    {round.utterance}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="text-[9.5px] border-t border-gray-100 pt-2 text-gray-400 font-mono text-center">
                            {isEn 
                              ? 'Court of Classical Sages. Built via high-tension structural dialectics' 
                              : '雅典议会合议庭审结。真理不经辩驳，不成纯金。'}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Reset side selectors helper */}
              {(!compareTab || compareTab === 'static') && (customP1Id || customP2Id) && (
                <button
                  onClick={() => {
                    setCustomP1Id('');
                    setCustomP2Id('');
                    setActivePresetId('ideal-real');
                  }}
                  className="mt-2 text-right text-[10px] text-[#C2593F] font-bold hover:underline cursor-pointer"
                >
                  {isEn ? 'Reset to Classic presets' : '↩️ 返参精选公案经典模式'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
