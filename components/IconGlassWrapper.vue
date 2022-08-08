<template>
  <div class="icon-wrapper">
    <i :class=[classIcon] v-if="classIcon"></i>
    <!-- TODO: img -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    classIcon: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      default: null,
    },
  },
})
</script>

<style lang="postcss" scoped>
.icon-wrapper {
  @apply rounded-full h-24 w-24 flex items-center justify-center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.1s ease-in-out;

  > i {
    @apply text-5xl text-white;
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1.5px solid rgba(255, 255, 255, 0.3);

    > i {
      transform: scale(1.1);
    }
  }
}
</style>
