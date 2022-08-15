<template>
  <div class="page-wrapper">
    <title-box title="Contact" subTitle="How can I help you today? Feel free to message me." />
    <div class="cta-section">
      <a href="mailto:glency.a.tirao@gmail.com">
        <div class="cta">
          <i class="bi bi-envelope mr-2"></i>
          glency.a.tirao@gmail.com
        </div>
      </a>
      <a href="https://www.linkedin.com/in/glency-tirao" target="_blank">
        <div class="cta">
          <i class="bi bi-linkedin mr-2"></i>
          LinkedIn
        </div>
      </a>
      <a href="https://m.me/glencytirao1999" target="_blank">
        <div class="cta">
          <i class="bi bi-messenger mr-2"></i>
          Messenger
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-wrapper {
  @apply flex flex-col w-screen h-screen items-center justify-center;

  > .cta-section {
    @apply mt-3 max-w-xs flex justify-center flex-wrap;

    > a {
      @apply mr-3 mt-3;

      > .cta {
        @apply text-base;
      }
    }

    @screen md {
      @apply max-w-2xl;
    }
  }
}
</style>

<script lang="ts">
import TitleBox from '~/components/TitleBox.vue'

export default {
  layout: 'default',
  name: 'ContactPage',
  components: {
    TitleBox,
  },
}
</script>
