import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Disclaimer from './components/Disclaimer'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'
import InjectableConverter from './components/InjectableConverter'
import OralConverter from './components/OralConverter'

type Tab = 'injectable' | 'oral'

export default function App() {
  const { t } = useTranslation()
  const [dark, setDark] = useState(false)
  const [tab, setTab] = useState<Tab>('injectable')

  const toggleTheme = () => {
    setDark(prev => {
      document.documentElement.classList.toggle('dark', !prev)
      return !prev
    })
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 app-bg transition-colors">
      {/* Header — always dark */}
      <header className="w-full bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-lg mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 2h5M6.5 2v4L3 13h10L9.5 6V2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="5.5" cy="10.5" r="0.8" fill="white"/>
                <circle cx="9.5" cy="11.5" r="0.65" fill="white"/>
              </svg>
            </div>
            <h1 className="text-sm font-bold text-white tracking-tight truncate">
              {t('appTitle')}
            </h1>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <LanguageToggle />
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-3 sm:px-4 py-3 sm:py-5 space-y-3 sm:space-y-4">
        <Disclaimer />

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {(['injectable', 'oral'] as Tab[]).map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${
                tab === tabKey
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {t(`tabs.${tabKey}`)}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 sm:p-5">
          {tab === 'injectable' ? <InjectableConverter /> : <OralConverter />}
        </div>
      </main>
    </div>
  )
}
