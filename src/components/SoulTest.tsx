import { useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { Sparkles, RotateCcw, Copy, Check, ArrowRight, ChevronRight } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const archetype: PhilosopherArchetype | null = resultId ? archetypes[resultId] : null;
  const portrait = resultId ? getPhilosopherPortrait(resultId) : null;

  const QUIZ_URL = 'https://www.knowphilosophers.site/#soul-test';


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
        const { archetypeId } = computeResult(newAnswers);
        setResultId(archetypeId);
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
  };

  // ── Copy share text to clipboard ─────────────────────────
  const handleCopy = useCallback(async () => {
    if (!archetype) return;
    trackEvent('soul_test_copy');
    const name = isEn ? archetype.philosopherName.en : archetype.philosopherName.zh;
    const text = isEn
      ? `I'm "${name}" — Philosophy Soul Test\n${QUIZ_URL}`
      : `我是「${name}」——哲学灵魂测试\n${QUIZ_URL}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  }, [archetype, isEn, trackEvent]);


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
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2545] dark:text-[#e8dcc8] mb-1">
                  {isEn ? 'You Are...' : '你是…'}
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
                {/* ── FRONT (visible card on screen) ── */}
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

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                    <div className="w-16 h-[2px] rounded-full mb-6 opacity-60" style={{ background: archetype.theme.accent }} />

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

                    <h3 className="text-3xl sm:text-4xl font-bold mb-1 leading-tight" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.philosopherName.en : archetype.philosopherName.zh}
                    </h3>
                    <p className="text-sm opacity-70 mb-4" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.typeName.en : archetype.typeName.zh}
                    </p>

                    <div className="w-10 h-[1px] mb-5 opacity-40" style={{ background: archetype.theme.accent }} />

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
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23n)\' opacity=\'0.6\'/%3E%3C/svg%3E")',
                  }} />

                  <div className="absolute inset-3 border rounded-xl pointer-events-none" style={{ borderColor: `${archetype.theme.accent}40` }} />

                  <div className="relative h-full flex flex-col p-6 sm:p-8 overflow-y-auto" style={{ fontFamily: "'Noto Serif', Georgia, serif" }}>
                    <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.philosopherName.en : archetype.philosopherName.zh}
                    </h3>
                    <p className="text-xs opacity-70 mb-3" style={{ color: archetype.theme.accent }}>
                      {isEn ? archetype.typeName.en : archetype.typeName.zh}
                    </p>

                    <div className="w-full h-[1px] mb-3 opacity-20" style={{ background: archetype.theme.accent }} />

                    <p className="text-xs sm:text-sm leading-relaxed mb-3 opacity-85" style={{ color: '#e8dcc8' }}>
                      {isEn ? archetype.description.en : archetype.description.zh}
                    </p>

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

                    <div className="w-full h-[1px] mb-3 opacity-20" style={{ background: archetype.theme.accent }} />

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

              {/* Copy result */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm border-2 transition-colors"
                style={{
                  borderColor: '#D4AF37',
                  color: copied ? '#16a34a' : '#D4AF37',
                  background: copied ? 'rgba(22,163,74,0.08)' : 'rgba(212,175,55,0.08)',
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? (isEn ? 'Copied' : '已复制') : (isEn ? 'Copy Result' : '复制结果')}
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


    </div>
  );
}