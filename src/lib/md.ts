// Minimal inline markdown -> HTML for short data strings (bold, links, line breaks).
// Used for the profile bio stored as a plain string in JSON.
export function inlineMd(text: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return text
    .split(/\n{2,}/)
    .map((para) => {
      let p = escape(para.trim())
      p = p.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      p = p.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      p = p.replace(/\n/g, '<br />')
      return `<p>${p}</p>`
    })
    .join('')
}
