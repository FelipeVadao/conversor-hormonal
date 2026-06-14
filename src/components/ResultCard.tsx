import { type ReactNode } from 'react'

export default function ResultCard({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 px-4 py-3.5 text-orange-900 dark:text-orange-100 text-sm font-medium font-mono">
      {children}
    </div>
  )
}
