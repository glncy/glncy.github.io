<template>
  <div
    class="page-wrapper"
    :class="{
      'bg-loading': bg,
    }"
  >
    <template v-if="showMessage">
      <template v-if="isLoading">
        <div class="loading">Loading...</div>
      </template>
      <template v-else>
        <div class="message">Hi! Wanna listen to musics?</div>
        <div class="choices">
          <div class="cta" @click="yes">Sure!</div>
          <div class="cta" @click="no">No, thanks</div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="loading">Loading...</div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    isLoading: {
      type: Boolean,
    },
    bg: {
      type: Boolean,
    },
  },
  data() {
    return {
      showMessage: true,
    }
  },
  methods: {
    yes() {
      this.showMessage = false
      this.$emit('yes')
    },
    no() {
      this.showMessage = false
      this.$emit('no')
    },
  },
})
</script>

<style lang="postcss" scoped>
.page-wrapper {
  @apply flex flex-col w-full h-full items-center justify-center fixed;
  z-index: 3;

  &.bg-loading {
    @apply bg-black;
  }
}

.name {
  @apply text-5xl text-gray-200 text-center;
  font-family: 'Playfair Display', serif;
  font-weight: 500;

  @screen md {
    @apply text-8xl;
  }
}

.message {
  @apply text-2xl text-gray-200 text-center mt-3;
  font-family: 'Playfair Display', serif;
  font-weight: 400;

  @screen md {
    @apply text-2xl mt-5;
  }
}

.loading {
  @apply text-2xl text-gray-200 text-center;
  font-family: 'Playfair Display', serif;
  font-weight: 200;
}

.choices {
  @apply flex flex-row items-center justify-between mt-1;

  > .cta {
    &:nth-child(1) {
      @apply mr-1;
    }

    &:nth-child(2) {
      @apply ml-1;
    }
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
  min-width: 100px;

  @screen md {
    @apply text-lg py-2 px-3;

    &:hover {
      backdrop-filter: blur(5px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
