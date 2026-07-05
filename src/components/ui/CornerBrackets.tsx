export default function CornerBrackets({ className = '' }: { className?: string }) {
  const base = `pointer-events-none absolute h-3 w-3 border-brand-500/50 ${className}`
  return (
    <>
      <span className={`${base} -top-1 -left-1 border-t-2 border-l-2 rounded-tl-sm`} aria-hidden />
      <span className={`${base} -top-1 -right-1 border-t-2 border-r-2 rounded-tr-sm`} aria-hidden />
      <span className={`${base} -bottom-1 -left-1 border-b-2 border-l-2 rounded-bl-sm`} aria-hidden />
      <span className={`${base} -bottom-1 -right-1 border-b-2 border-r-2 rounded-br-sm`} aria-hidden />
    </>
  )
}
