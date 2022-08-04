<template>
  <div class="page-wrapper">
    <title-box
      v-if="error.statusCode === 404"
      title="Page not found"
      subTitle="Uh oh. Looks like I don't have this page yet."
    />
    <title-box
      v-else
      title="An error occurred"
      subTitle="Uh oh. Sorry. Don't worry, I'll get it fixed soon."
    />
    <nuxt-link to="/">
      <div class="cta">
        Back to Home
        <div class="arrow-right"></div>
      </div>
    </nuxt-link>
  </div>
</template>

<style lang="postcss" scoped>
.page-wrapper {
  @apply flex flex-col w-full h-full items-center justify-center;
}
</style>

<script lang="ts">
export default {
  props: ['error'],
}
</script>
