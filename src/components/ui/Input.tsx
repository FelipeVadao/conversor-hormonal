import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  numeric?: boolean
}

export default function Input({ numeric = false, className = '', ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 px-3 py-2 sm:py-3 text-sm
        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
        transition-[border-color,box-shadow] duration-150
        hover:border-zinc-300 dark:hover:border-zinc-600
        focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40
        ${numeric ? 'font-mono tabular-nums' : ''} ${className}`}
    />
  )
}
