import React from 'react'

function generateTableData({ grossMonthlyIncome }) {
  const loanAmounts = []
  for (let l = 100000; l <= 300000; l += 5000) loanAmounts.push(l)
  const propertyTaxes = []
  for (let t = 5000; t <= 12000; t += 500) propertyTaxes.push(t)

  const z = loanAmounts.map(loan =>
    propertyTaxes.map(tax => {
      const n = 360
      const r = 0.065 / 12
      const monthlyPayment = (loan * r) / (1 - Math.pow(1 + r, -n))
      const monthlyTax = tax / 12
      const totalMonthly = monthlyPayment + monthlyTax
      const gross = parseFloat(grossMonthlyIncome) || 1
      return totalMonthly / gross
    })
  )
  return { loanAmounts, propertyTaxes, z }
}

function getCellColor(value) {
  if (value <= 0.28) return 'bg-emerald-100 text-emerald-800'
  if (value <= 0.31) return 'bg-amber-100 text-amber-800'
  return 'bg-red-100 text-red-800'
}

export default function LoanTaxTable({ grossMonthlyIncome }) {
  const { loanAmounts, propertyTaxes, z } = generateTableData({ grossMonthlyIncome })
  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-xl font-bold text-slate-800 tracking-tight mb-3">
        Loan Amount &amp; Property Tax vs % of Gross Income
      </h2>
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="bg-slate-700 text-white font-semibold px-2 py-2 text-left">Loan $ \ Tax $</th>
              {propertyTaxes.map(tax => (
                <th key={tax} className="bg-slate-700 text-white font-semibold px-2 py-2">{tax.toLocaleString()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loanAmounts.map((loan, i) => (
              <tr key={loan}>
                <td className="bg-slate-50 text-slate-700 px-2 py-1.5 font-semibold">{loan.toLocaleString()}</td>
                {z[i].map((val, j) => (
                  <td
                    key={j}
                    className={`border-b border-slate-100 px-2 py-1.5 text-center font-medium ${getCellColor(val)}`}
                    title={`${(val * 100).toFixed(1)}%`}
                  >
                    {(val * 100).toFixed(1)}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300"></span>
          ≤ 28%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300"></span>
          28% – 31%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3.5 h-3.5 rounded bg-red-100 border border-red-300"></span>
          &gt; 31%
        </span>
      </div>
    </div>
  )
}
