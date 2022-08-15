<template>
  <div class="page-section">
    <div class="information-wrapper">
      <img src="~/assets/img/profile-picture.png" />
      <div class="information">
        Hi! I'm <span class="bold">Glency Tirao</span>, a
        <span class="bold">Software Engineer</span> from
        <span class="bold">Philippines</span>. I also love working with
        <span class="bold">Designs and Multimedia</span> as I have studied
        <span class="bold">Bachelor of Science in Information Technology</span>,
        major in <span class="bold">Animation</span> at
        <span class="bold">PHINMA - University of Pangasinan</span>.
        <br />
        <br />
        Since I was a kid up to my teenage years, my hobby was making drawings
        and paintings. That got my interest in working on Arts and Designs. I
        explored working my hobby on computers and discovered various software
        like Photoshop. That made me decide to take Animation Course when I
        graduated from middle school.
        <br />
        <br />
        During my college years, I discovered programming since it was a part of
        my Course Curriculum. I love working on codes and algorithms. I kept
        studying and practicing programming until I got a small project to work
        on it. I kept doing that project while studying Animation. Aside from
        studying Animation, I got the chance to learn Music Production and Video
        Editing.
        <br />
        <br />
        By now, I am passionate and dedicated to working on Software Engineering
        Technologies. I love to work on Web and Mobile Applications. And as a
        design person, I can collaborate to add insights for UI/UX Designs and
        help improve Frontend developments. In terms of Backend Development, I
        love to create functions for processing data, setting up servers and
        make reusable APIs.
        <br />
        <br />
        During my free time, I play games. I am currently playing The Legend of
        Zelda and Sky: Children of the Light. I also draw to my small notebook
        beside my desk and studying Piano.
        <br />
        <br />
        Wanna know more? Scroll to see what skills I have and My Job History. :)
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-section {
  @apply mb-10;

  > .information-wrapper {
    @apply flex flex-col items-center;

    @screen xl {
      @apply flex flex-row items-start;
    }

    > img {
      @apply w-40 h-40 rounded-full mb-4;

      @screen xl {
        @apply w-56 h-56 mb-0;
      }
    }

    > .information {
      @apply text-base text-gray-200 p-3 rounded-lg;
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(8px);
      border: 0.5px solid rgba(255, 255, 255, 0.2);

      @screen xl {
        @apply text-lg ml-8 p-4;
      }

      > .bold {
        @apply text-lg;
        font-weight: 600;

        @screen xl {
          @apply text-xl;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
})
</script>
