import { visit } from 'unist-util-visit'

// Turns a bare YouTube/Vimeo link on its own line into a responsive embed.
// Works in any markdown body (bio, jobs, projects, blog). Standard markdown
// already handles images (![alt](url)) and links, so this only adds video embeds.

const youtube = (url) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? m[1] : null
}
const vimeo = (url) => {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m ? m[1] : null
}

function iframeNode(src, title) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['embed'] },
    children: [
      {
        type: 'element',
        tagName: 'iframe',
        properties: {
          src,
          title: title || 'Embedded video',
          loading: 'lazy',
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: true,
        },
        children: [],
      },
    ],
  }
}

export default function rehypeEmbeds() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || node.tagName !== 'p' || index === null) return
      const kids = node.children.filter(
        (c) => !(c.type === 'text' && c.value.trim() === '')
      )
      if (kids.length !== 1 || kids[0].tagName !== 'a') return
      const href = kids[0].properties?.href
      if (!href) return

      const yt = youtube(href)
      if (yt) {
        parent.children[index] = iframeNode(`https://www.youtube-nocookie.com/embed/${yt}`)
        return
      }
      const vm = vimeo(href)
      if (vm) {
        parent.children[index] = iframeNode(`https://player.vimeo.com/video/${vm}`)
      }
    })
  }
}
