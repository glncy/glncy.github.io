<template>
  <div class="bg-wrapper">
    <div class="noise-main-wrapper">
      <div class="noise-wrapper">
        <div class="noise"></div>
      </div>
    </div>
    <div class="overlay">
      <div class="line" v-for="i in 40" :key="i" />
    </div>
    <div class="videoContainer">
      <div class="youtubeWrapper" ref="youtubeWrapper">
        <youtube
          :video-id="videoId"
          :player-vars="playerVars"
          @playing="playing"
          ref="youtube"
          :resize="true"
          :fitParent="true"
          :nocookie="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      videoId: 'rUxyKA_-grg',
      playerVars: {
        playlist: 'rUxyKA_-grg',
        autoplay: 1,
        controls: 0,
        mute: 1,
        showinfo: 0,
        loop: 1,
      },
    }
  },
  mounted() {
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
    playing() {
      console.log('o/ we are watching!!!')
    },
    unMute() {
      this.player.unMute()
    },
    changeVideo() {
      const newVideo = 'p6xqKJqsQWs'
      this.player.loadVideoById(newVideo)
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
  box-shadow: inset 0px 0px 200px 40px #000;

  @screen md {
    box-shadow: inset 0px 0px 480px 120px #000;
  }

  > .line {
    @apply absolute;
    width: 100vw;
    opacity: 0.6;

    @for $i from 0 to 40 {
      &:nth-child($i) {
        --i: $i;
        --randomPercent: random(16, 24, {round: true})%;
        --top: calc(200% - (var(--i) * var(--randomPercent)));
        --endTop: calc(100% - (var(--i) * var(--randomPercent)));
        top: var(--top);
        backdrop-filter: saturate(5) blur(10px);
        animation: lineGlitch 10s linear infinite;
        height: random(2, 10, {round: true})px;
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
  z-index: 0;

  & > .noise-wrapper {
    @apply absolute top-0 left-0 w-full h-full overflow-hidden;
    z-index: 0;

    &:after {
      @apply absolute top-0 left-0 right-0 bottom-0;
      content: '';
      background: radial-gradient(
        ellipse at center,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.75) 100%
      );
    }

    & > .noise {
      @apply absolute;
      top: -500px;
      right: -500px;
      bottom: -500px;
      left: -500px;
      background: transparent
        url(https://www.dropbox.com/s/h7ab1c82ctzy83n/noise.png?raw=1) 0 0;
      background-size: 320px 320px;
      opacity: 0.35;
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
</style>
