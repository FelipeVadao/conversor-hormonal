import type { LabelHTMLAttributes } from 'react'

export default function Label({ className = '', ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${className}`}
      {...props}
    />
  )
}
