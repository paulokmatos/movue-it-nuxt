import { State } from './types';
import allChallenges from "~/assets/challenges/data"


export const state = ():State => ({
  level: 9,
  xp: {
    start: 0,
    current: 10,
    end: 64
  },
  completedChallenges: 4,
  currentChallengeIndex: null,
  isLevelUpModalOpen: false,
  allChallenges,
})
