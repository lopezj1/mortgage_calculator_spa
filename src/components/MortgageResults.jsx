// src/components/MortgageResults.jsx
import React from 'react'
import AmortizationChart from './AmortizationChart'

export default function MortgageResults({ results, inputs }) {
  if (!results) return null
  return (
    <div className="mt-6 text-left">
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      <ul className="space-y-1">
        <li><strong>Loan Amount:</strong> ${results.loanAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>Monthly Mortgage Payment:</strong> ${results.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>Monthly Property Taxes:</strong> ${results.monthlyTaxes.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>Monthly Home Insurance:</strong> ${results.monthlyInsurance.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>Total Monthly House Expense:</strong> ${results.totalMonthlyHouseExpense.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>30 Year Total Payment:</strong> ${results.totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>3 Month Emergency Fund:</strong> ${results.emergencyFund3.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>6 Month Emergency Fund:</strong> ${results.emergencyFund6.toLocaleString(undefined, {maximumFractionDigits: 2})}</li>
        <li><strong>Mortgage as % of Gross Monthly Income:</strong> {results.mortgagePctGross.toLocaleString(undefined, {maximumFractionDigits: 2})}%</li>
      </ul>
      <div className="mt-8">
        <AmortizationChart inputs={inputs} />
      </div>
    </div>
  )
}
