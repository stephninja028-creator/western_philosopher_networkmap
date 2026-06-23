import React, { useMemo } from 'react';
import { Epoch, Philosopher, getPhilosopherPedigree } from '../types';
import { PhilosopherCard } from './PhilosopherCard';

interface LineageDiagramProps {
  allEpochs: Epoch[];
  selectedPhilosopher: Philosopher | null;
  hoveredPhilosopherId: string | null;
  highlightedIds: Set<string>;
  onSelectPhilosopher: (p: Philosopher) => void;
  onDoubleClickPhilosopher?: (p: Philosopher) => void;
  onHoverPhilosopher: (id: string | null) => void;
  selectedLevels?: number[];
  language?: 'zh' | 'en';
  translatedPhilosopherValues?: Record<string, any>;
}

export const LineageDiagram: React.FC<LineageDiagramProps> = ({
  allEpochs,
  selectedPhilosopher,
  hoveredPhilosopherId,
  highlightedIds,
  onSelectPhilosopher,
  onDoubleClickPhilosopher,
  onHoverPhilosopher,
  selectedLevels,
  language = 'zh',
  translatedPhilosopherValues,
}) => {

  const totalEpochs = allEpochs.length;

  // 1. Merge all philosophers from all epochs into a single array with unified vertical coordinates (0-100%)
  const unifiedPhilosophers = useMemo(() => {
    return allEpochs.flatMap((epoch, epochIndex) => {
      return epoch.philosophers.map(p => {
        // Map relative coordinate (0-100) inside individual epoch to continuous global scale (0-100)
        // With top/bottom safety padding to keep cards from clipping edges
        const padding = 2; // minor safety margin %
        const innerScale = 100 - (padding * 2);
        const yScaled = padding + (p.y / 100) * innerScale;
        const yUnified = ((epochIndex * 100) + yScaled) / totalEpochs;
        
        return {
          ...p,
          // Storing actual original coordinates, but updating y to global unified coordinate
          y: yUnified,
        };
      });
    });
  }, [allEpochs, totalEpochs]);

  // Create a fast lookup map for philosopher elements
  const philosopherMap = useMemo(() => {
    const map = new Map<string, Philosopher>();
    unifiedPhilosophers.forEach(p => map.set(p.id, p));
    return map;
  }, [unifiedPhilosophers]);

  // 2. Merge all connections and include cross-epoch connections
  const unifiedConnections = useMemo(() => {
    // Collect all base connections from all epochs
    const baseList = allEpochs.flatMap(epoch => epoch.connections);

    // Add cross-epoch influences requested and researched
    const crossEpochList = [
      { from: 'plato', to: 'schopenhauer', type: 'influence' as const },
      { from: 'kant', to: 'schopenhauer', type: 'influence' as const },
      { from: 'heraclitus', to: 'nietzche', type: 'influence' as const },
      { from: 'spinoza', to: 'hegel', type: 'influence' as const },
      { from: 'hegel', to: 'marx', type: 'succession' as const },

      // Epoch 7 (Modern & Contemporary Period) - Deep Cross-Epoch Connections
      { from: 'kant', to: 'frege', type: 'influence' as const },         // Frege's logicism reacting against Kant's "synthetic a priori" arithmetic
      { from: 'leibniz', to: 'russell', type: 'succession' as const },    // Russell actualizing Leibniz's dream of symbolic logico-calculus
      { from: 'hume', to: 'russell', type: 'influence' as const },       // Humean radical skepticism and empiricism influencing Russell's logical atomism
      { from: 'plato', to: 'wittgenstein', type: 'influence' as const }, // Wittgenstein deconstructing Plato's theory of absolute Forms/Ideas
      { from: 'schopenhauer', to: 'wittgenstein', type: 'influence' as const }, // Early Tractatus limits-of-world boundaries shaped by Schopenhauerian Will
      { from: 'hume', to: 'quine', type: 'influence' as const },         // Quine's naturalized empiricism and skepticism of analytical/synthetic dogmas
      { from: 'kant', to: 'husserl', type: 'succession' as const },      // Husserl resolving Kantian "thing-in-itself" gap by phenomenon bracketing
      { from: 'descartes', to: 'husserl', type: 'influence' as const },   // Husserl's phenomenological system acting as Cartesian Meditations
      { from: 'nietzche', to: 'heidegger', type: 'influence' as const },  // Heidegger's meditation on Nietzsche's Will to Power as climax of metaphysics
      { from: 'aristotle', to: 'heidegger', type: 'influence' as const },  // Heidegger deconstructing and reconstructing Aristotelian Being (Ousia)
      { from: 'kierkegaard', to: 'sartre', type: 'succession' as const }, // Sartre's secularizing of Kierkegaardian dread and leap of faith
      { from: 'marx', to: 'sartre', type: 'influence' as const },         // Sartre synthesizing existential freedom with Marxist historical-social materialism
      { from: 'kant', to: 'peirce', type: 'influence' as const },         // Peirce adapting his terminology from Kant's "pragmatischer" concept in Critiques
      { from: 'locke', to: 'james', type: 'succession' as const },        // William James upgrading Locke's passive "tabula rasa" into active/radical empiricism
      { from: 'hegel', to: 'dewey', type: 'influence' as const },         // John Dewey's early education in Hegelian organicism shaping his functionalism
      { from: 'nietzche', to: 'foucault', type: 'succession' as const },  // Foucault's power-knowledge genealogy inherited from Nietzsche's Genealogy of Morals
      { from: 'marx', to: 'foucault', type: 'influence' as const },       // Foucault critiquing economic-reductionist state power model of Marxism
      { from: 'plato', to: 'derrida', type: 'influence' as const },       // Derrida deconstructing Platonic logocentrism (phonocentrism) in Phaedrus
      { from: 'nietzche', to: 'derrida', type: 'influence' as const },    // Derrida's play of signs influenced by Nietzschean infinite interpretation
      { from: 'kant', to: 'rorty', type: 'influence' as const },         // Rorty's "Philosophy and the Mirror of Nature" dismantling Kantian foundational epistemology
    ];

    // Filter duplicates and merge
    const joined = [...baseList, ...crossEpochList];
    const uniqueMap = new Map<string, typeof joined[number]>();
    joined.forEach(conn => {
      // Create a unique key
      const key = `${conn.from}->${conn.to}`;
      uniqueMap.set(key, conn);
    });

    return Array.from(uniqueMap.values());
  }, [allEpochs]);

  // 3. Render connection coordinates and highlighting state
  const renderedConnections = useMemo(() => {
    return unifiedConnections
      .map((conn, idx) => {
        const fromNode = philosopherMap.get(conn.from);
        const toNode = philosopherMap.get(conn.to);
        if (!fromNode || !toNode) return null;

        // Connections that match the hovered or selected nodes
        const isHighlighted =
          hoveredPhilosopherId === conn.from ||
          hoveredPhilosopherId === conn.to ||
          (selectedPhilosopher && (selectedPhilosopher.id === conn.from || selectedPhilosopher.id === conn.to));

        const isWeak =
          (hoveredPhilosopherId && hoveredPhilosopherId !== conn.from && hoveredPhilosopherId !== conn.to) ||
          (selectedPhilosopher && selectedPhilosopher.id !== conn.from && selectedPhilosopher.id !== conn.to);

        // Get levels
        const fromLvl = getPhilosopherPedigree(fromNode).level;
        const toLvl = getPhilosopherPedigree(toNode).level;
        const isFromUnfiltered = selectedLevels && !selectedLevels.includes(fromLvl);
        const isToUnfiltered = selectedLevels && !selectedLevels.includes(toLvl);

        let baseOpacity = isHighlighted ? 1 : isWeak ? 0.08 : 0.42;
        const isHoverActive = hoveredPhilosopherId !== null;
        if (isWeak) {
          // If hover is active, fade extremely heavily to allow the hover path to stand out.
          // If only selection is active (default static view), keep secondary paths beautifully visible at 0.28.
          baseOpacity = isHighlighted ? 1 : isHoverActive ? 0.08 : 0.28;
        }

        if (isFromUnfiltered || isToUnfiltered) {
          baseOpacity = isHighlighted ? 0.2 : 0.03;
        }

        return {
          id: `conn-${idx}-${conn.from}-${conn.to}`,
          x1: fromNode.x,
          y1: fromNode.y,
          x2: toNode.x,
          y2: toNode.y,
          type: conn.type,
          isHighlighted,
          opacity: baseOpacity,
        };
      })
      .filter(Boolean);
  }, [unifiedConnections, philosopherMap, hoveredPhilosopherId, selectedPhilosopher, selectedLevels]);

  // 4. Position timeline axis labels dynamically down the single unified canvas
  const timelineLabels = useMemo(() => {
    const list: { yPercent: number; label: string; blockTitle?: string }[] = [];
    allEpochs.forEach((epoch, epochIndex) => {
      const { timeGrid, title } = epoch;
      
      // Also add the block title indicator at the start of each epoch zone
      list.push({
        yPercent: (epochIndex * 100) / totalEpochs,
        label: '',
        blockTitle: title,
      });

      timeGrid.forEach((label, labelIndex) => {
        const division = timeGrid.length > 1 ? timeGrid.length - 1 : 1;
        const relativeY = 5 + (labelIndex / division) * 90; // scale between 5% and 95% of epoch area
        const yPct = (epochIndex * 100 + relativeY) / totalEpochs;
        list.push({
          yPercent: yPct,
          label,
        });
      });
    });
    return list;
  }, [allEpochs, totalEpochs]);

  return (
    <div 
      className="relative w-full h-[3200px] md:h-[3500px] bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] rounded-xl border border-[#D4AF37]/30 shadow-inner overflow-hidden p-1"
    >
      {/* Decorative Traditional Academic Watermark Shield */}
      <div className="absolute inset-x-0 top-1/4 flex items-center justify-center opacity-[0.012] pointer-events-none select-none z-0">
        <svg width="450" height="450" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 50,15 L 20,40 L 20,80 L 80,80 L 80,40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="35" y1="40" x2="35" y2="80" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" />
          <line x1="65" y1="40" x2="65" y2="80" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute inset-x-0 top-2/3 flex items-center justify-center opacity-[0.012] pointer-events-none select-none z-0">
        <svg width="450" height="450" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 50,15 L 20,40 L 20,80 L 80,80 L 80,40 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="35" y1="40" x2="35" y2="80" stroke="currentColor" strokeWidth="1.5" />
          <line x1="50" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" />
          <line x1="65" y1="40" x2="65" y2="80" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Invisible/Subtle dynamic coordinates anchors for Scroll Synchronization */}
      {allEpochs.map((epoch, epochIndex) => {
        const topPercent = (epochIndex * 100) / totalEpochs;
        return (
          <div
            key={epoch.id}
            id={`epoch-section-${epoch.id}`}
            className="absolute left-0 w-full h-[10px] pointer-events-none select-none z-0"
            style={{ top: `${topPercent}%` }}
          />
        );
      })}

      {/* Left Timeline Sidebar - Runs smoothly and uninterruptedly down the entire canvas */}
      <div className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[100px] border-r border-[#D4AF37]/25 bg-gradient-to-r from-[#FAF8F5] to-[#F3EDE0]/50 select-none z-20 font-serif">
        <div className="absolute inset-y-0 right-0 w-[1.5px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/15 to-[#D4AF37]/50" />
        
        {timelineLabels.map((item, idx) => {
          if (item.blockTitle) {
            return (
              <div
                key={`block-title-${idx}`}
                className="absolute left-1 md:left-2 transform -translate-y-1/2 flex flex-col pl-1 border-l-2 border-[#D4AF37] max-w-[70px] md:max-w-[85px]"
                style={{ top: `${item.yPercent}%` }}
              >
                <span className="text-[7.5px] md:text-[8px] font-sans font-bold tracking-widest text-[#D4AF37] uppercase leading-tight bg-[#051726] px-1 py-0.5 rounded shadow-xs text-center border border-[#D4AF37]/30">
                  {item.blockTitle.slice(0, 5)}
                </span>
              </div>
            );
          }

          return (
            <div
              key={`label-${idx}`}
              className="absolute right-0 flex items-center gap-1 md:gap-1.5 transform -translate-y-1/2 pr-1 md:pr-2.5"
              style={{ top: `${item.yPercent}%` }}
            >
              <span className="text-[7.5px] md:text-[8.5px] font-medium text-[#1E3A5F] text-right font-serif leading-tight max-w-[65px] md:max-w-[80px] truncate">
                {item.label}
              </span>
              <div className="w-[4px] h-[4px] rounded-full bg-[#D4AF37] ring-1 ring-amber-200" />
            </div>
          );
        })}
      </div>

      {/* RENDER CHAMBER: Combined Canvas containing BOTH SVG underlay and nodes overlay */}
      {/* Starting exactly after the timeline (left-20 or left-[100px]) to match coordinate spaces 100% perfectly */}
      <div className="absolute left-[80px] md:left-[100px] right-2 md:right-4 top-0 bottom-0 z-10 overflow-visible">
        
        {/* SVG Vector Connections Overlay - Renders direction arrows aligned down the historic flow */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.25" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Custom Arrow Markers – Points direction of theoretical inheritance */}
            <marker
              id="arrow-succession"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3.2"
              markerHeight="3.2"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0D5C75" />
            </marker>
            <marker
              id="arrow-succession-highlighted"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#D4AF37" />
            </marker>
            <marker
              id="arrow-influence"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="2.8"
              markerHeight="2.8"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0D5C75" opacity="0.65" />
            </marker>
            <marker
              id="arrow-influence-highlighted"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3.6"
              markerHeight="3.6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#D4AF37" />
            </marker>
          </defs>

          {/* Elegant dashed era dividers in the background */}
          {[1, 2, 3, 4, 5].map((idx) => {
            const hPct = (idx * 100) / totalEpochs;
            return (
              <g key={`divider-${idx}`}>
                <line
                  x1="0"
                  y1={hPct}
                  x2="100"
                  y2={hPct}
                  stroke="#D4AF37"
                  strokeWidth="0.06"
                  strokeDasharray="0.3 0.7"
                  opacity="0.25"
                />
              </g>
            );
          })}

          {/* Render individual line paths with arrow markers */}
          {renderedConnections.map((conn) => {
            if (!conn) return null;
            const { id, x1, y1, x2, y2, type, isHighlighted, opacity } = conn;

            // Shorten the vectors slightly on both ends using mathematical unit vector calculations.
            // This prevents arrowheads from rendering under card overlays.
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);

            let adjX1 = x1;
            let adjY1 = y1;
            let adjX2 = x2;
            let adjY2 = y2;

            // Standard card size offsets in the 0-100 normalized container space
            const shrinkStart = 2.0; 
            const shrinkEnd = 2.8;

            if (distance > (shrinkStart + shrinkEnd)) {
              adjX1 = x1 + (dx / distance) * shrinkStart;
              adjY1 = y1 + (dy / distance) * shrinkStart;
              adjX2 = x2 - (dx / distance) * shrinkEnd;
              adjY2 = y2 - (dy / distance) * shrinkEnd;
            } else if (distance > 0) {
              adjX1 = x1 + (dx / distance) * (distance * 0.3);
              adjX2 = x2 - (dx / distance) * (distance * 0.4);
            }

            const isSolid = type === 'succession';
            const markerId = isHighlighted
              ? isSolid ? 'url(#arrow-succession-highlighted)' : 'url(#arrow-influence-highlighted)'
              : isSolid ? 'url(#arrow-succession)' : 'url(#arrow-influence)';

            return (
              <path
                key={id}
                d={`M ${adjX1} ${adjY1} L ${adjX2} ${adjY2}`}
                fill="none"
                stroke={isHighlighted ? '#D4AF37' : '#0D5C75'}
                strokeWidth={isHighlighted ? 0.26 : 0.09}
                strokeDasharray={!isSolid ? '0.5, 0.5' : undefined}
                strokeLinecap="round"
                markerEnd={markerId}
                filter={isHighlighted ? 'url(#line-glow)' : undefined}
                style={{
                  opacity,
                  transition: 'stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s',
                }}
              />
            );
          })}
        </svg>

         {/* Philosopher Nodes Overlay - Renders exactly positioned HTML Card Elements */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {unifiedPhilosophers.map((philosopher) => {
            const isSelected = selectedPhilosopher?.id === philosopher.id;
            const isHovered = hoveredPhilosopherId === philosopher.id;
            const pedigree = getPhilosopherPedigree(philosopher);
            const isLvl5 = pedigree.level === 5;
            const isLvl4 = pedigree.level === 4;
            const isUnfiltered = selectedLevels && !selectedLevels.includes(pedigree.level);

            return (
              <div key={philosopher.id} className="pointer-events-auto">
                {/* 史学罗盘极光与精密星盘 (History Compass Flat Cartographic Backdrops - Decoupled from 3D/Futuristic perspective glows) */}
                {isLvl5 && (
                  <div 
                    className="absolute pointer-events-none select-none transition-opacity duration-300"
                    style={{
                      left: `${philosopher.x}%`,
                      top: `${philosopher.y}%`,
                      zIndex: 3,
                      opacity: isUnfiltered ? 0.15 : 1,
                    }}
                  >
                    {/* Clear, flat nested classical concentric borders */}
                    <div className="absolute w-[140px] h-[140px] rounded-full border border-[#D4AF37]/25 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute w-[114px] h-[114px] rounded-full border border-dashed border-[#D4AF37]/30 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute w-[80px] h-[80px] rounded-full border border-dotted border-[#D4AF37]/20 -translate-x-1/2 -translate-y-1/2" />
                    
                    {/* Fine crisp coordinate crosshair axes for flat historical alignment */}
                    <div className="absolute w-[160px] h-[1px] bg-[#D4AF37]/25 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute h-[160px] w-[1px] bg-[#D4AF37]/25 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
                {isLvl4 && (
                  <div 
                    className="absolute pointer-events-none select-none transition-opacity duration-300"
                    style={{
                      left: `${philosopher.x}%`,
                      top: `${philosopher.y}%`,
                      zIndex: 2,
                      opacity: isUnfiltered ? 0.15 : 1,
                    }}
                  >
                    {/* Flat, crisp classical circle indicator */}
                    <div className="absolute w-[114px] h-[114px] rounded-full border border-dashed border-[#D4AF37]/20 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    <div className="absolute w-[130px] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}

                <PhilosopherCard
                  philosopher={philosopher}
                  isSelected={!!isSelected}
                  isHovered={isHovered}
                  onSelect={() => onSelectPhilosopher(philosopher)}
                  onDoubleClick={() => onDoubleClickPhilosopher && onDoubleClickPhilosopher(philosopher)}
                  onHoverStart={() => onHoverPhilosopher(philosopher.id)}
                  onHoverEnd={() => onHoverPhilosopher(null)}
                  highlightedIds={highlightedIds}
                  selectedLevels={selectedLevels}
                  isHoverActive={hoveredPhilosopherId !== null}
                  language={language}
                  translatedValues={translatedPhilosopherValues?.[philosopher.id]}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Graph Help Legend - Anchored on bottom right corner */}
      <div className="absolute bottom-2 right-3 bg-white border border-[#D4AF37]/35 text-[9px] text-gray-700 rounded-lg px-2 py-1 pointer-events-none select-none z-30 font-serif shadow-md flex items-center gap-3">
        <span className="flex items-center gap-1 font-bold text-[#0D5C75]">
          <span className="w-3.5 h-[1.5px] bg-[#0D5C75] inline-block"></span> {language === 'en' ? '➜ Direct Heritage' : '➜ 学说师承'}
        </span>
        <span className="flex items-center gap-1 font-bold text-amber-805">
          <span className="w-3.5 h-[1px] border-b border-dashed border-[#0D5C75] inline-block"></span> {language === 'en' ? '➜ Indirect Impact' : '➜ 思想撞击'}
        </span>
        <span className="text-gray-500 font-sans">
          {language === 'en' ? '💡 Double click card for deep details' : '💡 双击人物卡片进入手稿生平行卷'}
        </span>
      </div>
    </div>
  );
};
