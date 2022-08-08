<template>
  <div class="section">
    <div class="header">Skills</div>
    <div class="divider"/>
    <div class="skills-title">Languages</div>
    <div class="icons-wrapper">
      <IconGlassWrapper
        class="icons"
        :classIcon="skill.className"
        v-for="(skill, index) in skills"
        :key="index"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.section {
  @apply flex flex-col w-full mx-auto;
  max-width: 1280px;

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

  > .skills-title {
    @apply text-2xl text-gray-200 mb-4;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    width: fit-content;
  }

  > .icons-wrapper {
    @apply flex flex-row flex-wrap;

    > .icons {
      @apply mr-5 mb-5;
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
          className: 'devicon-javascript-plain',
          name: 'JavaScript',
        },
        {
          className: 'devicon-amazonwebservices-plain-wordmark',
          name: 'AWS (Amazon Web Services)',
        },
        {
          className: 'devicon-bash-plain',
          name: 'Bash',
        },
        {
          className: 'devicon-bootstrap-plain',
          name: 'Bootstrap',
        },
        {
          className: 'devicon-css3-plain',
          name: 'CSS',
        },
        {
          className: 'devicon-django-plain-wordmark',
          name: 'Django',
        },
        {
          className: 'devicon-docker-plain-wordmark',
          name: 'Docker',
        },
        {
          className: 'devicon-digitalocean-plain',
          name: 'DigitalOcean',
        },
        {
          className: 'devicon-express-original',
          name: 'Express',
        },
        {
          className: 'devicon-firebase-plain-wordmark',
          name: 'Firebase',
        },
        {
          // git
          className: 'devicon-git-plain-wordmark',
          name: 'Git',
        },
        {
          // github
          className: 'devicon-github-original',
          name: 'GitHub',
        },
        {
          // gitlab
          className: 'devicon-gitlab-plain-wordmark',
          name: 'GitLab',
        },
        {
          // heroku
          className: 'devicon-heroku-plain-wordmark',
          name: 'Heroku',
        },
        {
          // html5
          className: 'devicon-html5-plain-wordmark',
          name: 'HTML5',
        },
        {
          // ionic
          className: 'devicon-ionic-original',
          name: 'Ionic',
        },
        {
          // linux
          className: 'devicon-linux-plain',
          name: 'Linux',
        },
        {
          // mysql
          className: 'devicon-mysql-plain-wordmark',
          name: 'MySQL',
        },
        {
          //nextjs
          className: 'devicon-nextjs-plain-wordmark',
          name: 'Next.js',
        },
        {
          //nodejs
          className: 'devicon-nodejs-plain-wordmark',
          name: 'Node.js',
        },
        {
          //nuxtjs
          className: 'devicon-nuxtjs-plain-wordmark',
          name: 'Nuxt.js',
        },
        {
          //php
          className: 'devicon-php-plain',
          name: 'PHP',
        },
        {
          //python
          className: 'devicon-python-plain-wordmark',
          name: 'Python',
        },
        {
          //react
          className: 'devicon-react-original-wordmark',
          name: 'React',
        },
        {
          // sass
          className: 'devicon-sass-original',
          name: 'Sass',
        },
        {
          // typescript
          className: 'devicon-typescript-plain',
          name: 'TypeScript',
        },
        {
          // vue
          className: 'devicon-vuejs-plain-wordmark',
          name: 'Vue.js',
        },
      ],
    }
  },
})
</script>
