// src/components/AmortizationChart.jsx
import React from 'react'
import {
  AreaChart, Area, LineChart, Line,
  ComposedChart, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

function buildYearlyData({ offerPrice, downPaymentPct, interestRatePct }) {
  const principal = parseFloat(offerPrice) || 0
  const downPayment = principal * ((parseFloat(downPaymentPct) || 0) / 100)
  const loanAmount = principal - downPayment
  const rate = (parseFloat(interestRatePct) || 0) / 100 / 12
  const n = 360
  const monthlyPayment =
    loanAmount > 0 && rate > 0
      ? (loanAmount * rate) / (1 - Math.pow(1 + rate, -n))
      : 0

  let balance = loanAmount
  const data = []

  for (let year = 1; year <= 30; year++) {
    let yearInterest = 0
    let yearPrincipal = 0
    for (let m = 0; m < 12; m++) {
      const interestPmt = balance * rate
      const principalPmt = monthlyPayment - interestPmt
      balance = Math.max(0, balance - principalPmt)
      yearInterest += interestPmt
      yearPrincipal += principalPmt
    }
    data.push({
      year,
      Interest: Math.round(yearInterest),
      Principal: Math.round(yearPrincipal),
      Balance: Math.max(0, Math.round(balance)),
    })
  }

  return { data, loanAmount, monthlyPayment }
}

function fmtCurrency(v) {
  if (v === undefined || v === null) return ''
  return v >= 1000
    ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`
    : `$${v}`
}

function fmtFull(v) {
  return v?.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl text-xs space-y-1.5 min-w-[160px]">
      <p className="font-bold text-slate-300 mb-1">Year {label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-semibold">{fmtFull(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

function CustomLegend({ payload }) {
  return (
    <div className="flex justify-center gap-6 mt-2">
      {payload.map((p) => (
        <span key={p.value} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: p.color }} />
          {p.value}
        </span>
      ))}
    </div>
  )
}

export default function AmortizationChart({ inputs }) {
  const { data, loanAmount, monthlyPayment } = buildYearlyData(inputs)

  if (!loanAmount || !monthlyPayment) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Enter loan details to see the amortization chart.
      </div>
    )
  }

  const totalPaid = monthlyPayment * 360
  const totalInterest = totalPaid - loanAmount

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Amortization Schedule</h2>
          <p className="text-sm text-slate-500 mt-0.5">Annual principal &amp; interest breakdown over 30 years</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Interest</p>
            <p className="text-lg font-bold text-rose-600">{fmtFull(totalInterest)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Paid</p>
            <p className="text-lg font-bold text-slate-800">{fmtFull(totalPaid)}</p>
          </div>
        </div>
      </div>

      {/* Stacked area: yearly principal vs interest */}
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.85} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />

          <XAxis
            dataKey="year"
            tickFormatter={(v) => `Yr ${v}`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            yAxisId="payment"
            tickFormatter={fmtCurrency}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <YAxis
            yAxisId="balance"
            orientation="right"
            tickFormatter={fmtCurrency}
            tick={{ fontSize: 11, fill: '#cbd5e1' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 2' }} />
          <Legend content={<CustomLegend />} />

          <Area
            yAxisId="payment"
            type="monotone"
            dataKey="Interest"
            stackId="payment"
            stroke="#f43f5e"
            strokeWidth={1.5}
            fill="url(#gradInterest)"
          />
          <Area
            yAxisId="payment"
            type="monotone"
            dataKey="Principal"
            stackId="payment"
            stroke="#2563eb"
            strokeWidth={1.5}
            fill="url(#gradPrincipal)"
          />
          <Line
            yAxisId="balance"
            type="monotone"
            dataKey="Balance"
            stroke="#94a3b8"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
            name="Remaining Balance"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <p className="text-center text-xs text-slate-400 mt-3">
        Dashed line = remaining loan balance (right axis)
      </p>
    </div>
  )
}
