import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <button
      onClick={() => i18n.changeLanguage(isEn ? 'pt-BR' : 'en')}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider border border-zinc-300 text-zinc-500 hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-brand-500 dark:hover:text-brand-400 transition-all active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50"
    >
      {isEn ? 'PT' : 'EN'}
    </button>
  )
}
