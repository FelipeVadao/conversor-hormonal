import { type ReactNode } from 'react'
import CornerBrackets from './ui/CornerBrackets'

export default function ResultCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 px-4 py-3.5 pr-8 text-orange-900 dark:text-orange-100 text-sm font-medium font-mono transition-all duration-300 starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none">
      <CornerBrackets />
      <span className="absolute right-3 top-3 flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-500" />
      </span>
      {children}
    </div>
  )
}
