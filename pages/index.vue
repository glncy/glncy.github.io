<template>
  <div class="page-wrapper">
    <div class="name">Glency Tirao</div>
    <div class="short-description">web developer / web design / mobile developer</div>
    <div class="cta">About Me <div class="arrow-right"></div></div>
  </div>
</template>

<style lang="postcss" scoped>
.page-wrapper {
  @apply flex flex-col w-full h-full items-center justify-center;
}
.name {
  @apply text-5xl text-gray-200 text-center;
  font-family: 'Playfair Display', serif;
  font-weight: 500;

  @screen md {
    @apply text-8xl
  }
}

.short-description {
  @apply text-sm text-gray-200 text-center mt-3;
  font-family: 'Playfair Display', serif;
  font-weight: 200;

  @screen md {
    @apply text-xl mt-5
  }
}

.cta {
  @apply text-base text-gray-200 text-center mt-5 py-1 px-2 rounded-md cursor-pointer flex flex-row items-center justify-center;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  backdrop-filter: blur(1px);
  background: rgba(255, 255, 255, 0.05);
  border: 0.05px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease-in-out;

  @screen md {
    @apply text-lg py-2 px-3;

    &:hover {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  > .arrow-right {
    @apply ml-2;
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-arrow-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/%3E%3C/svg%3E");
  }
}
</style>

<script lang="ts">
export default {
  layout: 'default',
  name: 'IndexPage',
}
</script>
