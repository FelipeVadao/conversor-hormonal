import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Syringe, Pill } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import SegmentedControl from './components/ui/SegmentedControl'
import Panel from './components/ui/Panel'
import Disclaimer from './components/Disclaimer'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'
import InjectableConverter from './components/InjectableConverter'
import OralConverter from './components/OralConverter'

type Tab = 'injectable' | 'oral'

export default function App() {
  const { t } = useTranslation()
  const { dark, toggleTheme } = useTheme()
  const [tab, setTab] = useState<Tab>('injectable')

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 app-bg transition-colors">
      {/* Header — theme-aware instrument bezel */}
      <header className="sticky top-0 z-10 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
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
            <h1 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight truncate">
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
        <SegmentedControl<Tab>
          ariaLabel={t('labels.type')}
          value={tab}
          onChange={setTab}
          options={[
            { value: 'injectable', label: t('tabs.injectable'), icon: Syringe },
            { value: 'oral', label: t('tabs.oral'), icon: Pill },
          ]}
        />

        {/* Card */}
        <Panel className="p-3 sm:p-5">
          {tab === 'injectable' ? <InjectableConverter /> : <OralConverter />}
        </Panel>
      </main>
    </div>
  )
}
