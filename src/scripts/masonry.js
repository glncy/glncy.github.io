// Reusable JS masonry. Lays out items into N equal-width columns, dropping
// each (in the order getItems() returns) into the currently shortest column so
// left→right reading order is preserved — unlike CSS `column-count`, which
// fills each column top-to-bottom and scrambles the order.
//
//   grid     – the container element (gets `js-masonry`; styled in global.css)
//   columns  – () => number of columns for the current viewport
//   getItems – () => ordered array of item elements (hidden ones are skipped)
//
// Returns a `layout()` function; call it after filtering/sorting to re-pack.
export function createMasonry(grid, { columns, getItems }) {
  if (!grid) return () => {}
  grid.classList.add('js-masonry')

  function layout() {
    const n = columns()
    // minmax(0, 1fr) keeps every column an equal fraction even when one holds
    // a wide image.
    grid.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`
    grid.replaceChildren()
    const cols = []
    const heights = []
    for (let i = 0; i < n; i++) {
      const col = document.createElement('div')
      col.className = 'masonry-col'
      grid.appendChild(col)
      cols.push(col)
      heights.push(0)
    }
    for (const item of getItems()) {
      if (item.style.display === 'none') continue
      let target = 0
      for (let i = 1; i < n; i++) if (heights[i] < heights[target]) target = i
      cols[target].appendChild(item)
      heights[target] += item.offsetHeight
    }
  }

  // Images load after the first layout and change card heights, which would
  // unbalance the columns — re-pack once each one settles.
  grid.querySelectorAll('img').forEach((img) => {
    if (img.complete) return
    img.addEventListener('load', layout, { once: true })
    img.addEventListener('error', layout, { once: true })
  })

  // Responsive: re-pack only when the column count actually changes.
  let lastCols = columns()
  let raf = 0
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      const c = columns()
      if (c !== lastCols) {
        lastCols = c
        layout()
      }
    })
  })

  return layout
}

// Standard 1 / 2 / 3 column breakpoints used across the site.
export const defaultColumns = () =>
  window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1
