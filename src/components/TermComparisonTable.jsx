// src/components/TermComparisonTable.jsx
import React from 'react'

function fmt(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function TermComparisonTable({ comparisonResults, selectedTerm }) {
  if (!comparisonResults || comparisonResults.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-base font-bold text-slate-700 tracking-tight mb-3">Term Comparison</h3>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Term</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rate</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Monthly Payment</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Paid</th>
            </tr>
          </thead>
          <tbody>
            {comparisonResults.map((r) => {
              const isSelected = r.termYears === Number(selectedTerm)
              return (
                <tr
                  key={r.termYears}
                  className={`border-b last:border-b-0 border-slate-100 transition-colors ${
                    isSelected ? 'bg-blue-50' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {r.termYears} yr
                    {isSelected && (
                      <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">selected</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">{r.interestRatePct}%</td>
                  <td className={`px-4 py-3 text-right font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                    {fmt(r.monthlyPayment)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">{fmt(r.totalPayment)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
