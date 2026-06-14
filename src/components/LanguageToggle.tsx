import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  return (
    <button
      onClick={() => i18n.changeLanguage(isEn ? 'pt-BR' : 'en')}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider border border-zinc-700 text-zinc-400 hover:border-orange-500 hover:text-orange-400 transition-all"
    >
      {isEn ? 'PT' : 'EN'}
    </button>
  )
}
