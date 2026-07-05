import type { ComponentType } from 'react'

interface Option<T extends string> {
  value: T
  label: string
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>
}

interface Props<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
}

export default function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel }: Props<T>) {
  const index = Math.max(0, options.findIndex(o => o.value === value))
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="relative grid rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 p-1"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <div
        aria-hidden
        className="absolute inset-y-1 left-1 rounded-lg bg-brand-500 shadow-sm shadow-brand-900/20 transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{
          width: `calc(${100 / options.length}% - ${4 / options.length}px)`,
          transform: `translateX(calc(${index} * 100%))`,
        }}
      />
      {options.map(opt => {
        const Icon = opt.icon
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-colors
              ${active ? 'text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
