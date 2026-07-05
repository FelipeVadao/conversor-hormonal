import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

export default function Select({ className = '', children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`w-full appearance-none rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 pl-3 pr-9 py-2 sm:py-3 text-sm
          transition-[border-color,box-shadow] duration-150
          hover:border-zinc-300 dark:hover:border-zinc-600
          focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40
          ${className}`}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500"
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  )
}
