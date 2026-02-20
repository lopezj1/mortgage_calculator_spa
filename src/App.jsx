import { useState } from 'react'
import './App.css'
import MortgageForm from './components/MortgageForm'
import MortgageResults from './components/MortgageResults'
import { calculateMortgage } from './lib/mortgage'
import LoanTaxTable from './components/LoanTaxTable'
import { PencilIcon } from 'lucide-react'

const CURRENCY_FIELDS = new Set([
  'listPrice', 'offerPrice', 'taxes', 'insurance',
  'grossMonthlyIncome', 'netMonthlyIncome', 'monthlyExpenses',
])
const PERCENT_FIELDS = new Set(['downPaymentPct', 'interestRatePct'])

function App() {
  const [inputs, setInputs] = useState({
    address: '123 Main St',
    listPrice: '339000',
    offerPrice: '339000',
    downPaymentPct: '20',
    interestRatePct: '3.5',
    grossMonthlyIncome: '8000',
    netMonthlyIncome: '5000',
    monthlyExpenses: '3196',
    taxes: '6500',
    insurance: '800',
  })
  const [results, setResults] = useState(null)
  const [expanded, setExpanded] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    let clean = value
    if (CURRENCY_FIELDS.has(name)) clean = value.replace(/[^0-9.]/g, '')
    else if (PERCENT_FIELDS.has(name)) clean = value.replace(/[^0-9.]/g, '')
    setInputs((prev) => ({ ...prev, [name]: clean }))
  }

  const handleCalculate = () => {
    setResults(calculateMortgage(inputs))
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-slate-200 mt-6 p-4 sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 mb-6 text-center">Mortgage Calculator</h1>
        <MortgageForm
          inputs={inputs}
          onChange={handleChange}
          onCalculate={handleCalculate}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        {!expanded && (
          <button
            className="mt-2 mb-4 border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
            onClick={() => {
              setExpanded(true)
              setResults(null)
            }}
          >
            <PencilIcon size={14} />
            Edit Inputs
          </button>
        )}
        {!expanded && results && (
          <>
            <MortgageResults results={results} inputs={inputs} />
            <LoanTaxTable grossMonthlyIncome={inputs.grossMonthlyIncome} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
