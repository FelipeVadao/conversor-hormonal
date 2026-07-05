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
import SegmentedControl from './ui/SegmentedControl'

type Direction = 'mg-to-ml' | 'ml-to-mg'

function formatNumber(n: number) {
  return parseFloat(n.toFixed(2)).toString()
}

export default function InjectableConverter() {
  const { t } = useTranslation()

  const injectables = compounds.filter(c => c.type === 'injectable')

  const [selectedId, setSelectedId] = useState('')
  const [customName, setCustomName] = useState('')
  const [concentration, setConcentration] = useState('')
  const [direction, setDirection] = useState<Direction>('mg-to-ml')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [justConverted, setJustConverted] = useState(false)

  const isCustom = selectedId === 'custom'
  const selectedCompound = injectables.find(c => c.id === selectedId)
  const isValid = parseFloat(concentration) > 0 && parseFloat(inputValue) > 0

  const resetResult = () => setResult(null)

  const handleClear = () => {
    setSelectedId('')
    setCustomName('')
    setConcentration('')
    setDirection('mg-to-ml')
    setInputValue('')
    setResult(null)
  }

  const handleConvert = () => {
    const conc = parseFloat(concentration)
    const val = parseFloat(inputValue)
    if (conc <= 0 || isNaN(conc) || val <= 0 || isNaN(val)) return
    setResult(direction === 'mg-to-ml' ? val / conc : val * conc)
    setJustConverted(true)
    setTimeout(() => setJustConverted(false), 600)
  }

  const handleDirectionChange = (dir: Direction) => {
    setDirection(dir)
    setInputValue('')
    setResult(null)
  }

  const inputLabel = direction === 'mg-to-ml' ? t('labels.desiredMg') : t('labels.desiredMl')
  const resultLabel = direction === 'mg-to-ml'
    ? <>{t('results.applyMl')} <strong>{result !== null ? formatNumber(result) : ''} ml</strong></>
    : <>{t('results.takingMg')} <strong>{result !== null ? formatNumber(result) : ''} mg</strong></>

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
          {injectables.map(c => (
            <option key={c.id} value={c.id}>
              {c.id === 'custom' ? t(c.nameKey) : `${t(c.nameKey)} (${c.popularName})`}
            </option>
          ))}
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

      {/* Concentration */}
      <div className="space-y-1.5">
        <Label>{t('labels.concentration')}</Label>
        <Input
          numeric
          type="number"
          inputMode="decimal"
          min="0"
          value={concentration}
          onChange={e => { setConcentration(e.target.value); resetResult() }}
          placeholder="0"
        />
      </div>

      {/* Direction toggle */}
      <SegmentedControl<Direction>
        ariaLabel={t('labels.convert')}
        value={direction}
        onChange={handleDirectionChange}
        options={[
          { value: 'mg-to-ml', label: 'mg → ml' },
          { value: 'ml-to-mg', label: 'ml → mg' },
        ]}
      />

      {/* Input value */}
      <div className="space-y-1.5">
        <Label>{inputLabel}</Label>
        <Input
          numeric
          type="number"
          inputMode="decimal"
          min="0"
          value={inputValue}
          onChange={e => { setInputValue(e.target.value); resetResult() }}
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
          <ResultCard>{resultLabel}</ResultCard>
          {selectedCompound?.noteKey && (
            <Banner variant="warning">{t(selectedCompound.noteKey)}</Banner>
          )}
          {selectedCompound?.sideEffectsKey && (
            <Banner variant="danger">{t(selectedCompound.sideEffectsKey)}</Banner>
          )}
        </>
      )}
    </div>
  )
}
