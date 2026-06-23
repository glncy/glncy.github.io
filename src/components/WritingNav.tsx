import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

interface Props {
  active?: boolean
}

// Accessible Writing dropdown (Radix via shadcn). Trigger matches the nav links;
// items are real links so SEO/routing stays intact. Tapping items navigates.
export default function WritingNav({ active = false }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="nav-trigger"
          aria-label="Writing menu"
          data-active={active ? 'true' : undefined}
        >
          Writing
          <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="min-w-[9rem] border-white/15 bg-black/70 text-gray-200 backdrop-blur-md"
      >
        <DropdownMenuItem asChild>
          <a href="/writing">All Writing</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/blog">Blog</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/til">TIL</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
