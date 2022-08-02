<template>
  <div class="wrapper">
    <div class="background">
      <Background ref="bgYoutube" />
    </div>
    <div class="header">
      <div class="title">
        <nuxt-link to="/">glncy</nuxt-link>
      </div>
      <div class="nav">
        <div><nuxt-link to="/about">About</nuxt-link></div>
        <div><nuxt-link to="/projects">Projects</nuxt-link></div>
        <div><nuxt-link to="/contact">Contact</nuxt-link></div>
      </div>
    </div>
    <Nuxt />
    <div class="footer">
      <div>
        <div @click="unMute()" v-if="isYoutubeMuted">Unmute</div>
        <div @click="mute()" v-else>Mute</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isYoutubeMuted: true,
    }
  },
  methods: {
    unMute() {
      this.isYoutubeMuted = false
      const bgYoutube: any = this.$refs.bgYoutube
      bgYoutube.unMute()
    },
    mute() {
      this.isYoutubeMuted = true
      const bgYoutube: any = this.$refs.bgYoutube
      bgYoutube.mute()
    },
  },
})
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply w-screen h-screen overflow-x-hidden;
}

.background {
  @apply absolute z-0 pointer-events-none;
}

.header {
  @apply fixed w-full;

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

.footer {
  @apply fixed bottom-0 left-0 w-full h-12 text-center text-gray-200;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
}
</style>
