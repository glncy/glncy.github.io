<template>
  <div class="wrapper">
    <Background/>
  </div>
</template>
<style lang="postcss" scoped>
.wrapper {
  @apply w-screen h-screen;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
