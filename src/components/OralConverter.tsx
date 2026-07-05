import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { compounds } from '../data/compounds'
import ResultCard from './ResultCard'
import Label from './ui/Label'
import Input from './ui/Input'
import Select from './ui/Select'
import Button from './ui/Button'
import Banner from './ui/Banner'

export default function OralConverter() {
  const { t } = useTranslation()

  const orals = compounds.filter(c => c.type === 'oral')

  const [selectedId, setSelectedId] = useState('')
  const [customName, setCustomName] = useState('')
  const [mgPerTablet, setMgPerTablet] = useState('')
  const [desiredMg, setDesiredMg] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [justConverted, setJustConverted] = useState(false)

  const isCustom = selectedId === 'custom'
  const selectedCompound = orals.find(c => c.id === selectedId)
  const isValid = parseFloat(mgPerTablet) > 0 && parseFloat(desiredMg) > 0

  const resetResult = () => setResult(null)

  const handleClear = () => {
    setSelectedId('')
    setCustomName('')
    setMgPerTablet('')
    setDesiredMg('')
    setResult(null)
  }

  const handleConvert = () => {
    const perTab = parseFloat(mgPerTablet)
    const desired = parseFloat(desiredMg)
    if (perTab <= 0 || isNaN(perTab) || desired <= 0 || isNaN(desired)) return
    setResult(desired / perTab)
    setJustConverted(true)
    setTimeout(() => setJustConverted(false), 600)
  }

  const formatTablets = (count: number) => {
    const whole = Math.floor(count)
    const fraction = count - whole
    let fractionStr = ''
    if (fraction >= 0.45 && fraction < 0.55) fractionStr = '½'
    else if (fraction >= 0.2 && fraction < 0.45) fractionStr = '¼'
    else if (fraction >= 0.55 && fraction < 0.8) fractionStr = '¾'
    const label = count === 1 ? t('results.tablet') : t('results.tablets')
    const display = fractionStr
      ? whole > 0 ? `${whole} ${fractionStr}` : fractionStr
      : Number.isInteger(count)
        ? count.toString()
        : parseFloat(count.toFixed(2)).toString()
    return `${display} ${label}`
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Compound selector */}
      <div className="space-y-1.5">
        <Label>{t('labels.compound')}</Label>
        <Select
          value={selectedId}
          onChange={e => { setSelectedId(e.target.value); resetResult() }}
        >
          <option value="">{t('placeholders.selectCompound')}</option>
          {orals.map(c => (
            <option key={c.id} value={c.id}>
              {`${t(c.nameKey)} (${c.popularName})`}
            </option>
          ))}
          <option value="custom">{t('compound.custom')}</option>
        </Select>
      </div>

      {/* Custom name */}
      {isCustom && (
        <div className="space-y-1.5">
          <Label>{t('labels.customName')}</Label>
          <Input
            type="text"
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            placeholder={t('placeholders.customName')}
          />
        </div>
      )}

      {/* mg per tablet */}
      <div className="space-y-1.5">
        <Label>{t('labels.mgPerTablet')}</Label>
        <Input
          numeric
          type="number"
          inputMode="decimal"
          min="0"
          value={mgPerTablet}
          onChange={e => { setMgPerTablet(e.target.value); resetResult() }}
          placeholder="0"
        />
      </div>

      {/* Desired dose */}
      <div className="space-y-1.5">
        <Label>{t('labels.desiredDoseMg')}</Label>
        <Input
          numeric
          type="number"
          inputMode="decimal"
          min="0"
          value={desiredMg}
          onChange={e => { setDesiredMg(e.target.value); resetResult() }}
          placeholder="0"
        />
      </div>

      {/* Convert button */}
      <Button onClick={handleConvert} disabled={!isValid}>
        <span className="inline-flex items-center justify-center gap-1.5">
          {justConverted && <Check className="h-4 w-4" strokeWidth={2} aria-hidden />}
          {t('labels.convert')}
        </span>
      </Button>

      {/* Clear button */}
      {selectedId !== '' && (
        <Button variant="secondary" onClick={handleClear}>
          {t('labels.clearAll')}
        </Button>
      )}

      {/* Results */}
      {result !== null && (
        <>
          <ResultCard>
            {t('results.takeTablets')} <strong>{formatTablets(result)}</strong>
          </ResultCard>
          {selectedCompound?.sideEffectsKey && (
            <Banner variant="danger">{t(selectedCompound.sideEffectsKey)}</Banner>
          )}
        </>
      )}
    </div>
  )
}
