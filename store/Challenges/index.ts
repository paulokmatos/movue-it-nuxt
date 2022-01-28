import { State } from './types'
import allChallenges from '~/assets/challenges/data'

export const state = (): State => ({
  level: 1,
  xp: {
    start: 0,
    current: 0,
    end: 64,
  },
  completedChallenges: 0,
  currentChallengeIndex: null,
  isLevelUpModalOpen: false,
  allChallenges,
})
