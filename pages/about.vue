<template>
  <div class="page-wrapper">
    <div class="header-section">
      <title-box
        title="About"
        subTitle="Hi! Let me introduce myself to you."
      />
      <div class="action">Scroll Down</div>
      <div class="down-arrow"></div>
    </div>
    <SkillsSection />
  </div>
</template>

<style lang="postcss" scoped>
.page-wrapper {
  @apply pb-40;
}

.header-section {
  @apply flex flex-col w-full h-screen items-center justify-center;

  > .action {
    @apply absolute text-sm text-gray-200;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    margin-top: 38vh;
    opacity: 0.8;

    @screen md {
      margin-top: 48vh;
    }
  }

  > .down-arrow {
    @apply absolute;

    --startPosition: 12vh;
    --endPosition: 13vh;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-arrow-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'/%3E%3C/svg%3E");
    width: 16px;
    height: 16px;
    transform: scale(2) translateY(var(--startPosition));
    opacity: 0.8;
    animation: downArrowAnimation 2s infinite ease-in-out;

    @screen md {
      --startPosition: 14vh;
      --endPosition: 16vh;
    }

    @keyframes downArrowAnimation {
      0% {
        transform: scale(2) translateY(var(--startPosition));
        opacity: 0;
      }
      20% {
        opacity: 0.5;
      }
      60% {
        transform: scale(2) translateY(var(--endPosition));
      }
      100% {
        transform: scale(2) translateY(var(--endPosition));
        opacity: 0;
      }
    }
  }
}
</style>

<script lang="ts">
import TitleBox from '~/components/TitleBox.vue'
import SkillsSection from '~/components/sections/about/SkillsSection.vue'

export default {
  layout: 'default',
  name: 'AboutPage',
  components: {
    TitleBox,
    SkillsSection
}
}
</script>
