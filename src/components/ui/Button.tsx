import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white shadow-sm shadow-brand-900/20 dark:shadow-black/40 disabled:hover:bg-brand-500',
  secondary: 'border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-600 dark:hover:text-brand-400 font-medium disabled:hover:border-zinc-200 dark:disabled:hover:border-zinc-700 disabled:hover:text-zinc-500 dark:disabled:hover:text-zinc-400',
}

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  return (
    <button
      {...props}
      className={`w-full py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all
        active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50
        disabled:opacity-40 disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]} ${className}`}
    />
  )
}
