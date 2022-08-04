<template>
  <div class="page-wrapper">
    <div class="section">
      <IconGlassWrapper>
        <i class="devicon-javascript-plain colored"/>
      </IconGlassWrapper>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.section {
  @apply flex flex-col w-full h-screen items-center justify-center;
}
</style>

<script lang="ts">
import IconGlassWrapper from "~/components/IconGlassWrapper.vue";
export default { components: { IconGlassWrapper } }
</script>
