import { Philosopher } from '../types';
import { enrichedEpoch1 } from './enrichedEpoch1';
import { enrichedEpoch2 } from './enrichedEpoch2';
import { enrichedEpoch3 } from './enrichedEpoch3';
import { enrichedEpoch4 } from './enrichedEpoch4';
import { enrichedEpoch5 } from './enrichedEpoch5';
import { enrichedEpoch6 } from './enrichedEpoch6';
import { enrichedEpoch7 } from './enrichedEpoch7';

export const enrichedDetails: Record<string, Partial<Philosopher>> = {
  ...enrichedEpoch1,
  ...enrichedEpoch2,
  ...enrichedEpoch3,
  ...enrichedEpoch4,
  ...enrichedEpoch5,
  ...enrichedEpoch6,
  ...enrichedEpoch7,
};
