import { useTranslation } from 'react-i18next'

export default function Disclaimer() {
  const { t } = useTranslation()
  return (
    <div className="w-full bg-orange-500/10 border border-orange-500/25 rounded-xl px-4 py-3 text-sm text-orange-800 dark:text-orange-300 text-center leading-relaxed">
      {t('disclaimer')}
    </div>
  )
}
