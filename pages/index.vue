<template>
  <div class="page-wrapper">
    <title-box
      title="Glency Tirao"
      subTitle="web & mobile developer | designs & multimedia"
    />
    <div class="cta-section">
      <nuxt-link to="/about">
        <div class="cta">
          About Me
          <div class="arrow-right"></div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-wrapper {
  @apply flex flex-col w-screen h-screen items-center justify-center;

  > .cta-section {
    @apply mt-6;
  }
}
</style>

<script lang="ts">
export default {
  layout: 'default',
  name: 'IndexPage',
}
</script>
