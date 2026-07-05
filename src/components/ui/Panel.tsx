import type { ReactNode } from 'react'
import CornerBrackets from './CornerBrackets'

export default function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm ${className}`}>
      <CornerBrackets />
      {children}
    </div>
  )
}
