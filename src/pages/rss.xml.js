import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const blog = (await getCollection('blogs', ({ data }) => !data.draft && !data.hidden)).map((p) => ({ ...p, _kind: 'blogs' }))
  const til = (await getCollection('tils', ({ data }) => !data.draft && !data.hidden)).map((p) => ({ ...p, _kind: 'tils' }))
  const items = [...blog, ...til]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/${p._kind}/${p.id}/`,
      categories: p.data.tags,
    }))

  return rss({
    title: 'glncy — Posts',
    description: 'Essays, build logs, and quick notes on web & mobile development, design, and what I am learning.',
    site: context.site,
    items,
  })
}
