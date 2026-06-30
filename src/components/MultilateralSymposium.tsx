import React, { useState, useMemo, useEffect } from 'react';
import { Epoch, Philosopher } from '../types';
import { philosophyData } from '../data/philosophyData';
import { schoolTranslations, conceptTranslations, philosopherFallbackTranslations } from '../data/translationsEng';
import { Swords, Landmark, Scroll, MessageSquare, ShieldCheck, Key, RefreshCw, HelpCircle, Search, Check, Trash2, ArrowLeft, Users } from 'lucide-react';

interface MultilateralSymposiumProps {
  language: 'zh' | 'en';
  debateRemaining: number;
  unlimitedActivated: boolean;
  onDeductDebate: () => boolean;
  onTriggerPayment: () => void;
  onSelectPhilosopher?: (p: Philosopher) => void;
  setView?: (v: 'chronology' | 'debate') => void;
}

export const MultilateralSymposium: React.FC<MultilateralSymposiumProps> = ({
  language,
  debateRemaining,
  unlimitedActivated,
  onDeductDebate,
  onTriggerPayment,
  onSelectPhilosopher,
  setView,
}) => {
  const isEn = language === 'en';

  // Flattended philosophers list
  const allPhilosophersFlat = useMemo(() => {
    const list: Philosopher[] = [];
    philosophyData.forEach(ep => {
      ep.philosophers.forEach(p => {
        list.push(p);
      });
    });
    return list;
  }, []);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEpochId, setSelectedEpochId] = useState<number | 'all'>('all');
  const [selectedPhilosopherIds, setSelectedPhilosopherIds] = useState<string[]>([]);
  const [debateTopic, setDebateTopic] = useState('');
  
  // Debate execution state
  const [debateLoading, setDebateLoading] = useState(false);
  const [debateError, setDebateError] = useState('');
  const [debateRounds, setDebateRounds] = useState<any[]>([]);

  // Search and Epoch Filters
  const filteredPhilosophers = useMemo(() => {
    return allPhilosophersFlat.filter(p => {
      const pName = isEn ? (p.nameEng || p.name) : p.name;
      const school = isEn ? (schoolTranslations[p.school] || p.school) : p.school;
      const matchSearch = pName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          school.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedEpochId === 'all') return matchSearch;
      
      const inEpoch = philosophyData.find(e => e.id === selectedEpochId)?.philosophers.some(ph => ph.id === p.id);
      return inEpoch && matchSearch;
    });
  }, [allPhilosophersFlat, searchQuery, selectedEpochId, isEn]);

  // Philosopher select toggle
  const handleTogglePhilosopher = (id: string) => {
    if (selectedPhilosopherIds.includes(id)) {
      setSelectedPhilosopherIds(selectedPhilosopherIds.filter(pid => pid !== id));
    } else {
      if (selectedPhilosopherIds.length >= 5) {
        alert(isEn ? 'You can select up to 5 philosophers!' : '一次辩论最多只能选择 5 位贤哲参加！');
        return;
      }
      setSelectedPhilosopherIds([...selectedPhilosopherIds, id]);
    }
  };

  const handleClearSelection = () => {
    setSelectedPhilosopherIds([]);
  };

  const selectedPhilosophers = useMemo(() => {
    return selectedPhilosopherIds
      .map(id => allPhilosophersFlat.find(p => p.id === id))
      .filter((p): p is Philosopher => !!p);
  }, [selectedPhilosopherIds, allPhilosophersFlat]);

  // School visual color helper
  const getSchoolColors = (schoolName: string) => {
    const s = schoolName.toLowerCase();
    if (s.includes('米利都') || s.includes('爱奥尼亚') || s.includes('自然') || s.includes('cosmology') || s.includes('nature')) {
      return { border: 'border-l-teal-500', bg: 'bg-[#F2FAF9]', text: 'text-teal-900', badge: 'bg-teal-600' };
    }
    if (s.includes('雅典') || s.includes('苏格拉底') || s.includes('智者') || s.includes('学院') || s.includes('athens') || s.includes('sophist')) {
      return { border: 'border-l-sky-500', bg: 'bg-[#F0F7FA]', text: 'text-sky-900', badge: 'bg-sky-600' };
    }
    if (s.includes('斯多葛') || s.includes('伊壁鸠鲁') || s.includes('罗马') || s.includes('伦理') || s.includes('hellenistic') || s.includes('stoic')) {
      return { border: 'border-l-amber-500', bg: 'bg-[#FDF9F4]', text: 'text-amber-900', badge: 'bg-amber-600' };
    }
    if (s.includes('经院') || s.includes('教父') || s.includes('神学') || s.includes('scholastic') || s.includes('theology')) {
      return { border: 'border-l-emerald-500', bg: 'bg-[#F5FAF5]', text: 'text-emerald-900', badge: 'bg-emerald-600' };
    }
    if (s.includes('唯理论') || s.includes('rationalism')) {
      return { border: 'border-l-indigo-500', bg: 'bg-[#F4F6FC]', text: 'text-indigo-900', badge: 'bg-indigo-600' };
    }
    if (s.includes('经验论') || s.includes('empiricism')) {
      return { border: 'border-l-yellow-600', bg: 'bg-[#FFFDF3]', text: 'text-yellow-900', badge: 'bg-yellow-600' };
    }
    if (s.includes('启蒙') || s.includes('人道') || s.includes('enlightenment') || s.includes('renaissance')) {
      return { border: 'border-l-rose-500', bg: 'bg-[#FFF9FA]', text: 'text-rose-900', badge: 'bg-rose-600' };
    }
    if (s.includes('德意志') || s.includes('唯心') || s.includes('idealism')) {
      return { border: 'border-l-purple-500', bg: 'bg-[#FCF8FF]', text: 'text-purple-900', badge: 'bg-purple-600' };
    }
    // Willism, Marx, Existentialism
    return { border: 'border-l-red-600', bg: 'bg-[#FFFDFD]', text: 'text-red-950', badge: 'bg-red-650' };
  };

  // Presets
  const suggestedTopics = [
    "人工智能（AI）在未来是否有可能产生真正的灵魂、痛苦和救赎感？",
    "科技高度发达的自动化社会，究竟是在解放人类还是在带来新的劳动奴化？",
    "欲望、物质和金钱是通向自由的阶梯，还是一切虚无主义与虚妄痛苦的罪魁？",
    "生活在没有信仰信仰、被信息快餐充斥的时代，我们该如何重塑自我的本真价值？"
  ];

  const handleStartMultilateralDebate = async () => {
    if (selectedPhilosophers.length < 2) return;
    if (!debateTopic.trim()) return;

    // Premium credit check
    const deductOk = onDeductDebate();
    if (!deductOk) return;

    setDebateLoading(true);
    setDebateError('');
    setDebateRounds([]);

    try {
      const response = await fetch('/api/debate-multilateral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          philosophers: selectedPhilosophers,
          topic: debateTopic.trim()
        })
      });

      if (!response.ok) throw new Error('Debate request failed');
      const data = await response.json();

      if (data.success && data.rounds) {
        setDebateRounds(data.rounds);
      } else {
        throw new Error(data.message || 'Failed to generate multilateral debate');
      }
    } catch (err: any) {
      console.error(err);
      setDebateError(isEn 
        ? 'The celestial corridor collapsed due to high cosmic density. Please try again.' 
        : '众神之廊发生了时空扰动，未能在议事大厅召集成功。请重新拟题尝试。'
      );
    } finally {
      setDebateLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFDFB] rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden p-5 sm:p-8 relative font-serif animate-fade-in">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#D4AF37]/60 mt-2 ml-2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#D4AF37]/60 mt-2 mr-2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#D4AF37]/60 mb-2 ml-2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#D4AF37]/60 mb-2 mr-2 pointer-events-none" />

      {/* Top action button */}
      {setView && (
        <button
          onClick={() => setView('chronology')}
          className="absolute top-6 left-6 z-10 flex items-center gap-1 bg-white hover:bg-slate-50 border border-gray-200 text-[#0D5C75] px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all shadow-3xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEn ? 'Back to River' : '返回谱系长河'}</span>
        </button>
      )}

      {/* Title */}
      <div className="text-center mb-8 z-10 relative pt-4">
        <span className="text-xs tracking-widest text-[#D4AF37] uppercase font-mono font-bold block mb-1">
          {isEn ? '⚔️ MULTILATERAL COLLISION ARENA ⚔#' : '⚔️ 雅典学园 · 众神群星大辩论场 ⚔️'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0D5C75] tracking-widest uppercase">
          {isEn ? 'The Athena Plurilateral Symposium' : '雅典议会 · 众神合议庭'}
        </h2>
        <p className="text-xs text-gray-500 font-sans max-w-2xl mx-auto mt-2 leading-relaxed">
          {isEn 
            ? 'Assemble up to 5 historical titans inside the Supreme Court of Reason. Pitch them against modern technological, ethical, or metaphysical dillemas, and watch their dialectic sparks ignite in real-time.'
            : '自由挑选最多 5 位旷古智者，将其并置于理性的审判大厅内。就您自定义的现代科技、存在、物欲、虚无或救赎命题，开启一场多维立体的学术大辩论。'}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 z-10 relative">
        
        {/* Left column: Philosophers Selection (Col-span 7) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#D4AF37]/35 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/25 pb-3 mb-4">
              <h3 className="text-sm font-extrabold text-[#0B2545] tracking-wider uppercase font-sans flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#C2593F]" />
                {isEn ? '1. Select Sages' : '第一步：请挑选辩论席贤哲'} 
                <span className="text-xs font-bold text-[#C2593F] bg-[#C2593F]/10 px-2 py-0.5 rounded-full font-mono ml-2">
                  {selectedPhilosopherIds.length} / 5
                </span>
              </h3>
              
              {selectedPhilosopherIds.length > 0 && (
                <button
                  onClick={handleClearSelection}
                  className="text-[10px] text-red-650 hover:text-red-850 font-sans font-bold flex items-center gap-1 border border-red-200 bg-white hover:bg-red-50 px-2.5 py-1 rounded cursor-pointer transition-all"
                >
                  <Trash2 className="w-3" />
                  <span>{isEn ? 'Clear All' : '一键清空'}</span>
                </button>
              )}
            </div>

            {/* Selected Panel */}
            {selectedPhilosophers.length > 0 ? (
              <div className="mb-4 p-3 bg-white border border-dashed border-[#D4AF37]/40 rounded-lg">
                <span className="text-[10px] text-gray-400 block font-sans font-bold mb-2 uppercase">
                  {isEn ? 'Selected Panelists:' : '已召唤登上辩论席的贤哲：'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPhilosophers.map((p, idx) => {
                    const colors = getSchoolColors(p.school);
                    return (
                      <div 
                        key={p.id}
                        onClick={() => handleTogglePhilosopher(p.id)}
                        className={`flex items-center gap-1.5 ${colors.bg} ${colors.border} border-l-[3.5px] border border-gray-200 hover:border-red-500 py-1 px-2.5 rounded-lg text-xs cursor-pointer shadow-3xs transition-all relative group`}
                      >
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-[#0B2545]">{isEn ? p.nameEng : p.name}</span>
                          <span className="text-[8.5px] text-gray-400 font-sans line-clamp-1">{isEn ? (schoolTranslations[p.school] || p.school) : p.school}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-4 py-4 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg font-sans">
                {isEn ? 'Please click cards below to summon at least 2 sages...' : '尚未召唤任何人，请在下方名录中勾选至少 2 位（最多 5 位）先贤入席...'}
              </div>
            )}

            {/* Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
              {/* Search */}
              <div className="sm:col-span-6 relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={isEn ? "Search name, school..." : "搜寻名字、学派..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-[#0D5C75] focus:border-[#0D5C75] focus:outline-none font-sans"
                />
              </div>

              {/* Epoch Filter */}
              <div className="sm:col-span-6">
                <select
                  value={selectedEpochId}
                  onChange={(e) => setSelectedEpochId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#0D5C75] focus:border-[#0D5C75] focus:outline-none font-sans"
                >
                  <option value="all">{isEn ? 'All Historical Epochs' : '全部历史黄金断代'}</option>
                  {philosophyData.map(e => (
                    <option key={e.id} value={e.id}>
                      0{e.id} {isEn ? e.subtitle : e.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sages Selection Catalog Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 overflow-y-auto max-h-[350px] pr-1 scrollbar-thin">
              {filteredPhilosophers.map(p => {
                const isSelected = selectedPhilosopherIds.includes(p.id);
                const colors = getSchoolColors(p.school);
                
                return (
                  <button
                    key={p.id}
                    onClick={() => handleTogglePhilosopher(p.id)}
                    className={`w-full text-left rounded-xl p-2.5 border transition-all duration-200 relative cursor-pointer group flex flex-col justify-between min-h-[90px]
                      ${isSelected 
                        ? `${colors.bg} border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-sm` 
                        : 'bg-white border-slate-200 hover:border-[#0D5C75] hover:shadow-3xs'
                      }`}
                  >
                    {/* Top line */}
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold text-amber-800">{p.eraDisp}</span>
                        <h4 className="font-extrabold text-xs text-[#0B2545] group-hover:text-[#0D5C75] leading-snug mt-0.5">
                          {isEn ? p.nameEng : p.name}
                        </h4>
                      </div>
                      
                      {isSelected ? (
                        <div className="bg-[#D4AF37] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">
                          ✓
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-200 group-hover:border-[#0D5C75] bg-slate-50 flex items-center justify-center" />
                      )}
                    </div>

                    {/* Bottom Line */}
                    <div className="mt-2 pt-1 border-t border-dashed border-gray-100 flex justify-between items-center w-full">
                      <span className="text-[8.5px] font-sans text-gray-400 truncate max-w-[80%] font-medium">
                        {isEn ? (schoolTranslations[p.school] || p.school) : p.school}
                      </span>
                      {p.isMajor && (
                        <span className="text-[8.5px] bg-[#D4AF37]/20 text-[#0B2545] px-1 rounded-sm font-sans font-bold">巨擘</span>
                      )}
                    </div>
                  </button>
                );
              })}

              {filteredPhilosophers.length === 0 && (
                <div className="col-span-full py-12 text-center text-xs text-gray-400 font-sans">
                  {isEn ? 'No philosopher matched your query' : '没有搜寻到任何契合的古希腊与现代贤哲，请更换词条'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Debate Topics & Screen Control (Col-span 5) */}
        <div className="xl:col-span-5 flex flex-col gap-4">
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#D4AF37]/35 shadow-xs flex-1 flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-sm font-extrabold text-[#0B2545] tracking-wider uppercase font-sans border-b border-[#D4AF37]/25 pb-3 mb-4 flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-[#0D5C75]" />
                {isEn ? '2. Propose Topic' : '第二步：拟定交锋辩论命题'}
              </h3>

              {/* Suggestions list */}
              <div className="space-y-2 mb-4">
                <span className="text-[10.5px] text-gray-400 font-sans font-bold block uppercase tracking-wider">
                  {isEn ? '💡 Suggested Controversies:' : '💡 推荐震撼级思想交锋命题备选：'}
                </span>
                <div className="flex flex-col gap-1.5">
                  {suggestedTopics.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => setDebateTopic(topic)}
                      className="w-full text-left bg-white hover:bg-[#FAF0E6] border border-gray-200 hover:border-[#D4AF37] text-slate-700 p-2.5 rounded-lg transition-all cursor-pointer text-[10.5px] italic font-serif leading-relaxed"
                    >
                      “ {topic} ”
                    </button>
                  ))}
                </div>
              </div>

              {/* Input section */}
              <div className="text-xs">
                <label className="block text-slate-700 font-bold mb-2 font-sans flex items-center gap-1">
                  <span>✍️</span>
                  <span>{isEn ? 'Input custom question:' : '自定义或修改辩论题目：'}</span>
                </label>
                
                <textarea
                  value={debateTopic}
                  onChange={(e) => setDebateTopic(e.target.value)}
                  placeholder={isEn ? "e.g., Is absolute truth possible in a human-centric worldview?" : "例如：欲望与金钱究竟是通向自由的阶梯，还是无聊与虚无的深渊？"}
                  rows={3}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#C2593F] focus:border-[#C2593F] focus:outline-none font-serif leading-relaxed shadow-3xs"
                />
              </div>
            </div>

            {/* Launch Console */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {/* Paid Token Display */}
              <div className="flex justify-between items-center mb-3 bg-white p-2.5 rounded-xl border border-gray-150">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-sans">
                  <span>🎟️</span>
                  <span>
                    {unlimitedActivated
                      ? (isEn ? '👑 VIP: Unlimited debates' : '👑 尊享会员：无限群星格斗')
                      : (isEn ? `Remaining debates: ${debateRemaining}` : `剩余辩论额度: ${debateRemaining} 次`)}
                  </span>
                </div>
                {!unlimitedActivated && (
                  <button
                    onClick={onTriggerPayment}
                    className="px-2.5 py-1 bg-[#0D5C75] hover:bg-[#0A4A5E] text-white text-[10px] rounded-lg font-sans font-bold transition-colors cursor-pointer"
                  >
                    {isEn ? 'Activate' : '赞助激活'}
                  </button>
                )}
              </div>

              <button
                onClick={handleStartMultilateralDebate}
                disabled={selectedPhilosophers.length < 2 || !debateTopic.trim() || debateLoading}
                className="w-full bg-[#C2593F] hover:bg-rose-950 text-white disabled:bg-gray-300 disabled:cursor-not-allowed py-3 rounded-xl font-sans font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Swords className="w-5 h-5" />
                <span>{isEn ? 'Begin Grand Assembly Clash' : '召集神殿群星 · 开启论辩'}</span>
              </button>
              
              {selectedPhilosophers.length < 2 && (
                <span className="text-[10px] text-red-500 font-sans block text-center mt-1.5">
                  ⚠️ {isEn ? 'Please select at least 2 sages to start a debate.' : '辩论会至少需要选择 2 位贤哲方能登台开展学术攻防。'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Debate Execution Progress or Transcript timeline */}
      {(debateLoading || debateError || debateRounds.length > 0) && (
        <div className="mt-8 border-t-2 border-[#D4AF37]/20 pt-6">
          
          {/* Loading block */}
          {debateLoading && (
            <div className="text-center py-12 bg-[#FAF8F5] rounded-2xl border border-[#D4AF37]/35 flex flex-col items-center justify-center gap-4 shadow-3xs animate-pulse">
              <RefreshCw className="w-10 h-10 text-[#C2593F] animate-spin" />
              <div className="font-extrabold text-[#0B2545] text-base tracking-wide font-serif">
                {isEn ? '🏛️ Convening Sages inside the Academy Secretariat...' : '🏛️ 雅典学派最高大会正在开启，群星缓缓步入辩论大厅...'}
              </div>
              <p className="text-xs text-gray-400 font-sans max-w-lg leading-relaxed px-4">
                {isEn 
                  ? `Structuring a high-tension cross-philosophical dialectical collision. Selected panelists: ${selectedPhilosophers.map(p => p.nameEng).join(', ')}. Please wait a few seconds...`
                  : `正在就辩题「${debateTopic}」整理 ${selectedPhilosophers.map(p => `【${p.name}】`).join('、')}等大师的核心卷轴，拟定各派系激烈的辩难交锋剧本...`}
              </p>
            </div>
          )}

          {/* Error Block */}
          {debateError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-sans leading-relaxed flex flex-col gap-2">
              <div>❌ {debateError}</div>
              <button
                onClick={() => {
                  setDebateError('');
                  setDebateRounds([]);
                }}
                className="text-right underline text-[#0D5C75] font-bold cursor-pointer"
              >
                {isEn ? 'Back to Config' : '返回重试'}
              </button>
            </div>
          )}

          {/* Verdict and transcript */}
          {debateRounds.length > 0 && !debateLoading && (
            <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/35 shadow-sm animate-fade-in">
              <div className="border-b border-[#D4AF37]/35 pb-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C2593F] font-mono font-bold block mb-1">
                    {isEn ? '📜 PLURILATERAL DEBATE RECORD' : '📜 思想格斗赛大会审议卷轴'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#0B2545] font-serif leading-tight">
                    “ {debateTopic} ”
                  </h3>
                </div>
                
                <button
                  onClick={() => {
                    setDebateRounds([]);
                  }}
                  className="bg-white hover:bg-slate-50 border border-gray-200 text-xs text-[#0D5C75] font-sans font-bold px-3 py-1.5 rounded-lg shadow-3xs cursor-pointer flex items-center gap-1 shrink-0 self-start sm:self-center"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Configure New Debate' : '拟定新题再辩'}</span>
                </button>
              </div>

              {/* 3) Standings/Stances Alignments Panel */}
              {(() => {
                const distinctSpeakers: { id: string; name: string; stance: string; stanceLabel: string; school: string }[] = [];
                const seen = new Set<string>();
                debateRounds.forEach(r => {
                  if (r.speakerId !== 'moderator' && r.speakerId !== 'admin' && !seen.has(r.speakerId)) {
                    seen.add(r.speakerId);
                    const p = allPhilosophersFlat.find(ph => ph.id === r.speakerId);
                    distinctSpeakers.push({
                      id: r.speakerId,
                      name: isEn && p ? (p.nameEng || r.speakerName) : r.speakerName,
                      stance: r.stance || 'neutral',
                      stanceLabel: r.stanceLabel || '',
                      school: p ? (isEn ? (schoolTranslations[p.school] || p.school) : p.school) : ''
                    });
                  }
                });

                if (distinctSpeakers.length === 0) return null;

                return (
                  <div className="mb-6 p-4 sm:p-5 bg-white border border-[#D4AF37]/35 rounded-xl shadow-3xs">
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#0B2545] tracking-wider uppercase font-sans mb-3.5 flex items-center gap-1.5">
                      <span>⚔️</span>
                      <span>{isEn ? 'Sages Camp Alignments / Stances' : '先贤辩论阵营立场一览'}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Pro Camp */}
                      <div className="bg-[#F2FAF2] border border-green-200 rounded-xl p-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[10.5px] font-sans font-bold text-green-850 flex items-center gap-1 uppercase mb-2">
                            <span>🟢</span>
                            <span>{isEn ? 'Pro / Supporter' : '赞同立场派 (Pro)'}</span>
                          </span>
                          <div className="space-y-2">
                            {distinctSpeakers.filter(s => s.stance === 'pro').map(s => (
                              <div key={s.id} className="bg-white p-2.5 rounded-lg border border-green-100 shadow-3xs text-left">
                                <span className="text-xs font-black text-slate-950 block">{s.name}</span>
                                <span className="text-[9px] text-gray-400 font-sans block leading-tight mb-1">{s.school}</span>
                                <span className="text-[10.5px] bg-green-50 text-green-800 px-2 py-0.5 rounded font-medium block font-sans italic border border-green-100">
                                  “{s.stanceLabel}”
                                </span>
                              </div>
                            ))}
                            {distinctSpeakers.filter(s => s.stance === 'pro').length === 0 && (
                              <span className="text-[10px] text-gray-400 font-sans italic block py-2">{isEn ? 'No direct supporters' : '暂无坚决支持者'}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contra Camp */}
                      <div className="bg-[#FFF6F6] border border-red-200 rounded-xl p-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[10.5px] font-sans font-bold text-red-850 flex items-center gap-1 uppercase mb-2">
                            <span>🔴</span>
                            <span>{isEn ? 'Contra / Rejecter' : '反对立场派 (Contra)'}</span>
                          </span>
                          <div className="space-y-2">
                            {distinctSpeakers.filter(s => s.stance === 'contra').map(s => (
                              <div key={s.id} className="bg-white p-2.5 rounded-lg border border-red-100 shadow-3xs text-left">
                                <span className="text-xs font-black text-slate-950 block">{s.name}</span>
                                <span className="text-[9px] text-gray-400 font-sans block leading-tight mb-1">{s.school}</span>
                                <span className="text-[10.5px] bg-red-50 text-red-800 px-2 py-0.5 rounded font-medium block font-sans italic border border-red-100">
                                  “{s.stanceLabel}”
                                </span>
                              </div>
                            ))}
                            {distinctSpeakers.filter(s => s.stance === 'contra').length === 0 && (
                              <span className="text-[10px] text-gray-400 font-sans italic block py-2">{isEn ? 'No direct rejecters' : '暂无坚决反对者'}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Neutral Camp */}
                      <div className="bg-[#FAF7F2] border border-amber-200 rounded-xl p-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[10.5px] font-sans font-bold text-amber-850 flex items-center gap-1 uppercase mb-2">
                            <span>🟡</span>
                            <span>{isEn ? 'Neutral / Dialectic' : '中立/辩证超越派 (Neutral)'}</span>
                          </span>
                          <div className="space-y-2">
                            {distinctSpeakers.filter(s => s.stance === 'neutral' || (s.stance !== 'pro' && s.stance !== 'contra')).map(s => (
                              <div key={s.id} className="bg-white p-2.5 rounded-lg border border-amber-150 shadow-3xs text-left">
                                <span className="text-xs font-black text-slate-950 block">{s.name}</span>
                                <span className="text-[9px] text-gray-400 font-sans block leading-tight mb-1">{s.school}</span>
                                <span className="text-[10.5px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded font-medium block font-sans italic border border-amber-150">
                                  “{s.stanceLabel}”
                                </span>
                              </div>
                            ))}
                            {distinctSpeakers.filter(s => s.stance === 'neutral' || (s.stance !== 'pro' && s.stance !== 'contra')).length === 0 && (
                              <span className="text-[10px] text-gray-400 font-sans italic block py-2">{isEn ? 'No dialectic observers' : '暂无辩证中立者'}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Chat-like dialogue list */}
              <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {debateRounds.map((round, index) => {
                  const isModerator = round.speakerId === 'moderator' || round.speakerId === 'admin';
                  const speakerPh = allPhilosophersFlat.find(p => p.id === round.speakerId);
                  
                  // Get school styles if philosopher
                  const colors = speakerPh ? getSchoolColors(speakerPh.school) : { border: 'border-l-[#D4AF37]/60', bg: 'bg-amber-50/45 text-[#0A4A5E]', text: 'text-amber-900', badge: 'bg-[#D4AF37]' };

                  // High-contrast stance label pill inside dialogue
                  const stance = round.stance || 'neutral';
                  const stanceLabel = round.stanceLabel || '';
                  let stanceTag = null;

                  if (!isModerator) {
                    if (stance === 'pro') {
                      stanceTag = (
                        <span className="bg-green-100 text-green-950 text-[9.5px] font-sans font-bold px-2 py-0.5 rounded-full border border-green-300 shadow-3xs flex items-center gap-0.5">
                          <span>🟢</span>
                          <span>支持派: {stanceLabel}</span>
                        </span>
                      );
                    } else if (stance === 'contra') {
                      stanceTag = (
                        <span className="bg-red-100 text-red-950 text-[9.5px] font-sans font-bold px-2 py-0.5 rounded-full border border-red-300 shadow-3xs flex items-center gap-0.5">
                          <span>🔴</span>
                          <span>反对派: {stanceLabel}</span>
                        </span>
                      );
                    } else {
                      stanceTag = (
                        <span className="bg-amber-100 text-amber-950 text-[9.5px] font-sans font-bold px-2 py-0.5 rounded-full border border-amber-300 shadow-3xs flex items-center gap-0.5">
                          <span>🟡</span>
                          <span>中立派: {stanceLabel}</span>
                        </span>
                      );
                    }
                  } else {
                    stanceTag = (
                      <span className="bg-blue-100 text-blue-950 text-[9.5px] font-sans font-bold px-2 py-0.5 rounded-full border border-blue-200 shadow-3xs flex items-center gap-0.5">
                        <span>⚖️</span>
                        <span>合议法官中立判词</span>
                      </span>
                    );
                  }

                  return (
                    <div 
                      key={index}
                      className={`flex flex-col ${isModerator ? 'items-center' : 'items-start'} max-w-full`}
                    >
                      {/* Name Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
                        <span className={`px-2.5 py-0.5 rounded text-[10.5px] font-bold text-white uppercase font-mono shadow-3xs ${
                          isModerator ? 'bg-amber-800' : colors.badge
                        }`}>
                          {isEn && speakerPh ? (speakerPh.nameEng || round.speakerName) : round.speakerName}
                        </span>
                        {!isModerator && speakerPh && (
                          <span className="text-[9.5px] text-[#D4AF37] font-sans font-bold">
                            [{isEn ? (schoolTranslations[speakerPh.school] || speakerPh.school) : speakerPh.school}]
                          </span>
                        )}
                        {stanceTag}
                      </div>

                      {/* Utterance Bubble */}
                      <div className={`w-full max-w-4xl text-[13px] sm:text-[14px] leading-relaxed text-justify rounded-xl p-4 sm:p-5 border shadow-sm font-serif ${
                        isModerator 
                          ? 'bg-amber-50/70 border-amber-300 text-[#0F172A] border-dashed text-center font-bold italic'
                          : `${colors.bg} ${colors.border} border-l-4 border-gray-200 text-slate-900 font-medium`
                      }`}>
                        {round.utterance}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] border-t border-dashed border-gray-200 pt-4 mt-6 text-gray-400 font-mono text-center">
                {isEn 
                  ? 'Court of Classical Reason. Under high-tension academic cross-fire. Truth triumphs!' 
                  : '雅典露天学园议和合议庭审结。真理永无句号，唯有不息的理性求索！'}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Bottom instructional footer */}
      <div className="mt-8 bg-[#FAF8F5] rounded-xl border border-gray-150 p-4 font-serif text-xs text-slate-600 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-[#0B2545] tracking-wide mb-1 flex items-center gap-1 uppercase">
            <span>🛡️</span>
            <span>{isEn ? 'Rules of the Council' : '理性的雅典会议庭宪章'}</span>
          </h4>
          <p className="text-[10.5px] font-sans leading-relaxed">
            {isEn 
              ? 'Multi-perspective discourse requires meticulous coherence. Up to 5 selected thinkers will speak in rapid succession: presenting core schools of thoughts, dismantling opposing paradigms, and attempting reconciliation.'
              : '多维思想对抗极其耗费逻辑推演。入席的 2 至 5 位先贤，将遵循神殿议事顺序发言：针对辩题阐发本门学说本原、横向解构对方逻辑偏见，并由大会主持人总结理性演化成果。'}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[#0B2545] tracking-wide mb-1 flex items-center gap-1 uppercase">
            <span>⚡</span>
            <span>{isEn ? 'Dual Translation Natively' : '中英学术注释自动转换'}</span>
          </h4>
          <p className="text-[10.5px] font-sans leading-relaxed">
            {isEn 
              ? 'The system translates topics, selected sages, and speech bubbles automatically. Toggle the global translation button in the bottom floating dock to match your desired reading environment.'
              : '格斗场完全支持实时翻译。若您在底部控制条中开启了 English 学术注释，大会主持、贤哲头衔及最终辩词卷轴均将以学术典雅的英文呈现。'}
          </p>
        </div>
      </div>

    </div>
  );
};
