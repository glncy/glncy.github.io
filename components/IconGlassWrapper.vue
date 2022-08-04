<template>
  <div class="icon-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.icon-wrapper {
  @apply rounded-full h-24 w-24 flex items-center justify-center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  > i {
    @apply text-5xl;
  }
}
</style>
