<template>
  <div class="layout-wrapper">
    <div class="background-wrapper">
      <Background
        ref="bgYoutube"
        @ready="youtubeReady"
        @playing="youtubePlaying"
      />
    </div>
    <div class="header">
      <div class="title">
        <nuxt-link to="/">glncy</nuxt-link>
      </div>
      <div class="nav" v-if="!isInitialScreenVisible && isYoutubePlaying">
        <div><nuxt-link to="/about">About</nuxt-link></div>
        <div><nuxt-link to="/projects">Projects</nuxt-link></div>
        <div><nuxt-link to="/contact">Contact</nuxt-link></div>
      </div>
    </div>
    <div class="body-wrapper">
      <transition name="fade">
        <template v-if="!isYoutubePlaying || isInitialScreenVisible">
          <InitialScreen
            :isLoading="isLoading"
            :bg="!isYoutubePlaying"
            @yes="playYoutubeWithAudio"
            @no="isInitialScreenVisible = false"
          />
        </template>
      </transition>
      <transition name="fade">
        <template v-if="isYoutubePlaying && !isInitialScreenVisible">
          <Nuxt />
        </template>
      </transition>
    </div>
    <div class="footer" v-if="!isInitialScreenVisible && isYoutubePlaying">
      <div class="prev">
        <div class="caret"></div>
        <div class="caret caret-2"></div>
      </div>
      <div class="volume">
        <div class="mute" @click="unMute()" v-if="isYoutubeMuted"></div>
        <div class="unmute" @click="mute()" v-else></div>
      </div>
      <div class="next" @click="bgYoutube.changeVideo()">
        <div class="caret right"></div>
        <div class="caret right-2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InitialScreen from '~/components/InitialScreen.vue'

declare module 'vue/types/vue' {
  interface Vue {
    $nuxt: any
    isYoutubeReady: boolean
  }
}

export default Vue.extend({
  data() {
    return {
      isYoutubePlaying: false,
      isYoutubeMuted: true,
      isYoutubeReady: false,
      isInitialScreenVisible: true,
    }
  },
  methods: {
    unMute() {
      this.isYoutubeMuted = false
      this.bgYoutube.unMute()
    },
    mute() {
      this.isYoutubeMuted = true
      this.bgYoutube.mute()
    },
    youtubeReady() {
      this.isYoutubeReady = true
    },
    playYoutubeWithAudio() {
      this.isYoutubeMuted = false
      this.isInitialScreenVisible = false
      this.bgYoutube.replayVideoWithAudio()
    },
    youtubePlaying() {
      this.isYoutubePlaying = true
    },
  },
  computed: {
    bgYoutube() {
      const bgYoutube: any = this.$refs.bgYoutube
      return bgYoutube
    },
    currentPage() {
      return this.$nuxt.$route
    },
    isLoading() {
      return !this.isYoutubeReady
    },
  },
  components: { InitialScreen },
})
</script>

<style lang="postcss" scoped>
.layout-wrapper {
  @apply w-screen h-screen overflow-x-hidden;

  > .background-wrapper {
    @apply absolute z-0 pointer-events-none;
  }

  > .header {
    @apply fixed z-20 w-full;

    > .title {
      @apply flex flex-col items-center justify-center relative z-10 text-4xl text-gray-200 mt-3;
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      font-style: italic;
    }

    > .nav {
      @apply flex flex-row items-center justify-center relative z-10 text-lg text-gray-200 mt-2;
      font-family: 'Playfair Display', serif;
      font-weight: 400;

      > div {
        @apply mr-5;
        transition: all 0.1s ease-in-out;

        &:last-child {
          @apply mr-0;
        }

        &:hover {
          @apply text-gray-100;
          transform: scale(1.2);
        }
      }
    }
  }

  > .body-wrapper {
    @apply relative top-0 left-0 w-screen h-screen z-10;
  }

  > .footer {
    @apply fixed bottom-8 left-0 w-full text-center text-gray-200 z-20 flex flex-row items-center justify-center;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;

    > .volume {
      @apply cursor-pointer;
      transform: scale(1.8);

      > .unmute {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-volume-up-fill' viewBox='0 0 16 16'%3E%3Cpath d='M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z'/%3E%3Cpath d='M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z'/%3E%3Cpath d='M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z'/%3E%3C/svg%3E");
        width: 16px;
        height: 16px;
      }

      > .mute {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-volume-mute-fill' viewBox='0 0 16 16'%3E%3Cpath d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
        width: 16px;
        height: 16px;
      }
    }

    > .prev,
    .next {
      @apply flex flex-row items-center justify-center cursor-pointer;
    }

    > .prev {
      @apply mr-8;
    }

    > .next {
      @apply ml-8;
    }

    .caret {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-caret-left-fill' viewBox='0 0 16 16'%3E%3Cpath d='m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z'/%3E%3C/svg%3E");
      width: 16px;
      height: 16px;

      &.caret-2 {
        margin-left: -8px;
      }

      &.right {
        transform: rotate(180deg);
      }

      &.right-2 {
        transform: rotate(180deg);
        margin-left: -8px;
      }
    }
  }
}
</style>
