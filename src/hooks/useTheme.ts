import { useCallback, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleTheme = useCallback(() => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light')
      } catch {
        /* private mode: no persistence */
      }
      return next
    })
  }, [])

  return { dark, toggleTheme }
}
