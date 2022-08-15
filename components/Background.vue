<template>
  <div class="bg-wrapper">
    <div class="videoContainer">
      <div class="youtubeWrapper" ref="youtubeWrapper">
        <youtube
          :video-id="videoId"
          :player-vars="playerVars"
          @ready="youtubeReady"
          @ended="youtubeEnded"
          @paused="youtubePaused"
          @cued="youtubeCued"
          @buffering="youtubeBuffering"
          @playing="youtubePlaying"
          @error="youtubeError"
          ref="youtube"
          :resize="true"
          :fitParent="true"
          :nocookie="true"
        />
      </div>
    </div>
    <transition name="fade">
      <div class="fallback-bg" v-if="!isYoutubePlaying"></div>
    </transition>
    <div class="noise-main-wrapper">
      <div class="noise-wrapper">
        <div class="noise"></div>
      </div>
    </div>
    <div class="overlay">
      <div class="line" v-for="i in 40" :key="i" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export interface youtubePlaylistItem {
  id: string
  title: string
  channel: string
  includeInRandom?: boolean
  asBackground?: boolean
}

export default Vue.extend({
  props: {
    youtubePlaylist: {
      type: Array as () => youtubePlaylistItem[],
      default: [],
    },
  },
  data() {
    return {
      isYoutubePlaying: false,
      videoId: '8nXqcugV2Y4',
      playerVars: {
        playlist: '8nXqcugV2Y4',
        autoplay: 1,
        controls: 0,
        mute: 1,
        showinfo: 0,
        loop: 1,
        rel: 0,
      },
    }
  },
  mounted() {
    const randomVideoList = this.youtubePlaylist.filter(item => item.includeInRandom)
    const randomVideo = randomVideoList[Math.floor(Math.random() * randomVideoList.length)]
    this.videoId = randomVideo.id
    this.playerVars.playlist = randomVideo.id
    this.loadVideo(randomVideo)
    this.onHeightChange()
    window.addEventListener('resize', this.onHeightChange)
  },
  destroyed() {
    window.removeEventListener('resize', this.onHeightChange)
  },
  methods: {
    onHeightChange() {
      const height = window.innerHeight
      const youtubeWrapper: any = this.$refs.youtubeWrapper
      youtubeWrapper.style.width = height * 2.1 + 'px'
    },
    youtubePlaying() {
      this.isYoutubePlaying = true
      this.$emit('playing')
    },
    youtubeReady() {
      this.player.playVideo()
      this.$emit('ready', true)
    },
    youtubeEnded() {
      this.isYoutubePlaying = false
      this.changeVideo()
      this.$emit('ended')
    },
    youtubePaused() {
      this.isYoutubePlaying = false
      this.$emit('paused')
    },
    youtubeCued() {
      this.isYoutubePlaying = false
      this.$emit('cued')
    },
    youtubeBuffering(log: any) {
      this.isYoutubePlaying = false
      this.$emit('buffering')
    },
    youtubeError(error: any) {
      this.isYoutubePlaying = false
      this.$emit('error')
      this.changeVideo();
    },
    unMute() {
      this.player.unMute()
    },
    mute() {
      this.player.mute()
    },
    changeVideo(isIncrement = true) {
      const index = this.youtubePlaylist.findIndex(
        (item) => item.id === this.videoId
      )
      if (isIncrement) {
        if (index + 1 < this.youtubePlaylist.length) {
          this.videoId = this.youtubePlaylist[index + 1].id
          this.loadVideo(this.youtubePlaylist[index + 1])
        } else {
          this.videoId = this.youtubePlaylist[0].id
          this.loadVideo(this.youtubePlaylist[0])
        }
      } else {
        if (index - 1 >= 0) {
          this.videoId = this.youtubePlaylist[index - 1].id
          this.loadVideo(this.youtubePlaylist[index - 1])
        } else {
          this.videoId =
            this.youtubePlaylist[this.youtubePlaylist.length - 1].id
          this.loadVideo(this.youtubePlaylist[this.youtubePlaylist.length - 1])
        }
      }
    },
    async loadVideo(videoInformation: youtubePlaylistItem | undefined) {
      this.$emit('loadedVideo', {
        url: `https://www.youtube.com/watch?v=${this.videoId}`,
        title: videoInformation?.title ?? '',
        channel: videoInformation?.channel ?? '',
      })
      this.player.setLoop(true)
    },
    playVideo() {
      this.player.playVideo()
    },
    pauseVideo() {
      this.player.pauseVideo()
    },
    replayVideoWithAudio() {
      this.player.seekTo(0)
      this.player.playVideo()
      this.player.unMute()
      this.player.setVolume(80)
    },
  },
  computed: {
    player() {
      const youtube: any = this.$refs.youtube
      return youtube.player
    },
  },
})
</script>

<style lang="postcss" scoped>
.bg-wrapper {
  @apply h-screen w-screen relative;
}

.overlay {
  @apply w-screen h-screen absolute;
  overflow: hidden;
  z-index: 1;
  box-shadow: inset 0px 0px 200px 40px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.5);

  @screen md {
    box-shadow: inset 0px 0px 420px 120px rgba(0, 0, 0, 0.8);
  }

  > .line {
    @apply absolute;
    width: 100vw;
    opacity: 0.6;

    @for $i from 0 to 40 {
      &:nth-child($i) {
        --i: $i;
        --randomPercent: random(16, 24, {round: true})%;
        --randomHeight: random(2, 10, {round: true})px;
        --top: calc(200% - (var(--i) * var(--randomPercent)));
        --endTop: calc(100% - (var(--i) * var(--randomPercent)));
        top: var(--top);
        backdrop-filter: saturate(5) blur(10px);
        animation: lineGlitch 10s linear infinite;
        height: var(--randomHeight);
      }
    }
  }
}

@keyframes lineGlitch {
  0.1% {
    top: var(--top);
    opacity: 0;
  }
  0.2% {
    top: var(--top);
    opacity: 0.6;
  }
  50% {
    opacity: 0.6;
  }
  50.1% {
    opacity: 0;
  }
  55% {
    opacity: 0;
  }
  55.1% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.6;
  }
  70.1% {
    opacity: 0;
  }
  72% {
    opacity: 0;
  }
  72.1% {
    opacity: 0.6;
  }
  97% {
    opacity: 0.6;
  }
  97.1% {
    opacity: 0;
  }
  100% {
    top: var(--endTop);
    opacity: 0;
  }
}

.videoContainer {
  @apply w-screen h-screen overflow-hidden absolute bg-black;
  z-index: -1;

  > .youtubeWrapper {
    @apply absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.noise-main-wrapper {
  @apply w-screen h-screen absolute;
  z-index: 2;

  & > .noise-wrapper {
    @apply absolute top-0 left-0 w-full h-full overflow-hidden;
    z-index: 2;

    & > .noise {
      @apply absolute;
      top: -500px;
      right: -500px;
      bottom: -500px;
      left: -500px;
      background: transparent url('~assets/img/noise.png') 0 0;
      background-size: 320px;
      opacity: 0.3;
      animation: noiseAnimation 1s steps(8, end) infinite both;
    }
  }
}

@keyframes noiseAnimation {
  0% {
    transform: translateX(0px, 0px);
  }
  10% {
    transform: translate(-100px, 100px);
  }
  20% {
    transform: translate(150px, -100px);
  }
  30% {
    transform: translate(-100px, 100px);
  }
  40% {
    transform: translate(100px, -150px);
  }
  50% {
    transform: translate(-100px, 200px);
  }
  60% {
    transform: translate(-200px, -100px);
  }
  70% {
    transform: translateY(50px, 100px);
  }
  80% {
    transform: translate(100px, -150px);
  }
  90% {
    transform: translate(0px, 200px);
  }
  100% {
    transform: translate(-100px, 100px);
  }
}

.fallback-bg {
  @apply w-screen h-screen absolute;
  z-index: 0;
  background-color: #c399ff;
  background-image: radial-gradient(
      at 89% 54%,
      hsla(267, 66%, 74%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 3% 65%, hsla(77, 88%, 78%, 1) 0px, transparent 50%),
    radial-gradient(at 95% 18%, hsla(69, 63%, 71%, 1) 0px, transparent 50%),
    radial-gradient(at 1% 42%, hsla(104, 63%, 73%, 1) 0px, transparent 50%),
    radial-gradient(at 11% 38%, hsla(26, 91%, 71%, 1) 0px, transparent 50%),
    radial-gradient(at 94% 92%, hsla(220, 95%, 66%, 1) 0px, transparent 50%),
    radial-gradient(at 79% 75%, hsla(76, 66%, 76%, 1) 0px, transparent 50%);
}
</style>
