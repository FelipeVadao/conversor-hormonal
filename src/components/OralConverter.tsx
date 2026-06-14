import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { compounds } from '../data/compounds'
import ResultCard from './ResultCard'

const INPUT_CLASS = 'w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors'
const LABEL_CLASS = 'block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400'

export default function OralConverter() {
  const { t } = useTranslation()

  const orals = compounds.filter(c => c.type === 'oral')

  const [selectedId, setSelectedId] = useState('')
  const [customName, setCustomName] = useState('')
  const [mgPerTablet, setMgPerTablet] = useState('')
  const [desiredMg, setDesiredMg] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const isCustom = selectedId === 'custom'
  const selectedCompound = orals.find(c => c.id === selectedId)

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
        <label className={LABEL_CLASS}>{t('labels.compound')}</label>
        <select
          value={selectedId}
          onChange={e => { setSelectedId(e.target.value); resetResult() }}
          className={INPUT_CLASS}
        >
          <option value="">{t('placeholders.selectCompound')}</option>
          {orals.map(c => (
            <option key={c.id} value={c.id}>
              {`${t(c.nameKey)} (${c.popularName})`}
            </option>
          ))}
          <option value="custom">{t('compound.custom')}</option>
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

      {/* mg per tablet */}
      <div className="space-y-1.5">
        <label className={LABEL_CLASS}>{t('labels.mgPerTablet')}</label>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={mgPerTablet}
          onChange={e => { setMgPerTablet(e.target.value); resetResult() }}
          placeholder="0"
          className={INPUT_CLASS}
        />
      </div>

      {/* Desired dose */}
      <div className="space-y-1.5">
        <label className={LABEL_CLASS}>{t('labels.desiredDoseMg')}</label>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={desiredMg}
          onChange={e => { setDesiredMg(e.target.value); resetResult() }}
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
          <ResultCard>
            {t('results.takeTablets')} <strong>{formatTablets(result)}</strong>
          </ResultCard>
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
