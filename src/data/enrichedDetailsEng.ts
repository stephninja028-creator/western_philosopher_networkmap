/**
 * Aggregated English enriched details for ALL philosophers.
 *
 * Combines:
 *   1. Epoch-specific English files (enrichedEpoch1Eng ... enrichedEpoch6Eng)
 *   2. Existing fallback translations from translationsEng.ts
 *
 * This eliminates the need for Gemini API real-time translation,
 * providing instant, zero-failure English content.
 *
 * Lookup priority per philosopher:
 *   - If epoch Eng file has the philosopher → use it (scholarly, concise)
 *   - If fallback has complete translation (lifeAndTimes + worldviewSummary + quote) → use it
 *   - If fallback has partial (details + concepts only) → merge with epoch Eng if available
 *   - Otherwise → return null (triggers programmatic fallback)
 */

import { enrichedEpoch1Eng } from './enrichedEpoch1Eng';
import { enrichedEpoch2Eng } from './enrichedEpoch2Eng';
import { enrichedEpoch3Eng } from './enrichedEpoch3Eng';
import { enrichedEpoch4Eng } from './enrichedEpoch4Eng';
import { enrichedEpoch5Eng } from './enrichedEpoch5Eng';
import { enrichedEpoch6Eng } from './enrichedEpoch6Eng';
import { enrichedEpoch7Eng } from './enrichedEpoch7Eng';
import { philosopherFallbackTranslations } from './translationsEng';

export interface PhilosopherEnrichedEng {
  details?: string;
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  reflectionQuestion?: string;
  concepts: string[];
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}

// Merge all epoch Eng files into one lookup
const epochEngMerged: Record<string, {
  lifeAndTimes: string;
  worldviewSummary: string;
  quote: string;
  comparisons: Array<{
    withName: string;
    coreDifference: string;
    reflectionPrompt: string;
  }>;
}> = {
  ...enrichedEpoch1Eng,
  ...enrichedEpoch2Eng,
  ...enrichedEpoch3Eng,
  ...enrichedEpoch4Eng,
  ...enrichedEpoch5Eng,
  ...enrichedEpoch6Eng,
  ...enrichedEpoch7Eng,
};

/**
 * Get the best available English enriched data for a philosopher.
 * Returns null if no English data is available.
 */
export function getEnrichedEng(id: string): PhilosopherEnrichedEng | null {
  const fallback = philosopherFallbackTranslations[id];
  const epochEng = epochEngMerged[id];

  // Case 1: Both sources available — merge for richest result
  if (fallback && epochEng) {
    return {
      details: fallback.details,
      lifeAndTimes: epochEng.lifeAndTimes || fallback.lifeAndTimes || '',
      worldviewSummary: epochEng.worldviewSummary || fallback.worldviewSummary || '',
      quote: epochEng.quote || fallback.quote || '',
      reflectionQuestion: fallback.reflectionQuestion,
      concepts: fallback.concepts || [],
      comparisons: epochEng.comparisons || fallback.comparisons || [],
    };
  }

  // Case 2: Only epoch Eng file (new translations created by agents)
  if (epochEng) {
    // Try to get concepts from fallback if it exists (even partial)
    const concepts = fallback?.concepts || [];
    return {
      details: fallback?.details,
      lifeAndTimes: epochEng.lifeAndTimes,
      worldviewSummary: epochEng.worldviewSummary,
      quote: epochEng.quote,
      concepts,
      comparisons: epochEng.comparisons || [],
    };
  }

  // Case 3: Only fallback (complete translations in translationsEng.ts)
  if (fallback && fallback.lifeAndTimes && fallback.worldviewSummary) {
    return {
      details: fallback.details,
      lifeAndTimes: fallback.lifeAndTimes,
      worldviewSummary: fallback.worldviewSummary,
      quote: fallback.quote || '',
      reflectionQuestion: fallback.reflectionQuestion,
      concepts: fallback.concepts || [],
      comparisons: fallback.comparisons || [],
    };
  }

  // Case 4: Only partial fallback (details + concepts, no enriched fields)
  if (fallback && fallback.details) {
    return {
      details: fallback.details,
      lifeAndTimes: '',
      worldviewSummary: '',
      quote: '',
      concepts: fallback.concepts || [],
      comparisons: fallback.comparisons || [],
    };
  }

  // Case 5: No English data available
  return null;
}

/**
 * Check if a philosopher has complete English enriched data
 * (lifeAndTimes + worldviewSummary + quote all present).
 */
export function hasCompleteEnrichedEng(id: string): boolean {
  const eng = getEnrichedEng(id);
  if (!eng) return false;
  return !!(eng.lifeAndTimes && eng.worldviewSummary && eng.quote);
}

/**
 * Get all philosopher IDs that have English enriched data.
 */
export function getPhilosopherIdsWithEng(): string[] {
  const ids = new Set<string>();
  Object.keys(epochEngMerged).forEach(id => ids.add(id));
  Object.keys(philosopherFallbackTranslations).forEach(id => ids.add(id));
  return Array.from(ids);
}
