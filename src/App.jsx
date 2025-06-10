import { useState } from 'react'
import './App.css'
import MortgageForm from './components/MortgageForm'
import MortgageResults from './components/MortgageResults'
import { calculateMortgage } from './lib/mortgage'
import LoanTaxTable from './components/LoanTaxTable'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'

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
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleCalculate = () => {
    setResults(calculateMortgage(inputs))
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center p-2 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded shadow mt-4 p-2 sm:p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Mortgage Calculator</h1>
        <MortgageForm
          inputs={inputs}
          onChange={handleChange}
          onCalculate={handleCalculate}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        {!expanded && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            className="mt-2 mb-4"
            onClick={() => {
              setExpanded(true)
              setResults(null)
            }}
          >
            Edit Inputs
          </Button>
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
