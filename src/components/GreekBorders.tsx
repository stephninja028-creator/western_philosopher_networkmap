import React from 'react';

// Greek Meander Key Pattern border
export const GreekMeander: React.FC<{ className?: string; height?: number }> = ({ className = '', height = 24 }) => {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`} 
      style={{ height: `${height}px` }}
    >
      <svg
        width="100%"
        height="100%"
        className="text-[#D4AF37] opacity-85"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="meander" width="40" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 0,10 L 15,10 L 15,3 L 5,3 L 5,17 L 25,17 L 25,7 L 10,7 L 10,13 L 20,13 L 20,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="miter"
              strokeLinecap="square"
            />
            <path
              d="M 20,10 L 35,10 L 35,3 L 25,3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="miter"
              strokeLinecap="square"
              className="opacity-40"
            />
            <line x1="35" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="2.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meander)" />
      </svg>
    </div>
  );
};

// SVG representation of a beautiful Greek Ionic Column
export const GreekPillar: React.FC<{ className?: string; height?: string }> = ({ className = '', height = '100%' }) => {
  return (
    <svg 
      className={`text-[#D4AF37] select-none pointer-events-none ${className}`} 
      style={{ height }}
      viewBox="0 0 100 800" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Capital (Top) */}
      {/* Abacus */}
      <rect x="10" y="30" width="80" height="15" rx="2" fill="currentColor" />
      
      {/* Volutes (Ionic scrolls) */}
      <circle cx="20" cy="65" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="20" cy="65" r="8" fill="currentColor" />
      <circle cx="80" cy="65" r="16" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="80" cy="65" r="8" fill="currentColor" />
      
      {/* Architrave bridge */}
      <path d="M12 50 C 30 55, 70 55, 88 50 L 80 80 L 20 80 Z" fill="currentColor" />
      
      {/* Shaft (Lines/Fluting) */}
      <rect x="25" y="80" width="50" height="660" fill="currentColor" opacity="0.15" />
      
      {/* Vertical flutes */}
      <line x1="30" y1="85" x2="30" y2="735" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      <line x1="37" y1="85" x2="37" y2="735" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      <line x1="44" y1="85" x2="44" y2="735" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      <line x1="50" y1="85" x2="50" y2="735" stroke="currentColor" strokeWidth="4" opacity="0.9" />
      <line x1="56" y1="85" x2="56" y2="735" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      <line x1="63" y1="85" x2="63" y2="735" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      <line x1="70" y1="85" x2="70" y2="735" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      
      {/* Shaft Borders */}
      <line x1="24" y1="80" x2="24" y2="740" stroke="currentColor" strokeWidth="5" />
      <line x1="76" y1="80" x2="76" y2="740" stroke="currentColor" strokeWidth="5" />

      {/* Base (Bottom) */}
      <path d="M 20 740 L 80 740 L 85 750 L 15 750 Z" fill="currentColor" />
      <rect x="12" y="750" width="76" height="15" rx="1" fill="currentColor" />
      <rect x="5" y="765" width="90" height="20" rx="3" fill="currentColor" stroke="white" strokeWidth="2" />
    </svg>
  );
};

// Pediment design helper component for page/section headers
export const GreekPediment: React.FC<{ title: string; subtitle?: string; className?: string }> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center select-none text-center ${className}`}>
      {/* Pediment triangle ceiling */}
      <svg 
        className="w-full text-[#D4AF37] max-w-[280px]" 
        viewBox="0 0 300 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 45 L150 5 L300 45 Z" fill="currentColor" opacity="0.15" />
        <path d="M0 45 L150 5 L300 45 Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
        <line x1="0" y1="45" x2="300" y2="45" stroke="currentColor" strokeWidth="5" />
        <circle cx="150" cy="27" r="6" fill="currentColor" />
      </svg>
      
      <div className="bg-[#FDFDFB] px-8 py-2 border-x-4 border-double border-[#D4AF37] mt-[-2px] shadow-sm z-10">
        <h2 className="font-serif text-2xl tracking-widest text-[#0D5C75] font-bold uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs tracking-widest font-mono text-amber-700 uppercase mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Plinth underneath */}
      <div className="w-full max-w-[400px] h-[3px] bg-[#D4AF37] mt-[1px]" />
    </div>
  );
};
