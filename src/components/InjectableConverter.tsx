import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { compounds } from '../data/compounds'
import ResultCard from './ResultCard'

type Direction = 'mg-to-ml' | 'ml-to-mg'

const INPUT_CLASS = 'w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors'
const LABEL_CLASS = 'block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

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

  const isCustom = selectedId === 'custom'
  const selectedCompound = injectables.find(c => c.id === selectedId)

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
        <label className={LABEL_CLASS}>{t('labels.compound')}</label>
        <select
          value={selectedId}
          onChange={e => { setSelectedId(e.target.value); resetResult() }}
          className={INPUT_CLASS}
        >
          <option value="">{t('placeholders.selectCompound')}</option>
          {injectables.map(c => (
            <option key={c.id} value={c.id}>
              {c.id === 'custom' ? t(c.nameKey) : `${t(c.nameKey)} (${c.popularName})`}
            </option>
          ))}
        </select>
      </div>

      {/* Custom name */}
      {isCustom && (
        <div className="space-y-1.5">
          <label className={LABEL_CLASS}>{t('labels.customName')}</label>
          <input
            type="text"
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            placeholder={t('placeholders.customName')}
            className={INPUT_CLASS}
          />
        </div>
      )}

      {/* Concentration */}
      <div className="space-y-1.5">
        <label className={LABEL_CLASS}>{t('labels.concentration')}</label>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={concentration}
          onChange={e => { setConcentration(e.target.value); resetResult() }}
          placeholder="0"
          className={INPUT_CLASS}
        />
      </div>

      {/* Direction toggle */}
      <div className="flex rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
        {(['mg-to-ml', 'ml-to-mg'] as Direction[]).map(dir => (
          <button
            key={dir}
            onClick={() => handleDirectionChange(dir)}
            className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
              direction === dir
                ? 'bg-orange-500 text-white'
                : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {dir === 'mg-to-ml' ? 'mg → ml' : 'ml → mg'}
          </button>
        ))}
      </div>

      {/* Input value */}
      <div className="space-y-1.5">
        <label className={LABEL_CLASS}>{inputLabel}</label>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={inputValue}
          onChange={e => { setInputValue(e.target.value); resetResult() }}
          placeholder="0"
          className={INPUT_CLASS}
        />
      </div>

      {/* Convert button */}
      <button
        onClick={handleConvert}
        className="w-full py-2.5 sm:py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm transition-all shadow-sm shadow-orange-200 dark:shadow-orange-900/20"
      >
        {t('labels.convert')}
      </button>

      {/* Clear button */}
      {selectedId !== '' && (
        <button
          onClick={handleClear}
          className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-600 dark:hover:text-orange-400 text-sm font-medium transition-all"
        >
          {t('labels.clearAll')}
        </button>
      )}

      {/* Results */}
      {result !== null && (
        <>
          <ResultCard>{resultLabel}</ResultCard>
          {selectedCompound?.noteKey && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/40 px-4 py-3 text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
              {t(selectedCompound.noteKey)}
            </div>
          )}
          {selectedCompound?.sideEffectsKey && (
            <div className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-700/40 px-4 py-3 text-rose-800 dark:text-rose-200 text-sm leading-relaxed">
              {t(selectedCompound.sideEffectsKey)}
            </div>
          )}
        </>
      )}
    </div>
  )
}
