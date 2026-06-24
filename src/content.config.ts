import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// CMS-tolerant helpers: the CMS may write '' or null for blank/cleared fields.
// These coerce those to safe defaults so a blank field never breaks the build.
const optStr = z.string().nullish().transform((v) => v ?? '')
const strArr = z.array(z.string()).nullish().transform((v) => v ?? [])
const num = z.coerce.number()
const optDate = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.date().optional()
)

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
    order: num,
    hidden: z.boolean().optional().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    year: z.string(),
    order: num,
    stack: strArr,
    contributions: strArr,
    thumbnail: optStr,
    youtube: optStr,
    featured: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
  }),
})

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: optDate,
  tags: strArr,
  thumbnail: optStr,
  description: optStr,
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
