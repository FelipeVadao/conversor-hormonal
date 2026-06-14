interface Props {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
    >
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="9" y1="1" x2="9" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="1" y1="9" x2="3" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="15" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="3.22" y1="3.22" x2="4.64" y2="4.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13.36" y1="13.36" x2="14.78" y2="14.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="3.22" y1="14.78" x2="4.64" y2="13.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="13.36" y1="4.64" x2="14.78" y2="3.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 9.5A6.5 6.5 0 0 1 8.5 3a6.5 6.5 0 1 0 6.5 6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}
