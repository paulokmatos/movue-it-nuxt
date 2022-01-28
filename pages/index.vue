<template>
  <section
    class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20"
  >
    <div class="flex flex-col w-full lg:w-1/2">
      <Profile />
      <CompletedChallenges />
      <Countdown @completed="getNewChallenge" />
      <button v-if="hasCountDownCompleted" disabled class="button completed">
        Cycle completed
      </button>
      <button
        v-else-if="isCountDownActive"
        class="button abandon"
        @click="setCountDownState(false)"
      >
        Abandon cycle
      </button>
      <button v-else class="button start" @click="setCountDownState(true)">
        Start a cycle
      </button>
    </div>
    <Card id="challenge" class="w-full lg:w-1/2" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Mutations as CountdownMT } from '~/store/Countdown/types'
import { Mutations as ChallengesMT } from '~/store/Challenges/types'

import CompletedChallenges from '~/components/atoms/CompletedChallenges.vue'
import Profile from '~/components/molecules/Profile.vue'
import Countdown from '~/components/molecules/Countdown.vue'
import Card from '~/components/organisms/Card.vue'

import {
  playAudio,
  sendNotifications,
  getRandomNumber,
  scrollToElement,
} from '~/utils'

export interface Head {
  title: string
}

export default Vue.extend({
  name: 'IndexPage',
  head(): Head {
    return {
      title: 'Home | Movue-it',
    }
  },
  components: {
    CompletedChallenges,
    Countdown,
    Profile,
    Card,
  },
  mounted() {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  },
  computed: {
    ...mapState('Countdown', {
      hasCountDownCompleted: 'hasCompleted',
      isCountDownActive: 'isActive',
    }),
    ...mapGetters('Challenges', ['challengesLength']),
  },
  methods: {
    ...mapMutations({
      setCountDownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED}`,
      setCountDownIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE}`,
      setCurrentChallengeIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX}`,
    }),
    setCountDownState(flag: boolean) {
      this.setCountDownHasCompleted(false), this.setCountDownIsActive(flag)
    },
    getNewChallenge() {
      const index = getRandomNumber(0, this.challengesLength)
      this.setCountDownHasCompleted(true)
      this.setCurrentChallengeIndex(index)

      if (Notification?.permission === 'granted') {
        playAudio('/notification.mp3')
        sendNotifications('New challenge!', {
          body: 'A new challenge has started! Go complete it!',
          icon: '/favicon.png',
        })

        this.$nextTick(() => {
          scrollToElement('#challenge')
        })
      }
    },
  },
})
</script>
