import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const profile = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string(),
    location: z.string(),
    image: z.string(),
  }),
})

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    order: z.number(),
    hidden: z.boolean().optional().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    year: z.string(),
    order: z.number(),
    stack: z.array(z.string()).default([]),
    contributions: z.array(z.string()).default([]),
    thumbnail: z.string().optional().default(''),
    youtube: z.string().optional().default(''),
    featured: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
  }),
})

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).optional().default([]),
  thumbnail: z.string().optional().default(''),
  description: z.string().optional().default(''),
  draft: z.boolean().optional().default(true),
  hidden: z.boolean().optional().default(false),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: postSchema,
})

const til = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/til' }),
  schema: postSchema,
})

export const collections = { profile, jobs, projects, blog, til }
