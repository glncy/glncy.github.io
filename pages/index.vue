<template>
  <div class="page-wrapper">
    <title-box
      title="Glency Tirao"
      subTitle="web & mobile developer | designs & multimedia"
    />
    <nuxt-link to="/about">
      <div class="cta">
        About Me
        <div class="arrow-right"></div>
      </div>
    </nuxt-link>
  </div>
</template>

<style lang="postcss" scoped>
.page-wrapper {
  @apply flex flex-col w-screen h-screen items-center justify-center;
}
</style>

<script lang="ts">
export default {
  layout: 'default',
  name: 'IndexPage',
}
</script>
