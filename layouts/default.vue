<template>
  <div class="layout-wrapper">
    <div class="background-wrapper">
      <Background
        ref="bgYoutube"
        @ready="youtubeReady"
        @playing="youtubePlaying"
        @paused="youtubePaused"
        @ended="youtubeEnded"
        @loadedVideo="setCurrentlyPlaying"
        :youtubePlaylist="youtubePlaylist"
      />
    </div>
    <div class="header">
      <div class="title">
        <nuxt-link to="/">glncy</nuxt-link>
      </div>
      <div class="nav" v-if="currentPage.name !== 'index'">
        <div><nuxt-link to="/about">About</nuxt-link></div>
        <div><nuxt-link to="/projects">Projects</nuxt-link></div>
        <div><nuxt-link to="/contact">Contact</nuxt-link></div>
      </div>
    </div>
    <div class="body-wrapper">
      <Nuxt />
    </div>
    <div class="footer">
      <div
        class="playerControlsWrapper"
        v-if="isYoutubeReady"
        :class="{
          'player-hide': !isFirstLoad && isYoutubePlaying,
          'player-title-hide': isControllerIdle,
        }"
      >
        <div
          class="video-info cursor-pointer"
          v-if="!isFirstLoad"
          @click="openYoutubeLink"
        >
          <template v-if="isYoutubePlaying">
            <div class="title">{{ currentlyPlaying.title }}</div>
            <div class="channel">{{ currentlyPlaying.channel }}</div>
          </template>
        </div>
        <div class="video-info" v-else>
          <div class="title pb-4">Click Speaker to Listen</div>
        </div>
        <div class="playerControls">
          <div class="prev" @click="changeVideo(false)">
            <div class="caret"></div>
            <div class="caret caret-2"></div>
          </div>
          <div class="videoState">
            <div class="pause" @click="pause()" v-if="isYoutubePlaying"></div>
            <div class="play" @click="play()" v-else></div>
          </div>
          <div class="volume">
            <div class="unmute" @click="unMute()" v-if="isYoutubeMuted"></div>
            <div class="mute" @click="mute()" v-else></div>
          </div>
          <div class="next" @click="changeVideo()">
            <div class="caret right"></div>
            <div class="caret right-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { youtubePlaylistItem } from '~/components/Background.vue'

declare module 'vue/types/vue' {
  interface Vue {
    $nuxt: any
    isYoutubeReady: boolean
    youtubePlaylist: youtubePlaylistItem[]
    controllerTimeInteracted: number
    playerControllerPolling: any
  }
}

export default Vue.extend({
  data() {
    return {
      isFirstLoad: true,
      isYoutubePlaying: false,
      isYoutubeMuted: true,
      isYoutubeReady: false,
      youtubePlaylist: [{}],
      controllerTimeInteracted: new Date().valueOf(),
      isControllerIdle: false,
      currentlyPlaying: {
        url: '',
        title: '',
        channel: '',
      },
      playerControllerPolling: null,
    }
  },
  created() {
    const result: Array<youtubePlaylistItem> = [
      {
        id: '8nXqcugV2Y4',
        title:
          '3:30 AM Coding Session - Lofi Hip Hop Mix [Study & Coding Beats]',
        channel: 'Lofi Ghostie',
      },
      {
        id: 'rzgITwK7GdM',
        title: 'Pegboard Nerds - Pink Cloud (feat. Max Collins)',
        channel: 'Monstercat Uncaged',
      },
      {
        id: 'ovrGzbsQZqc',
        title: 'Pegboard Nerds - Emoji VIP',
        channel: 'Monstercat Uncaged',
      },
    ]
    this.youtubePlaylist = result
    this.setPlayerControllerPolling()
  },
  methods: {
    setPlayerControllerPolling() {
      this.playerControllerPolling = setInterval(() => {
        if (new Date().valueOf() - this.controllerTimeInteracted > 5000) {
          this.isControllerIdle = true
        } else {
          this.isControllerIdle = false
        }
      }, 1000)
    },
    unMute() {
      this.isYoutubeMuted = false
      this.recordControllerTimeInteracted()
      if (this.isFirstLoad) {
        this.bgYoutube.replayVideoWithAudio()
        this.isFirstLoad = false
        return
      }
      this.bgYoutube.unMute()
    },
    mute() {
      this.isYoutubeMuted = true
      this.bgYoutube.mute()
      this.recordControllerTimeInteracted()
    },
    play() {
      this.isYoutubePlaying = true
      this.bgYoutube.playVideo()
      this.recordControllerTimeInteracted()
    },
    pause() {
      this.isYoutubePlaying = false
      this.bgYoutube.pauseVideo()
      this.recordControllerTimeInteracted()
    },
    changeVideo(isNext: boolean = true) {
      this.bgYoutube.changeVideo(isNext)
      this.recordControllerTimeInteracted()
    },
    recordControllerTimeInteracted() {
      this.isControllerIdle = false
      this.controllerTimeInteracted = new Date().valueOf()
    },
    youtubeReady() {
      this.isYoutubeReady = true
    },
    youtubePlaying() {
      this.isYoutubePlaying = true
    },
    youtubePaused() {
      this.isYoutubePlaying = false
    },
    youtubeEnded() {
      this.isYoutubePlaying = false
    },
    setCurrentlyPlaying(obj: { url: string; title: string; channel: string }) {
      this.currentlyPlaying = obj
    },
    openYoutubeLink() {
      window.open(this.currentlyPlaying.url, '_blank')
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
  },
  beforeDestroy() {
    clearInterval(this.playerControllerPolling)
  },
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
      @apply flex flex-row items-center justify-center relative z-10 text-base text-gray-200 mt-4;
      font-family: 'Poppins', sans-serif;
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
    @apply fixed bottom-4 left-0 w-full text-center text-gray-200 z-20 flex flex-col justify-center items-center;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;

    > .playerControlsWrapper {
      @apply flex flex-col justify-center items-center p-3 rounded-lg;
      width: fit-content;
      background-color: rgba(0, 0, 0, 0.1);
      border: 0.05px solid rgba(0, 0, 0, 0.2);

      &.player-hide {
        @screen lg {
          @apply top-12 relative;
          transition: all 0.1s ease-in-out;

          &:hover {
            @apply top-0;
          }
        }
      }

      &.player-title-hide {
        > .video-info.cursor-pointer {
          @apply hidden;

          @screen md {
            @apply block;
          }
        }
      }

      > .video-info {
        > .title {
          @apply text-xs text-gray-200;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          max-width: 28ch;
        }

        > .channel {
          @apply text-xs text-gray-200 mt-1 mb-4;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
        }
      }

      > .playerControls {
        @apply flex flex-row w-full justify-center items-center;

        > .volume {
          @apply cursor-pointer ml-5;
          transform: scale(2.2);

          @screen lg {
            @apply cursor-pointer ml-4;
            transform: scale(1.8);
          }

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

        > .videoState {
          @apply cursor-pointer mr-5;
          transform: scale(2.4);

          @screen lg {
            @apply cursor-pointer mr-4;
            transform: scale(1.8);
          }

          > .play {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-play-fill' viewBox='0 0 16 16'%3E%3Cpath d='m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z'/%3E%3C/svg%3E");
            width: 16px;
            height: 16px;
          }

          > .pause {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-pause-fill' viewBox='0 0 16 16'%3E%3Cpath d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z'/%3E%3C/svg%3E");
            width: 16px;
            height: 16px;
          }
        }

        > .prev,
        .next {
          @apply flex flex-row items-center justify-center cursor-pointer;
        }

        > .prev {
          @apply mr-10;
          transform: scale(1.8);

          @screen lg {
            @apply mr-8;
            transform: none;
          }
        }

        > .next {
          @apply ml-10;
          transform: scale(1.8);

          @screen lg {
            @apply ml-8;
            transform: none;
          }
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
  }
}
</style>
