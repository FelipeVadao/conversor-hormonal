import type { ReactNode } from 'react'
import { TriangleAlert, Stethoscope, type LucideIcon } from 'lucide-react'

type Variant = 'warning' | 'danger'

const VARIANTS: Record<Variant, { classes: string; icon: LucideIcon }> = {
  warning: { classes: 'bg-warning-500/10 border-warning-500/30 text-warning-800 dark:text-warning-300', icon: TriangleAlert },
  danger: { classes: 'bg-danger-500/10 border-danger-500/30 text-danger-800 dark:text-danger-300', icon: Stethoscope },
}

export default function Banner({ variant, children }: { variant: Variant; children: ReactNode }) {
  const { classes, icon: Icon } = VARIANTS[variant]
  return (
    <div className={`flex gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${classes}`}>
      <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
      <div>{children}</div>
    </div>
  )
}
