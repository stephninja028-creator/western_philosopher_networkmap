import { useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { Sparkles, RotateCcw, Download, Copy, Check, ArrowRight, Brain, ChevronRight, X as XIcon, MessageCircle, Send, X as Close, QrCode } from 'lucide-react';
import { questions, archetypes, computeResult, type PhilosopherArchetype } from '../data/quizData';
import { getPhilosopherPortrait } from '../data/portraitMap';

// ============================================================
// TYPES
// ============================================================

type QuizPhase = 'intro' | 'question' | 'result';

interface SoulTestProps {
  language: 'zh' | 'en';
  onNavigateToPhilosopher?: (philosopherId: string) => void;
}

// ============================================================
// COMPONENT
// ============================================================

export function SoulTest({ language, onNavigateToPhilosopher }: SoulTestProps) {
  const isEn = language === 'en';

  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resultId, setResultId] = useState<string>('');
  const [allScores, setAllScores] = useState<Record<string, number>>({});
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showWechatQR, setShowWechatQR] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const archetype: PhilosopherArchetype | null = resultId ? archetypes[resultId] : null;
  const portrait = resultId ? getPhilosopherPortrait(resultId) : null;

  const QUIZ_URL = 'https://www.knowphilosophers.site/#soul-test';

  // ── Top matches — relative percentages (top = 100%) ──────────

  const topMatches = useMemo(() => {
    if (!allScores || !resultId) return [];
    const entries = (Object.entries(allScores) as [string, number][])
      .filter(([, score]) => score > 0)
      .sort(([, a], [, b]) => b - a);
    if (entries.length === 0) return [];

    const topScore = entries[0][1];
    if (topScore === 0) return [];

    return entries
      .slice(0, 4)
      .map(([pid, score]) => ({
        pid,
        archetype: archetypes[pid],
        score,
        percentage: Math.round((score / topScore) * 100),
      }));
  }, [allScores, resultId]);

  // GA tracking helper
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    try {
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', eventName, params);
      }
    } catch {}
  }, []);

  // ── Handlers ────────────────────────────────────────────

  const handleStart = () => {
    setPhase('question');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setAllScores({});
    trackEvent('soul_test_start');
  };

  const handleSelect = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    setTimeout(() => {
      const newAnswers = [...answers, optionIdx];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        const { archetypeId, scores } = computeResult(newAnswers);
        setResultId(archetypeId);
        setAllScores(scores);
        setPhase('result');
        trackEvent('soul_test_complete', { result_id: archetypeId });
      }
    }, 350);
  };

  const handleRestart = () => {
    setPhase('intro');
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setIsFlipped(false);
    setResultId('');
    setAllScores({});
  };

  // ── Share helpers ──────────────────────────────────────

  const getShareText = useCallback((short = false) => {
    if (!archetype) return '';
    const name = isEn ? archetype.philosopherName.en : archetype.philosopherName.zh;
    const url = QUIZ_URL;
    if (short) {
      return isEn
        ? `I'm "${name}" — Philosophy Soul Test\n${url}`
        : `我是「${name}」——哲学灵魂测试\n${url}`;
    }
    return isEn
      ? `I took the Philosophy Soul Test and matched with ${name}. Discover your philosopher soul: ${url}`
      : `我做了哲学灵魂测试，我的哲学家是「${name}」。快来测测你的哲学灵魂：${url}`;
  }, [archetype, isEn]);

  // ── X (Twitter) share ──────────────────────────────────────
  const handleShareX = useCallback(() => {
    if (!archetype) return;
    trackEvent('soul_test_share', { platform: 'x' });
    const text = getShareText(true);
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=PhilosophySoulTest,哲学灵魂测试`;
    window.open(url, '_blank', 'noopener,noreferrer,width=550,height=420');
  }, [archetype, getShareText, trackEvent]);

  // ── 小红书 (Xiaohongshu) share — copy to clipboard ──────
  const handleShareRedBook = useCallback(async () => {
    if (!archetype) return;
    trackEvent('soul_test_share', { platform: 'xiaohongshu' });
    const text = getShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPlatform('xiaohongshu');
      setTimeout(() => setCopiedPlatform(null), 2200);
    } catch {}
  }, [archetype, getShareText, trackEvent]);

  // ── Instagram share — copy to clipboard ───────────────────
  const handleShareInstagram = useCallback(async () => {
    if (!archetype) return;
    trackEvent('soul_test_share', { platform: 'instagram' });
    const text = getShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPlatform('instagram');
      setTimeout(() => setCopiedPlatform(null), 2200);
    } catch {}
  }, [archetype, getShareText, trackEvent]);

  // ── WeChat share — show QR code ────────────────────────────
  const handleShareWeChat = useCallback(() => {
    if (!archetype) return;
    trackEvent('soul_test_share', { platform: 'wechat' });
    setShowWechatQR(true);
  }, [archetype, trackEvent]);

  // ── Download card as PNG ───────────────────────────────────
  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `philosophy-soul-${resultId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloading(false);
  }, [resultId]);

  const handleGoToPhilosopher = () => {
    if (onNavigateToPhilosopher && resultId) {
      onNavigateToPhilosopher(resultId);
    }
  };

  // ── RENDER ──────────────────────────────────────────────

  const q = phase === 'question' ? questions[currentQ] : null;
  const progress = phase === 'question' ? ((currentQ + 1) / questions.length) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      <AnimatePresence mode="wait">

        {/* ══════════ INTRO ══════════ */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Greek column decoration */}
            <div className="flex justify-center gap-6 mb-8 opacity-40">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-3 h-2 bg-[#D4AF37] rounded-t-sm" />
                  <div className="w-2 h-16 bg-[#0B2545]/60 rounded-sm" style={{ height: `${48 + Math.abs(i - 2) * 8}px` }} />
                  <div className="w-3 h-2 bg-[#D4AF37] rounded-b-sm" />
                </div>
              ))}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2545] dark:text-[#e8dcc8] tracking-tight mb-4">
              {isEn ? 'Philosophy Soul Test' : '哲学灵魂测试'}
            </h1>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-3 leading-relaxed">
              {isEn
                ? 'Answer 10 questions and discover which of the 16 great philosophers matches your soul. Are you a Socratic questioner, a Nietzschean free spirit, or a Zen awakened one?'
                : '回答 10 道问题，发现 16 位伟大哲学家中谁与你的灵魂最匹配。你是苏格拉底式追问者、尼采式自由超人，还是禅宗顿悟者？'}
            </p>

            {/* Philosopher icons preview */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap max-w-md mx-auto">
              {Object.values(archetypes).map(a => (
                <span key={a.philosopherId} className="text-2xl opacity-60 hover:opacity-100 transition-opacity" title={isEn ? a.typeName.en : a.typeName.zh}>
                  {a.emoji}
                </span>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0B2545] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#152d4a] hover:shadow-xl transition-all hover:scale-105 font-serif tracking-wider"
            >
              <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:animate-spin" />
              {isEn ? 'Begin the Test' : '开始测试'}
              <ArrowRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
              {isEn ? '10 questions · 2 minutes · Free' : '10 道题 · 2 分钟 · 免费'}
            </p>
          </motion.div>
        )}

        {/* ══════════ QUESTIONS ══════════ */}
        {phase === 'question' && q && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl mx-auto"
          >
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-wider">
                  {currentQ + 1} / {questions.length}
                </span>
                <span className="text-xs font-mono text-[#D4AF37] tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0B2545] to-[#D4AF37] rounded-full"
                  initial={{ width: `${((currentQ) / questions.length) * 100}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0B2545]/10 dark:bg-[#D4AF37]/10 mb-4">
                <Brain className="w-6 h-6 text-[#0B2545] dark:text-[#D4AF37]" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B2545] dark:text-[#e8dcc8] leading-relaxed">
                {isEn ? q.question.en : q.question.zh}
              </h2>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {q.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all font-medium text-sm sm:text-base leading-relaxed cursor-pointer
                    ${selectedOption === idx
                      ? 'border-[#D4AF37] bg-[#0B2545] text-white shadow-lg scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#D4AF37]/50 hover:bg-[#FAF8F5] dark:hover:bg-slate-750 hover:shadow-md'
                    }
                  `}
                  disabled={selectedOption !== null}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${selectedOption === idx
                        ? 'bg-[#D4AF37] text-[#0B2545]'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{isEn ? opt.text.en : opt.text.zh}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════ RESULT ══════════ */}
        {phase === 'result' && archetype && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-lg mx-auto"
          >
            {/* Header (no logo, no big percentage) */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2545] dark:text-[#e8dcc8] mb-1">
                  {isEn ? 'Your Philosopher Is...' : '你的哲学家是…'}
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {isEn ? 'Tap the card to flip and see details' : '点击卡片翻转查看详情'}
                </p>
              </motion.div>
            </div>

            {/* FLIP CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6 cursor-pointer perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="relative w-full aspect-[3/4] max-w-[380px] mx-auto preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* ── FRONT ── */}
                <div
                  ref={cardRef}
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: archetype.theme.gradient,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Marble texture overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23n)\' opacity=\'0.6\'/%3E%3C/svg%3E")',
                  }} />

                  {/* Gold border frame */}
                  <div className="absolute inset-3 border rounded-xl pointer-events-none" style={{ borderColor: `${archetype.theme.accent}40` }} />
                  <div className="absolute inset-[14px] border rounded-lg pointer-events-none" style={{ borderColor: `${archetype.theme.accent}25` }} />

                  {/* Content (no emoji, no percentage, no watermark) */}
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>

                    {/* Top decorative line */}
                    <div className="w-16 h-[2px] rounded-full mb-6 opacity-60" style={{ background: archetype.theme.accent }} />

                    {/* Portrait */}
                    {portrait && (
                      <div className="mb-5">
                        <img
                          src={portrait.large}
                          alt={isEn ? archetype.philosopherName.en : archetype.philosopherName.zh}
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover"
                          style={{ borderColor: archetype.theme.accent, borderWidth: '3px' }}
                          crossOrigin="anonymous"
                        />
                      </div>
                    )}

                    {/* Philosopher name (main heading) */}
                    <h3 className="text-3xl sm:text-4xl font-bold mb-1 leading-tight" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.philosopherName.en : archetype.philosopherName.zh}
                    </h3>

                    {/* Type name (subtitle) */}
                    <p className="text-sm opacity-70 mb-4" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.typeName.en : archetype.typeName.zh}
                    </p>

                    {/* Divider */}
                    <div className="w-10 h-[1px] mb-5 opacity-40" style={{ background: archetype.theme.accent }} />

                    {/* Quote */}
                    <p className="text-sm sm:text-base italic leading-relaxed max-w-[280px] opacity-90" style={{ color: '#e8dcc8' }}>
                      "{isEn ? archetype.quote.en : archetype.quote.zh}"
                    </p>
                  </div>
                </div>

                {/* ── BACK ── */}
                <div
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: archetype.theme.gradient,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Marble texture overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23n)\' opacity=\'0.6\'/%3E%3C/svg%3E")',
                  }} />

                  {/* Gold border frame */}
                  <div className="absolute inset-3 border rounded-xl pointer-events-none" style={{ borderColor: `${archetype.theme.accent}40` }} />

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6 sm:p-8 overflow-y-auto" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>

                    {/* Type header (no emoji, no percentage) */}
                    <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.philosopherName.en : archetype.philosopherName.zh}
                    </h3>
                    <p className="text-xs opacity-70 mb-3" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.typeName.en : archetype.typeName.zh}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-[1px] mb-3 opacity-20" style={{ background: archetype.theme.accent }} />

                    {/* Description */}
                    <p className="text-xs sm:text-sm leading-relaxed mb-3 opacity-85" style={{ color: '#e8dcc8' }}>
                      {isEn ? archetype.description.en : archetype.description.zh}
                    </p>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(isEn ? archetype.traits.en : archetype.traits.zh).map((trait, i) => (
                        <span
                          key={i}
                          className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: archetype.theme.tagBg,
                            color: archetype.theme.accent,
                            border: `1px solid ${archetype.theme.accent}30`,
                          }}
                        >
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] mb-3 opacity-20" style={{ background: archetype.theme.accent }} />

                    {/* Ideology */}
                    <div className="mb-2">
                      <h4 className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 opacity-60" style={{ color: archetype.theme.accent }}>
                        {isEn ? 'Core Ideology' : '核心意识形态'}
                      </h4>
                      <p className="text-[11px] sm:text-xs leading-relaxed opacity-75" style={{ color: '#d8ccb8' }}>
                        {isEn ? archetype.ideology.en : archetype.ideology.zh}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Top matches mini-bar (relative percentages) ── */}
            {topMatches.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-5 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-wider uppercase">
                  {isEn ? 'Your Philosophical Spectrum' : '你的哲学光谱'}
                </h4>
                <div className="flex flex-col gap-1.5">
                  {topMatches.map((match, i) => (
                    <div key={match.pid} className="flex items-center gap-2">
                      <span className="text-sm">{match.archetype.emoji}</span>
                      <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${match.percentage}%`,
                            background: i === 0
                              ? archetype.theme.accent
                              : `${archetype.theme.accent}60`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium w-24 text-right truncate" style={{
                        color: i === 0 ? archetype.theme.accent : 'var(--text-secondary, #666)',
                      }}>
                        {isEn ? match.archetype.philosopherName.en : match.archetype.philosopherName.zh}
                      </span>
                      <span className="text-xs font-bold w-10 text-right" style={{ color: i === 0 ? archetype.theme.accent : '#888' }}>
                        {match.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col gap-3"
            >
              {/* View Philosopher Button */}
              <button
                onClick={handleGoToPhilosopher}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0B2545] text-white rounded-xl font-bold text-sm hover:bg-[#152d4a] transition-colors font-serif tracking-wider shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                {isEn ? `Explore ${archetype.philosopherName.en}'s Full Profile` : `查看「${archetype.philosopherName.zh}」完整资料`}
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {/* ── Share row: X / 微信 / 小红书 / Instagram ── */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={handleShareX}
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-black hover:bg-black/5 dark:hover:bg-white/10 transition-all group"
                  title={isEn ? 'Share on X' : '分享到 X'}
                >
                  <XIcon className="w-4 h-4 text-slate-700 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-black dark:group-hover:text-white">X</span>
                </button>

                <button
                  onClick={handleShareWeChat}
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#07C160] hover:bg-[#07C160]/5 transition-all group"
                  title={isEn ? 'Share on WeChat' : '分享到微信'}
                >
                  <svg className="w-4 h-4 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.69 4C4.93 4 1.92 6.51 1.92 9.6c0 1.78.93 3.36 2.4 4.43l-.6 1.83 2.13-1.07c.93.26 1.91.4 2.91.4h.27c-.18-.6-.27-1.22-.27-1.86 0-3.1 3-5.6 6.71-5.6h.27C15.16 5.46 12.2 4 8.69 4zm-2.91 2.4c.51 0 .93.42.93.93s-.42.93-.93.93-.93-.42-.93-.93.42-.93.93-.93zm5.83 0c.51 0 .93.42.93.93s-.42.93-.93.93-.93-.42-.93-.93.42-.93.93-.93zM15.55 9.6c-3.31 0-6 2.21-6 4.93 0 1.55.84 2.93 2.13 3.84l-.51 1.59 1.84-.93c.79.22 1.62.34 2.49.34 3.31 0 6-2.21 6-4.93 0-1.55-.84-2.93-2.13-3.84l.51-1.59-1.84.93c-.79-.22-1.62-.34-2.49-.34zm-2.06 2c.51 0 .93.42.93.93s-.42.93-.93.93-.93-.42-.93-.93.42-.93.93-.93zm4.13 0c.51 0 .93.42.93.93s-.42.93-.93.93-.93-.42-.93-.93.42-.93.93-.93z"/>
                  </svg>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-[#07C160]">{isEn ? 'WeChat' : '微信'}</span>
                </button>

                <button
                  onClick={handleShareRedBook}
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#FF2741] hover:bg-[#FF2741]/5 transition-all group"
                  title={isEn ? 'Copy for Xiaohongshu' : '复制文案发小红书'}
                >
                  {copiedPlatform === 'xiaohongshu' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <svg className="w-4 h-4 text-[#FF2741]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 6.5C3 4.57 4.57 3 6.5 3h11C19.43 3 21 4.57 21 6.5v11c0 1.93-1.57 3.5-3.5 3.5h-11C4.57 21 3 19.43 3 17.5v-11zM6 7v10h2v-3h2l1.5 3H14l-1.7-3.4c.93-.32 1.6-1.2 1.6-2.25 0-1.3-1.05-2.35-2.35-2.35H6zm2 2h2.5c.55 0 1 .45 1 1s-.45 1-1 1H8V9z"/>
                    </svg>
                  )}
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-[#FF2741]">{isEn ? 'RedNote' : '小红书'}</span>
                </button>

                <button
                  onClick={handleShareInstagram}
                  className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#E1306C] hover:bg-[#E1306C]/5 transition-all group"
                  title={isEn ? 'Copy for Instagram' : '复制文案发 Instagram'}
                >
                  {copiedPlatform === 'instagram' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39C1.34 2.69.93 3.36.62 4.15.32 4.91.12 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.25 2.15.55 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.25 2.91-.55.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.25-2.15-.55-2.91-.31-.79-.72-1.46-1.39-2.13C21.31 1.34 20.64.93 19.85.62 19.09.32 18.22.12 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
                    </svg>
                  )}
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-[#E1306C]">Instagram</span>
                </button>
              </div>

              {/* Download row */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {downloading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {downloading ? (isEn ? 'Generating...' : '生成中...') : (isEn ? 'Download card as image' : '下载卡片图片')}
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-slate-400 dark:text-slate-500 hover:text-[#0B2545] dark:hover:text-[#D4AF37] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {isEn ? 'Take the test again' : '重新测试'}
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ══════════ WeChat QR Modal ══════════ */}
      <AnimatePresence>
        {showWechatQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowWechatQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#07C160]" />
                  {isEn ? 'Scan with WeChat' : '微信扫码分享'}
                </h3>
                <button
                  onClick={() => setShowWechatQR(false)}
                  className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <Close className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl mb-3 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(QUIZ_URL)}&color=1a3a5c&bgcolor=ffffff`}
                  alt="WeChat QR"
                  className="w-56 h-56"
                  crossOrigin="anonymous"
                />
              </div>
              <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                {isEn ? 'Scan this QR code with WeChat to open the soul test' : '使用微信扫一扫，打开灵魂测试页面'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}