<template>
  <div class="page-section">
    <div class="header">Skills</div>
    <div class="divider" />
    <div v-for="(skill, index) in skills" :key="index" class="skills-wrapper">
      <div class="skills-title">{{ skill.category }}</div>
      <div class="skills-list">
        <div
          v-for="(item, index) in skill.list"
          :key="index"
          class="skill-item"
        >
          <IconGlassWrapper 
            :classIcon="item.className"
            :img="item.img"
          />
          <div class="skill-name" v-html="item.name"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-section {
  @apply mb-10;
  
  > .divider {
    @apply w-full my-4;
    height: 0.2px;
    background: rgba(255, 255, 255, 0.5);
  }
  > .header {
    @apply text-6xl text-gray-200;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    width: fit-content;
  }

  > .skills-wrapper {
    @apply mb-4;

    > .skills-title {
      @apply text-xl text-gray-200 mb-4;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      width: fit-content;
    }

    > .skills-list {
      @apply grid grid-cols-3 gap-2;

      @screen md {
        @apply grid grid-cols-5 gap-2;
      }

      @screen lg {
        @apply grid grid-cols-6 gap-2;
      }

      @screen xl {
        @apply grid grid-cols-8 gap-4;
      }

      > .skill-item {
        @apply flex flex-col items-center;

        > .skill-name {
          @apply text-base text-gray-200 mt-2 text-center;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          white-space: nowrap;
        }
      }
    }

    &:last-child {
      @apply mb-0;
    }
  }
}
</style>
<script lang="ts">
import Vue from 'vue'
import IconGlassWrapper from '~/components/IconGlassWrapper.vue'

export default Vue.extend({
  components: {
    IconGlassWrapper,
  },
  data() {
    return {
      skills: [
        {
          category: 'Core Languages',
          list: [
            {
              className: 'devicon-javascript-plain',
              name: 'JavaScript',
            },
            {
              className: 'devicon-typescript-plain',
              name: 'TypeScript',
            },
            {
              className: 'devicon-python-plain',
              name: 'Python',
            },
            {
              className: 'devicon-php-plain',
              name: 'PHP',
            },
            {
              className: 'devicon-dart-plain',
              name: 'Dart',
            }
          ],
        },
        {
          category: 'Frontend Development',
          list: [
            {
              className: 'devicon-html5-plain',
              name: 'HTML',
            },
            {
              className: 'devicon-css3-plain',
              name: 'CSS',
            },
            {
              className: 'devicon-sass-original',
              name: 'SASS',
            },
            {
              className: 'devicon-tailwindcss-plain',
              name: 'Tailwind',
            },
            {
              className: 'devicon-jquery-plain-wordmark',
              name: 'jQuery',
            },
            {
              className: 'devicon-bootstrap-plain',
              name: 'Bootstrap',
            },
            {
              className: 'devicon-vuejs-plain',
              name: 'Vue.js',
            },
            {
              className: 'devicon-react-original',
              name: 'React',
            },
            {
              className: 'devicon-nextjs-plain',
              name: 'Next.js',
            },
            {
              className: 'devicon-nuxtjs-plain',
              name: 'Nuxt.js',
            },
            {
              img: '/img/cordova-icon.png',
              name: 'Cordova',
            },
            {
              className: 'devicon-ionic-original',
              name: 'Ionic',
            },
            {
              className: 'devicon-flutter-plain',
              name: 'Flutter',
            }
          ],
        },
        {
          category: 'Backend Development',
          list: [
            {
              className: 'devicon-nodejs-plain',
              name: 'Node.js',
            },
            {
              className: 'devicon-django-plain',
              name: 'Django',
            },
            {
              className: 'devicon-express-original',
              name: 'Express',
            },
            {
              className: 'devicon-mysql-plain',
              name: 'MySQL',
            },
            {
              className: 'devicon-amazonwebservices-plain',
              name: 'AWS',
            },
            {
              className: 'devicon-firebase-plain',
              name: 'Firebase',
            },
            {
              className: 'devicon-heroku-plain',
              name: 'Heroku',
            },
            {
              className: 'devicon-docker-plain',
              name: 'Docker',
            },
            {
              className: 'devicon-digitalocean-plain',
              name: 'Digital Ocean',
            },
            {
              className: 'devicon-bash-plain',
              name: 'Bash',
            },
          ],
        },
        {
          category: 'Version Control System and CI/CD',
          list: [
            {
              className: 'devicon-git-plain',
              name: 'Git',
            },
            {
              className: 'devicon-github-plain',
              name: 'Github<br/>Actions',
            },
            {
              className: 'devicon-gitlab-plain',
              name: 'Gitlab<br/>CI/CD',
            },
            {
              className: 'devicon-bitbucket-plain',
              name: 'Bitbucket',
            },
          ],
        },
        {
          category: 'Designs & Multimedia',
          list: [
            {
              className: 'devicon-figma-plain',
              name: 'Figma',
            },
            {
              className: 'devicon-photoshop-plain',
              name: 'Photoshop',
            },
            {
              className: 'devicon-illustrator-plain',
              name: 'Illustrator',
            },
          ],
        },
      ],
    }
  },
})
</script>
