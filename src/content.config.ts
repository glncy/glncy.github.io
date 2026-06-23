import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string(),
    location: z.string(),
    image: z.string(),
  }),
})

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    order: z.number(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    year: z.string(),
    order: z.number(),
    stack: z.array(z.string()).default([]),
    contributions: z.array(z.string()).default([]),
    thumbnail: z.string().optional().default(''),
    youtube: z.string().optional().default(''),
  }),
})

export const collections = { profile, jobs, projects }
