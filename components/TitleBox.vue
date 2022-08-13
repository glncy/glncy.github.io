<template>
  <div class="title-wrapper">
    <div class="title">{{ title }}</div>
    <div class="sub-title">{{ subTitle }}</div>
  </div>
</template>

<style lang="postcss" scoped>
.title-wrapper {
  @apply flex flex-col items-center justify-center p-8 w-full;
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;

  @screen md {
    @apply rounded-md w-auto;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(0, 0, 0, 0);
      border: 1px solid rgba(255, 255, 255, 0);
      backdrop-filter: blur(4px);
    }
  }

  > .title {
    @apply text-5xl text-gray-200 text-center;
    font-family: 'Playfair Display', serif;
    font-weight: 500;

    @screen md {
      @apply text-8xl;
    }
  }

  .sub-title {
    @apply text-sm text-gray-200 text-center mt-2;
    font-family: 'Poppins', sans-serif;
    font-weight: 200;

    @screen md {
      @apply text-xl mt-4;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
})
</script>
