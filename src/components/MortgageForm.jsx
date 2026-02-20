// src/components/MortgageForm.jsx
import React, { useState } from 'react'
import { CalculatorIcon } from 'lucide-react'

const inputClass = 'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
const labelClass = 'text-sm font-semibold text-slate-600 uppercase tracking-wide'

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

  if (!expanded) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex flex-col gap-3">
        <label htmlFor="address" className={labelClass}>Address</label>
        <input
          id="address"
          className={inputClass}
          type="text"
          name="address"
          placeholder="Address"
          value={inputs.address}
          onChange={onChange}
        />

        <label htmlFor="listPrice" className={labelClass}>List Price</label>
        <input
          id="listPrice"
          className={inputClass}
          type="text"
          name="listPrice"
          placeholder="$0"
          value={displayCurrency(inputs.listPrice, 'listPrice')}
          onChange={onChange}
          onFocus={() => setFocusedField('listPrice')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />

        <label htmlFor="offerPrice" className={labelClass}>Offer Price</label>
        <input
          id="offerPrice"
          className={inputClass}
          type="text"
          name="offerPrice"
          placeholder="$0"
          value={displayCurrency(inputs.offerPrice, 'offerPrice')}
          onChange={onChange}
          onFocus={() => setFocusedField('offerPrice')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />

        <label htmlFor="downPaymentPct" className={labelClass}>Down Payment</label>
        <input
          id="downPaymentPct"
          className={inputClass}
          type="text"
          name="downPaymentPct"
          placeholder="0%"
          value={displayPercent(inputs.downPaymentPct, 'downPaymentPct')}
          onChange={onChange}
          onFocus={() => setFocusedField('downPaymentPct')}
          onBlur={() => setFocusedField(null)}
          inputMode="decimal"
        />

        <label htmlFor="interestRatePct" className={labelClass}>Interest Rate</label>
        <input
          id="interestRatePct"
          className={inputClass}
          type="text"
          name="interestRatePct"
          placeholder="0%"
          value={displayPercent(inputs.interestRatePct, 'interestRatePct')}
          onChange={onChange}
          onFocus={() => setFocusedField('interestRatePct')}
          onBlur={() => setFocusedField(null)}
          inputMode="decimal"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="taxes" className={labelClass}>Annual Property Taxes</label>
        <input
          id="taxes"
          className={inputClass}
          type="text"
          name="taxes"
          placeholder="$0"
          value={displayCurrency(inputs.taxes, 'taxes')}
          onChange={onChange}
          onFocus={() => setFocusedField('taxes')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />

        <label htmlFor="insurance" className={labelClass}>Annual Home Insurance</label>
        <input
          id="insurance"
          className={inputClass}
          type="text"
          name="insurance"
          placeholder="$0"
          value={displayCurrency(inputs.insurance, 'insurance')}
          onChange={onChange}
          onFocus={() => setFocusedField('insurance')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />

        <label htmlFor="grossMonthlyIncome" className={labelClass}>Gross Monthly Income</label>
        <input
          id="grossMonthlyIncome"
          className={inputClass}
          type="text"
          name="grossMonthlyIncome"
          placeholder="$0"
          value={displayCurrency(inputs.grossMonthlyIncome, 'grossMonthlyIncome')}
          onChange={onChange}
          onFocus={() => setFocusedField('grossMonthlyIncome')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />

        <label htmlFor="netMonthlyIncome" className={labelClass}>Net Monthly Income</label>
        <input
          id="netMonthlyIncome"
          className={inputClass}
          type="text"
          name="netMonthlyIncome"
          placeholder="$0"
          value={displayCurrency(inputs.netMonthlyIncome, 'netMonthlyIncome')}
          onChange={onChange}
          onFocus={() => setFocusedField('netMonthlyIncome')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />

        <label htmlFor="monthlyExpenses" className={labelClass}>Monthly Expenses</label>
        <input
          id="monthlyExpenses"
          className={inputClass}
          type="text"
          name="monthlyExpenses"
          placeholder="$0"
          value={displayCurrency(inputs.monthlyExpenses, 'monthlyExpenses')}
          onChange={onChange}
          onFocus={() => setFocusedField('monthlyExpenses')}
          onBlur={() => setFocusedField(null)}
          inputMode="numeric"
        />
      </div>

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
