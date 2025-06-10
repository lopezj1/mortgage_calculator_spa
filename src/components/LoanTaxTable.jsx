import React from 'react'

function generateTableData({ grossMonthlyIncome }) {
  // Loan amounts: 100,000 to 300,000 in 5,000 increments
  const loanAmounts = []
  for (let l = 100000; l <= 300000; l += 5000) loanAmounts.push(l)
  // Property taxes: 5,000 to 12,000 in 500 increments
  const propertyTaxes = []
  for (let t = 5000; t <= 12000; t += 500) propertyTaxes.push(t)

  // Calculate % of gross income for each combination
  const z = loanAmounts.map(loan =>
    propertyTaxes.map(tax => {
      // Assume 30 year, 6.5% interest for all
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
  if (value <= 0.28) return 'bg-green-200'
  if (value > 0.28 && value <= 0.31) return 'bg-yellow-200'
  return 'bg-red-200'
}

export default function LoanTaxTable({ grossMonthlyIncome }) {
  const { loanAmounts, propertyTaxes, z } = generateTableData({ grossMonthlyIncome })
  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-lg font-semibold mb-2">Loan Amount & Property Tax vs % of Gross Income Table</h2>
      <table className="min-w-full border border-gray-300 text-xs">
        <thead>
          <tr>
            <th className="border p-1 bg-gray-100">Loan $ \ Tax $</th>
            {propertyTaxes.map(tax => (
              <th key={tax} className="border p-1 bg-gray-100">{tax.toLocaleString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loanAmounts.map((loan, i) => (
            <tr key={loan}>
              <td className="border p-1 font-semibold bg-gray-100">{loan.toLocaleString()}</td>
              {z[i].map((val, j) => (
                <td
                  key={j}
                  className={`border p-1 text-center ${getCellColor(val)}`}
                  title={`${(val * 100).toFixed(1)}%`}
                >
                  {(val * 100).toFixed(1)}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 text-xs">
        <span className="inline-block w-4 h-4 bg-green-200 mr-1 align-middle"></span> ≤ 28% &nbsp;
        <span className="inline-block w-4 h-4 bg-yellow-200 mr-1 align-middle"></span> 28% - 31% &nbsp;
        <span className="inline-block w-4 h-4 bg-red-200 mr-1 align-middle"></span> &gt; 31%
      </div>
    </div>
  )
}
