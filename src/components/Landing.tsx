import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Brain, BookOpen, ArrowRight, Sun, Moon } from 'lucide-react';
import { GreekMeander, GreekPillar } from './GreekBorders';

interface LandingProps {
  language: 'zh' | 'en';
  setLanguage: (lang: 'zh' | 'en') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onEnter: () => void;
  onEnterSoul: () => void;
}

// Subtle marble noise overlay (reused site-wide)
const MARBLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

export const Landing: React.FC<LandingProps> = ({
  language,
  setLanguage,
  theme,
  onToggleTheme,
  onEnter,
  onEnterSoul,
}) => {
  const isZh = language === 'zh';

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #F5F2EA 0%, #FDFBF6 50%, #EBF5F8 100%)' }}
    >
      {/* Marble texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: MARBLE }} />

      {/* ── Ancient Greek celestial orrery — slowly rotating decorative layer ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      >
        {/* Large celestial ring */}
        <motion.div
          className="absolute -top-28 -right-28 w-[28rem] h-[28rem] rounded-full border border-[#D4AF37]/[0.06]"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
        {/* Medium ring reverse */}
        <motion.div
          className="absolute top-1/3 -left-16 w-72 h-72 rounded-full border border-[#D4AF37]/[0.05]"
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        />
        {/* Dotted scholarly ring */}
        <motion.div
          className="absolute -bottom-12 right-1/4 w-56 h-56 rounded-full border border-dashed border-[#C2593F]/[0.07]"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        />
        {/* Small accent ring */}
        <motion.div
          className="absolute top-[22%] left-[10%] w-40 h-40 rounded-full border border-[#0D5C75]/[0.06]"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />

        {/* Faint constellation / star dots — softly pulse */}
        {[
          [8, 10], [22, 32], [76, 6], [88, 25], [14, 72],
          [68, 80], [42, 48], [58, 32], [91, 12], [12, 58],
          [34, 18], [80, 52], [56, 15], [28, 82],
        ].map(([l, t], i) => (
          <motion.span
            key={i}
            className="absolute block w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
            style={{ left: `${l}%`, top: `${t}%` }}
            animate={{ opacity: [0.25, 0.04, 0.25] }}
            transition={{
              duration: 3 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          />
        ))}

        {/* Faint Greek inscription behind the hero area */}
        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37]/[0.035] font-serif text-[70px] sm:text-[110px] tracking-[0.35em] select-none whitespace-nowrap pointer-events-none"
          style={{ fontFamily: '"Times New Roman", "Georgia", serif' }}
        >
          ΦΙΛΟΣΟΦΙΑ
        </div>
      </motion.div>

      {/* Greek meander borders */}
      <div className="absolute top-0 left-0 w-full">
        <GreekMeander height={28} />
      </div>
      <div className="absolute bottom-0 left-0 w-full rotate-180">
        <GreekMeander height={28} />
      </div>

      {/* Top-right controls: language + theme */}
      <div className="absolute top-5 right-5 flex items-center gap-2.5 z-20">
        <div
          className="flex items-center bg-[#FAF8F5] border border-[#D4AF37]/65 rounded-full p-0.5 shadow-sm"
          title={isZh ? 'Language / 中英文切换' : 'Language / 中英文切换'}
        >
          <button
            type="button"
            onClick={() => setLanguage('zh')}
            className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
              isZh ? 'bg-[#0B2545] text-[#FAF8F5] shadow' : 'text-slate-400 hover:text-[#0B2545]'
            }`}
          >
            中
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
              !isZh ? 'bg-[#0B2545] text-[#FAF8F5] shadow' : 'text-slate-400 hover:text-[#0B2545]'
            }`}
          >
            EN
          </button>
        </div>
        <button
          type="button"
          className="cursor-pointer p-1.5 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/65 hover:bg-white transition-all"
          onClick={onToggleTheme}
          title={theme === 'dark' ? (isZh ? '切换亮色' : 'Light') : (isZh ? '切换暗色' : 'Dark')}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>

      {/* Center content */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl px-6 py-12 flex flex-col items-center text-center gap-7"
      >
        {/* Pediment + flanking pillars */}
        <div className="flex items-end justify-center gap-5 sm:gap-8">
          <GreekPillar className="w-9 sm:w-14 hidden sm:block opacity-90" height="128px" />
          <div className="flex flex-col items-center">
            {/* Pediment triangle */}
            <svg
              className="w-44 sm:w-56 text-[#D4AF37]"
              viewBox="0 0 300 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 46 L150 6 L300 46 Z" fill="currentColor" opacity="0.14" />
              <path d="M0 46 L150 6 L300 46 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
              <line x1="0" y1="46" x2="300" y2="46" stroke="currentColor" strokeWidth="5" />
              <circle cx="150" cy="28" r="5.5" fill="currentColor" />
            </svg>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-[0.15em] text-[#0B2545] -mt-1">
              {isZh ? '东西方哲学家' : 'Eastern & Western'}
            </h1>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.12em] text-[#C2593F] mt-0.5">
              {isZh ? '哲 学 图 谱' : 'P H I L O S O P H E R S'}
            </h2>
          </div>
          <GreekPillar className="w-9 sm:w-14 hidden sm:block opacity-90 scale-x-[-1]" height="128px" />
        </div>

        {/* Tagline */}
        <p className="font-serif text-lg sm:text-xl text-[#0D5C75] tracking-wide">
          {isZh ? '156 位思想者，跨越文明的对话' : '156 thinkers in dialogue across civilizations'}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 max-w-md">
          {isZh
            ? '一张交互式思想网络图谱——沿着师承、论战与影响之线，漫游从苏格拉底到王阳明的智慧长河。'
            : 'An interactive web of thought — trace lines of mentorship, debate, and influence from Socrates to Wang Yangming.'}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 w-full mt-2">
          <button
            onClick={onEnter}
            className="group relative overflow-hidden rounded-full px-10 py-4 bg-[#0B2545] text-[#FAF8F5] font-serif font-bold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all hover:scale-[1.03] flex items-center gap-3 cursor-pointer"
          >
            <Landmark className="w-5 h-5 text-[#D4AF37]" />
            <span>{isZh ? '进入图谱' : 'Enter the Map'}</span>
            <ArrowRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onEnterSoul}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 border-2 border-[#D4AF37]/50 text-[#0B2545] bg-white/60 hover:bg-white hover:border-[#D4AF37] transition-all font-serif font-bold tracking-wider text-sm cursor-pointer"
            >
              <Brain className="w-4 h-4 text-[#3b1e6e]" />
              {isZh ? '灵魂测试' : 'Soul Test'}
            </button>
            <a
              href="/blog"
              className="flex items-center gap-2 rounded-full px-5 py-2.5 border-2 border-[#D4AF37]/50 text-[#0B2545] bg-white/60 hover:bg-white hover:border-[#D4AF37] transition-all font-serif font-bold tracking-wider text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              {isZh ? '阅读博客' : 'Blog'}
            </a>
          </div>
        </div>

        {/* Footer mark */}
        <div className="mt-3 text-[11px] tracking-[0.25em] text-slate-400 font-mono uppercase">
          knowphilosophers.site
        </div>
      </motion.div>
    </motion.div>
  );
};

