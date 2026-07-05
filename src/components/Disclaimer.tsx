import { useTranslation } from 'react-i18next'
import Banner from './ui/Banner'

export default function Disclaimer() {
  const { t } = useTranslation()
  return <Banner variant="warning">{t('disclaimer')}</Banner>
}
