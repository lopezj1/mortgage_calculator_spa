// src/components/MortgageForm.jsx
import React, { useState } from 'react'
import { CalculatorIcon } from 'lucide-react'

const labelClass = 'text-sm font-semibold text-slate-600 uppercase tracking-wide'

function StepInput({ id, name, rawValue, displayValue, step, onChange, onFocus, onBlur, inputMode, placeholder }) {
  function doStep(delta) {
    const current = parseFloat(rawValue) || 0
    // Determine decimal places from step to avoid floating-point drift
    const decimals = step.toString().includes('.') ? step.toString().split('.')[1].length : 0
    const factor = Math.pow(10, decimals)
    const next = Math.max(0, Math.round((current + delta) * factor) / factor)
    onChange({ target: { name, value: String(next) } })
  }

  const btnClass =
    'px-3 py-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-600 text-base font-bold transition-colors select-none'

  return (
    <div className="flex w-full rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent overflow-hidden">
      <button
        type="button"
        onClick={() => doStep(-step)}
        className={`${btnClass} border-r border-slate-300`}
        tabIndex={-1}
        aria-label={`Decrease ${id}`}
      >
        −
      </button>
      <input
        id={id}
        className="flex-1 min-w-0 px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none text-center"
        type="text"
        name={name}
        placeholder={placeholder}
        value={displayValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode={inputMode}
      />
      <button
        type="button"
        onClick={() => doStep(step)}
        className={`${btnClass} border-l border-slate-300`}
        tabIndex={-1}
        aria-label={`Increase ${id}`}
      >
        +
      </button>
    </div>
  )
}

export default function MortgageForm({ inputs, onChange, onCalculate, expanded, setExpanded }) {
  const [focusedField, setFocusedField] = useState(null)

  function displayCurrency(raw, name) {
    if (focusedField === name) return raw
    const n = parseFloat(raw)
    return isNaN(n) ? '' : n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  }

  function displayPercent(raw, name) {
    if (focusedField === name) return raw
    return raw ? `${raw}%` : ''
  }

  function focus(name) { return () => setFocusedField(name) }
  function blur()      { return () => setFocusedField(null) }

  if (!expanded) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* ── Left column ── */}
      <div className="flex flex-col gap-3">
        <label htmlFor="address" className={labelClass}>Address</label>
        <input
          id="address"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          type="text"
          name="address"
          placeholder="Address"
          value={inputs.address}
          onChange={onChange}
        />

        <label htmlFor="listPrice" className={labelClass}>List Price</label>
        <StepInput
          id="listPrice" name="listPrice" step={1000}
          rawValue={inputs.listPrice}
          displayValue={displayCurrency(inputs.listPrice, 'listPrice')}
          onChange={onChange}
          onFocus={focus('listPrice')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />

        <label htmlFor="offerPrice" className={labelClass}>Offer Price</label>
        <StepInput
          id="offerPrice" name="offerPrice" step={1000}
          rawValue={inputs.offerPrice}
          displayValue={displayCurrency(inputs.offerPrice, 'offerPrice')}
          onChange={onChange}
          onFocus={focus('offerPrice')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />

        <label htmlFor="downPaymentPct" className={labelClass}>Down Payment</label>
        <StepInput
          id="downPaymentPct" name="downPaymentPct" step={1}
          rawValue={inputs.downPaymentPct}
          displayValue={displayPercent(inputs.downPaymentPct, 'downPaymentPct')}
          onChange={onChange}
          onFocus={focus('downPaymentPct')} onBlur={blur()}
          inputMode="decimal" placeholder="0%"
        />

        <label htmlFor="interestRatePct" className={labelClass}>Interest Rate</label>
        <StepInput
          id="interestRatePct" name="interestRatePct" step={0.125}
          rawValue={inputs.interestRatePct}
          displayValue={displayPercent(inputs.interestRatePct, 'interestRatePct')}
          onChange={onChange}
          onFocus={focus('interestRatePct')} onBlur={blur()}
          inputMode="decimal" placeholder="0%"
        />
      </div>

      {/* ── Right column ── */}
      <div className="flex flex-col gap-3">
        <label htmlFor="taxes" className={labelClass}>Annual Property Taxes</label>
        <StepInput
          id="taxes" name="taxes" step={500}
          rawValue={inputs.taxes}
          displayValue={displayCurrency(inputs.taxes, 'taxes')}
          onChange={onChange}
          onFocus={focus('taxes')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />

        <label htmlFor="insurance" className={labelClass}>Annual Home Insurance</label>
        <StepInput
          id="insurance" name="insurance" step={100}
          rawValue={inputs.insurance}
          displayValue={displayCurrency(inputs.insurance, 'insurance')}
          onChange={onChange}
          onFocus={focus('insurance')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />

        <label htmlFor="grossMonthlyIncome" className={labelClass}>Gross Monthly Income</label>
        <StepInput
          id="grossMonthlyIncome" name="grossMonthlyIncome" step={500}
          rawValue={inputs.grossMonthlyIncome}
          displayValue={displayCurrency(inputs.grossMonthlyIncome, 'grossMonthlyIncome')}
          onChange={onChange}
          onFocus={focus('grossMonthlyIncome')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />

        <label htmlFor="netMonthlyIncome" className={labelClass}>Net Monthly Income</label>
        <StepInput
          id="netMonthlyIncome" name="netMonthlyIncome" step={500}
          rawValue={inputs.netMonthlyIncome}
          displayValue={displayCurrency(inputs.netMonthlyIncome, 'netMonthlyIncome')}
          onChange={onChange}
          onFocus={focus('netMonthlyIncome')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />

        <label htmlFor="monthlyExpenses" className={labelClass}>Monthly Expenses</label>
        <StepInput
          id="monthlyExpenses" name="monthlyExpenses" step={100}
          rawValue={inputs.monthlyExpenses}
          displayValue={displayCurrency(inputs.monthlyExpenses, 'monthlyExpenses')}
          onChange={onChange}
          onFocus={focus('monthlyExpenses')} onBlur={blur()}
          inputMode="numeric" placeholder="$0"
        />
      </div>

      {/* ── Calculate button ── */}
      <div className="sm:col-span-2 flex justify-center mt-2">
        <button
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
          onClick={() => {
            onCalculate()
            setExpanded(false)
          }}
        >
          <CalculatorIcon size={16} />
          Calculate
        </button>
      </div>
    </div>
  )
}
