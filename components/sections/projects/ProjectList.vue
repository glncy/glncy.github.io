<template>
  <div class="page-section">
    <div class="projects-wrapper">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="project-wrapper"
      >
        <img :src="project.img" v-if="project.img" />
        <div class="information-wrapper">
          <div class="name">{{ project.name }}</div>
          <div class="year">{{ project.year }}</div>
          <div class="stack-wrapper">
            <div
              v-for="(stack, index) in project.stack"
              :key="index"
              class="stack"
            >
              {{ stack }}
            </div>
          </div>
          <ul class="contributions">
            <li
              v-for="(contribution, index) in project.contributions"
              :key="index"
            >
              {{ contribution }}
            </li>
          </ul>
          <template v-if="project.remarks">
            <div class="divider" />
            <div class="remarks" v-html="project.remarks" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.page-section {
  .divider {
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

  > .projects-wrapper {
    @apply grid grid-cols-1 gap-4;

    @screen md {
      @apply grid grid-cols-2 gap-4;
    }

    @screen xl {
      @apply grid grid-cols-3 gap-4;
    }

    > .project-wrapper {
      @apply flex flex-col rounded-lg;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      border: 0.5px solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s ease-in-out;

      > img {
        @apply w-full rounded-tl-lg rounded-tr-lg;
      }

      > .information-wrapper {
        @apply p-4;

        > .name {
          @apply text-xl text-gray-200;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
        }

        > .year {
          @apply text-sm text-gray-200;
          font-family: 'Poppins', sans-serif;
          font-weight: 200;
          font-style: italic;
        }

        > .stack-wrapper {
          @apply flex flex-wrap mb-2;

          > .stack {
            @apply text-xs text-gray-200 p-1 rounded-md mr-1 mt-2;
            background: rgba(255, 255, 255, 0.2);
            border: 0.5px solid rgba(255, 255, 255, 0.3);
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
          }
        }

        > .contributions {
          @apply text-base text-gray-200 list-disc ml-4;
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
        }

        > .divider {
          @apply my-2;
        }

        > .remarks {
          @apply text-sm text-gray-200;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;

          &:deep(a) {
            @apply text-blue-500;
            text-decoration: underline;
          }
        }
      }

      &:hover {
        transform: scale(1.02);
        background: rgba(0, 0, 0, 0.5);
        border: 0.5px solid rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(8px);
      }
    }
  }
}
</style>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      projects: [
        {
          name: 'ttap.me',
          year: '2023',
          contributions: [
            'Developed web app features',
            'Implemented continuous integration and deployment',
            'Involved in fixing bugs and issues'
          ],
          stack: ['React', 'Next', 'SCSS', 'Tailwind', 'Javascript', 'TypeScript', 'Firebase'],
          remarks: `<a href="https://ttap.me" target="_blank">Click Here</a> to visit ttap.me Website.`,
        },
        {
          name: 'Betterteem',
          year: '2022',
          contributions: [
            'Developed web and mobile app features',
            'Implemented continuous integration and deployment',
            'Involved in fixing bugs and issues',
            'Managed app submissions for Google Play Store and App Store',
            'Involved in Code Review and Code Quality Assurance',
          ],
          stack: ['React', 'Next', 'SCSS', 'Tailwind', 'Javascript', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'TypeORM', 'Prisma'],
          remarks: `<a href="https://betterteem.com" target="_blank">Click Here</a> to visit Betterteem Website. Visit <a href="https://play.google.com/store/apps/details?id=com.betterteem.mobile" target="_blank">Android</a> or <a href="https://apps.apple.com/ph/app/betterteem/id6447600533" target="_blank">iOS</a> app.`,
        },
        {
          // img: 'https://previews.123rf.com/images/arcady31/arcady311108/arcady31110800017/10101139-sample-stamp.jpg',
          name: 'glncy',
          year: '2022',
          contributions: [
            'Developed web components and section of the website',
            'Implemented continuous integration and deployment',
          ],
          stack: ['Vue', 'Nuxt', 'PostCSS', 'Tailwind', 'JavaScript'],
          remarks: `You are currently on this website.`,
        },
        {
          name: 'Enstack',
          year: '2022',
          contributions: [
            'Involved in fixing live bugs and issues',
            'Worked on system features',
          ],
          stack: ['Vue', 'Nuxt', 'Django', 'CSS', 'Tailwind', 'JavaScript'],
          remarks: `Worked with Infoshift Inc. <a href="https://enstack.com" target="_blank">Click Here</a> to visit Enstack Website.`,
        },
        {
          name: 'Circles X',
          year: '2022',
          contributions: [
            'Developed responsive web pages and sections',
            'Implemented web components interactions and animations',
          ],
          stack: ['React', 'Next.js', 'Chakra UI', 'TypeScript', 'JavaScript'],
          remarks: `Worked with <a href="http://frostdesigngroup.com/" target="_blank">Frost</a> (Infoshift Engagement). <a href="https://www.circlesglobal.com" target="_blank">Click Here</a> to visit Circles-X Website.`,
        },
        {
          name: 'Globe',
          year: '2022',
          contributions: [
            'Developed web components',
            'Implemented web components interactions',
          ],
          stack: ['HTML', 'SCSS', 'JavaScript'],
          remarks: `Worked with <a href="http://frostdesigngroup.com/" target="_blank">Frost</a> (Infoshift Engagement). <a href="https://www.globe.com.ph" target="_blank">Click Here</a> to visit Globe Website.`,
        },
        {
          name: 'Circles.Life',
          year: '2021 - 2022',
          contributions: [
            'Developed web components',
            'Implemented web components interactions',
          ],
          stack: ['HTML', 'SCSS', 'JavaScript'],
          remarks: `Worked with <a href="http://frostdesigngroup.com/" target="_blank">Frost</a> (Infoshift Engagement). <a href="https://www.circles.life/sg/" target="_blank">Click Here</a> to visit Circles.Life Website.`,
        },
        {
          name: 'BML Inventory System',
          year: '2022',
          contributions: [
            'Developed web app features',
            'Involved in project planning and management',
            'Implemented continuous integration and deployment',
            'Involved in fixing bugs and issues',
          ],
          stack: [
            'Node.js',
            'Express',
            'MySQL',
            'JavaScript',
            'Sequelize',
            'Vue',
            'Bootstrap',
            'CSS',
          ],
          remarks: `Freelance Job with <a href="https://jansalvador1445.github.io/" target="_blank">Jan Salvador Sebastian</a>.`,
        },
        {
          name: 'IQ Audio Inventory System',
          year: '2021 - 2022',
          contributions: [
            'Developed web app features',
            'Involved in project planning and management',
            'Implemented continuous integration and deployment',
            'Involved in fixing bugs and issues',
          ],
          stack: [
            'Node.js',
            'Express',
            'MySQL',
            'JavaScript',
            'Sequelize',
            'Vue',
            'Bootstrap',
            'CSS',
            'GitLab Runner',
          ],
          remarks: `Freelance Job with <a href="https://jansalvador1445.github.io/" target="_blank">Jan Salvador Sebastian</a>.`,
        },
        {
          name: 'Millennial Resorts',
          year: '2020 - 2021',
          contributions: [
            'Developed web and mobile app features',
            'Involved in fixing bugs and issues',
            'Managed app submissions for Google Play Store and App Store',
            'Involved working on implementation of VOIP call feature using 3CX',
            'Involved in Code Review and Code Quality Assurance',
          ],
          stack: [
            'Vue',
            'Django',
            'Bootstrap',
            'Cordova',
            'JavaScript',
            'Firebase',
            'Onsen UI',
            'SCSS',
          ],
          remarks: `Worked with Infoshift Inc. Visit <a href="https://play.google.com/store/apps/details?id=com.milli.app" target="_blank">Android</a> or <a href="https://apps.apple.com/us/app/id1545884765" target="_blank">iOS</a> app.`,
        },
        {
          name: 'PHINMA - University of Pangasinan Election System [APEC Organization]',
          year: '2019 - 2020 - 2021 - 2022',
          contributions: [
            'Developed web and mobile app features',
            'Involved in project planning and management',
            'Implmented continuous integration and deployment',
            'Involved in fixing bugs and issues',
            'Provides solutions to client in conducting election during pandemic',
          ],
          stack: [
            'Node.js',
            'Express',
            'Vue',
            'Bootstrap',
            'JavaScript',
            'Vercel',
            'CSS',
          ],
          remarks: `Freelance Job with <a href="https://jansalvador1445.github.io/" target="_blank">Jan Salvador Sebastian</a>.`,
        },
        {
          name: 'Cast Chronicle News App',
          year: '2019',
          contributions: [
            'Developed web and mobile features',
            'Involved in fixing bugs and issues',
          ],
          stack: [
            'PHP',
            'MySQL',
            'Bootstrap',
            'JavaScript',
            'CSS',
            'Cordova',
            'Onsen UI',
            'JQuery',
          ],
          remarks: `Freelance Project. Developed for Prototyping Purposes Only. <a href="https://github.com/glncy/cast-chronicle-backend" target="_blank">Click Here</a> to view Web Backend Repository. <a href="https://github.com/glncy/cast-chronicle-app" target="_blank">Click Here</a> to view Mobile App Repository.`,
        },
        {
          name: 'Building Permit Generator System [bugallon-building-permit]',
          year: '2019',
          contributions: [
            'Developed web features',
            'Involved in fixing bugs and issues',
          ],
          stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'CSS', 'JQuery'],
          remarks: `Freelance Project. Developed for Prototyping Purposes Only. <a href="https://github.com/glncy/php_pos_system" target="_blank">Click Here</a> to view Repository.`,
        },
        {
          name: 'Bus Reservation [busreservation]',
          year: '2019',
          contributions: [
            'Developed web features',
            'Involved in fixing bugs and issues',
          ],
          stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'CSS', 'JQuery'],
          remarks: `Freelance Project. Developed for Prototyping Purposes Only. <a href="https://github.com/glncy/busreservation" target="_blank">Click Here</a> to view Repository.`,
        },
        {
          name: 'Ecommerce Website [palisoc-shoes-shop]',
          year: "Can't remember, During College Years",
          contributions: [
            'Developed web features',
            'Involved in fixing bugs and issues',
          ],
          stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'CSS', 'JQuery'],
          remarks: `Freelance Project. Developed for Prototyping Purposes Only. <a href="https://github.com/glncy/palisoc-shoes-shop" target="_blank">Click Here</a> to view Repository.`,
        },
        {
          name: 'Attendance and Payroll System [scl_attendance_monitoring]',
          year: "Can't remember, During College Years",
          contributions: [
            'Developed web features',
            'Involved in fixing bugs and issues',
            'Utilized QR Code technology to track attendance',
          ],
          stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'CSS', 'JQuery'],
          remarks: `Freelance Project. Developed for Prototyping Purposes Only. <a href="https://github.com/glncy/palisoc-shoes-shop" target="_blank">Click Here</a> to view Repository.`,
        },
        {
          name: 'Inventory and POS System [php_pos_system]',
          year: "Can't remember, During College Years",
          contributions: [
            'Developed web features',
            'Involved in fixing bugs and issues',
            'Utilized QR Code technology to track attendance',
          ],
          stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'CSS', 'JQuery'],
          remarks: `Freelance Project. Developed for Prototyping Purposes Only. <a href="https://github.com/glncy/php_pos_system" target="_blank">Click Here</a> to view Repository.`,
        },
      ],
    }
  },
})
</script>
