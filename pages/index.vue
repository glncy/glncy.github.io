<template>
  <div>
    <!-- <div class="name">Glency Tirao</div>
    <nuxt-link to="/about">About</nuxt-link> -->
  </div>
</template>
<style lang="postcss" scoped>
.wrapper {
  @apply w-screen h-screen overflow-x-hidden;
}

.background {
  @apply absolute z-0 pointer-events-none;
}
.title {
  @apply flex flex-col items-center justify-center relative z-10 text-2xl text-gray-200 m-4;
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
}

.body-wrapper {
  @apply relative top-0 left-0 w-screen h-screen;
}

.name {
  @apply relative z-10 text-4xl text-gray-200;
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
}
</style>

<script lang="ts">
export default {
  layout: 'default',
  name: 'IndexPage',
}
</script>
