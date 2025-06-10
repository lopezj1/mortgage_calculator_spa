import React from 'react'
import Plot from 'react-plotly.js'

function getAmortizationData({ offerPrice, downPaymentPct, interestRatePct }) {
  const principal = parseFloat(offerPrice) || 0
  const downPayment = principal * ((parseFloat(downPaymentPct) || 0) / 100)
  const loanAmount = principal - downPayment
  const rate = (parseFloat(interestRatePct) || 0) / 100 / 12
  const n = 360
  const monthlyPayment = loanAmount > 0 && rate > 0
    ? (loanAmount * rate) / (1 - Math.pow(1 + rate, -n))
    : 0

  let balance = loanAmount
  const x = []
  const payment = []
  const interest = []
  const principalPaid = []

  for (let i = 1; i <= n; i++) {
    const interestPayment = balance * rate
    const principalPayment = monthlyPayment - interestPayment
    balance -= principalPayment
    x.push(i)
    payment.push(monthlyPayment)
    interest.push(interestPayment)
    principalPaid.push(principalPayment)
  }
  return { x, payment, interest, principalPaid }
}

export default function AmortizationChart({ inputs }) {
  const { x, payment, interest, principalPaid } = getAmortizationData(inputs)
  return (
    <Plot
      data={[
        {
          x,
          y: payment,
          type: 'scatter',
          mode: 'lines',
          name: 'Payment',
          line: { color: 'blue' },
        },
        {
          x,
          y: interest,
          type: 'scatter',
          mode: 'lines',
          name: 'Interest',
          line: { color: 'red' },
        },
        {
          x,
          y: principalPaid,
          type: 'scatter',
          mode: 'lines',
          name: 'Principal',
          line: { color: 'green' },
        },
      ]}
      layout={{
        title: { text: 'Amortization Over 30 Years', font: { size: 20 } },
        xaxis: { title: { text: 'Month', font: { size: 16 } }, range: [1, 360] },
        yaxis: { title: { text: 'Amount ($)', font: { size: 16 } } },
        legend: { orientation: 'h', y: -0.2 },
        autosize: true,
        margin: { t: 60, l: 60, r: 30, b: 60 },
      }}
      style={{ width: '100%', height: '400px' }}
      config={{ responsive: true, displayModeBar: false }}
    />
  )
}
