<template>
  <div class="page-section">
    <div class="header">Job History</div>
    <div class="divider" />
    <div class="job-history-wrapper">
      <div v-for="(job, index) in jobHistory" :key="index" class="job-wrapper">
        <div class="title">{{ job.title }}</div>
        <div class="description">{{ job.description }}</div>
        <div class="divider" />
        <div class="company">{{ job.company }}</div>
        <div class="location">{{ job.location }}</div>
        <div class="date">{{ job.startDate }} - {{ job.endDate }}</div>
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

  > .job-history-wrapper {
    @apply grid grid-cols-1 gap-4;

    @screen md {
      @apply grid grid-cols-2 gap-4;
    }

    @screen xl {
      @apply grid grid-cols-3 gap-4;
    }

    > .job-wrapper {
      @apply flex flex-col p-4 rounded-lg;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      border: 0.5px solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s ease-in-out;

      > .title {
        @apply text-2xl text-gray-200;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
      }

      > .description {
        @apply text-sm text-gray-200;
        font-family: 'Poppins', sans-serif;
        font-weight: 100;
      }

      > .divider {
        @apply my-2;
      }

      > .company {
        @apply text-xl text-gray-200;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
      }

      > .location {
        @apply text-base text-gray-200;
        font-family: 'Poppins', sans-serif;
        font-weight: 200;
      }

      > .date {
        @apply text-sm text-gray-200;
        font-family: 'Poppins', sans-serif;
        font-weight: 200;
        font-style: italic;
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
      jobHistory: [
        {
          title: 'Creatives Intern',
          company: 'RNR Digital Consultancy',
          location: 'Pangasinan, Philippines',
          startDate: 'July 2019',
          endDate: 'September 2019',
          description:
            'Involved working on UI/UX designs, making graphics and animated videos for clients.',
        },
        {
          title: 'Developer Intern',
          company: 'RNR Digital Consultancy',
          location: 'Pangasinan, Philippines',
          startDate: 'September 2019',
          endDate: 'October 2019',
          description:
            'Joined Development Team to explore Node.js and Serverless Architecture, developed components for Mobile and Web.',
        },
        {
          title: 'Associate Developer',
          company: 'RNR Digital Consultancy',
          location: 'Pangasinan, Philippines',
          startDate: 'October 2019',
          endDate: ' January 2020',
          description:
            'Developed Node.js RESTful API application, making components for Mobile and Web, setting up CI/CD pipeline, managing AWS EC2 servers, conducted R&D activities.',
        },
        {
          title: 'Customer Service Representative',
          company: 'Sitel',
          location: 'Baguio City, Philippines',
          startDate: 'February 2020',
          endDate: 'October 2020',
          description:
            'Supports billing concerns, product information and minimal technical support, conducted upselling of client products.',
        },
        {
          title: 'Junior Software Engineer',
          company: 'Infoshift',
          location: 'Manila, Philippines',
          startDate: 'October 2020',
          endDate: 'Present',
          description: `Developed features for client's web and mobile applications, managed submission of mobiles apps to Google Play and App Store, developed web components for clients, conducted code reviews, supporting live bugs.`,
        },
      ],
    }
  },
})
</script>
