import { Sun, Moon } from 'lucide-react'

interface Props {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-all active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
    >
      {dark ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />}
    </button>
  )
}
