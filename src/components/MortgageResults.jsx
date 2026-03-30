// src/components/MortgageResults.jsx
import React from 'react'
import AmortizationChart from './AmortizationChart'
import TermComparisonTable from './TermComparisonTable'

function fmt(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
}

export default function MortgageResults({ results, inputs, comparisonResults }) {
  if (!results) return null

  const termYears = results.termYears || 30
  const stats = [
    { label: 'Down Payment', value: fmt(results.downPayment) },
    { label: 'Loan Amount', value: fmt(results.loanAmount) },
    { label: 'Monthly Payment', value: fmt(results.monthlyPayment) },
    { label: 'Monthly Taxes', value: fmt(results.monthlyTaxes) },
    { label: 'Monthly Insurance', value: fmt(results.monthlyInsurance) },
    { label: 'Total Monthly Expense', value: fmt(results.totalMonthlyHouseExpense) },
    { label: `${termYears}-Year Total`, value: fmt(results.totalPayment) },
    { label: '3-Month Emergency Fund', value: fmt(results.emergencyFund3) },
    { label: '6-Month Emergency Fund', value: fmt(results.emergencyFund6) },
    { label: '% of Gross Income', value: `${results.mortgagePctGross.toLocaleString(undefined, { maximumFractionDigits: 2 })}%` },
  ]

  return (
    <div className="mt-6 text-left">
      <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-4">Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
            <span className="text-xl font-bold text-slate-800">{value}</span>
          </div>
        ))}
      </div>
      <TermComparisonTable comparisonResults={comparisonResults} selectedTerm={termYears} />
      <div className="mt-8">
        <AmortizationChart inputs={inputs} />
      </div>
    </div>
  )
}
