// src/components/MortgageForm.jsx
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CalculateIcon from '@mui/icons-material/Calculate'
import Collapse from '@mui/material/Collapse'

export default function MortgageForm({ inputs, onChange, onCalculate, expanded, setExpanded }) {
  return (
    <Collapse in={expanded}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-medium">Address</label>
          <input
            id="address"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="address"
            placeholder="Address"
            value={inputs.address}
            onChange={onChange}
          />
          <label htmlFor="listPrice" className="font-medium">List Price ($)</label>
          <input
            id="listPrice"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="listPrice"
            placeholder="List Price ($)"
            value={inputs.listPrice ? parseFloat(inputs.listPrice).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <label htmlFor="offerPrice" className="font-medium">Offer Price ($)</label>
          <input
            id="offerPrice"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="offerPrice"
            placeholder="Offer Price ($)"
            value={inputs.offerPrice ? parseFloat(inputs.offerPrice).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <label htmlFor="downPaymentPct" className="font-medium">Downpayment (%)</label>
          <input
            id="downPaymentPct"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="downPaymentPct"
            placeholder="Downpayment (%)"
            value={inputs.downPaymentPct ? `${inputs.downPaymentPct}%` : ''}
            onChange={onChange}
            inputMode="decimal"
            pattern="[0-9.]*"
          />
          <label htmlFor="interestRatePct" className="font-medium">Interest Rate (%)</label>
          <input
            id="interestRatePct"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="interestRatePct"
            placeholder="Interest Rate (%)"
            value={inputs.interestRatePct ? `${inputs.interestRatePct}%` : ''}
            onChange={onChange}
            inputMode="decimal"
            pattern="[0-9.]*"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="taxes" className="font-medium">Annual Property Taxes ($)</label>
          <input
            id="taxes"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="taxes"
            placeholder="Annual Property Taxes ($)"
            value={inputs.taxes ? parseFloat(inputs.taxes).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <label htmlFor="insurance" className="font-medium">Annual Home Insurance ($)</label>
          <input
            id="insurance"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="insurance"
            placeholder="Annual Home Insurance ($)"
            value={inputs.insurance ? parseFloat(inputs.insurance).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <label htmlFor="grossMonthlyIncome" className="font-medium">Gross Monthly Income ($)</label>
          <input
            id="grossMonthlyIncome"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="grossMonthlyIncome"
            placeholder="Gross Monthly Income ($)"
            value={inputs.grossMonthlyIncome ? parseFloat(inputs.grossMonthlyIncome).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <label htmlFor="netMonthlyIncome" className="font-medium">Net Monthly Income ($)</label>
          <input
            id="netMonthlyIncome"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="netMonthlyIncome"
            placeholder="Net Monthly Income ($)"
            value={inputs.netMonthlyIncome ? parseFloat(inputs.netMonthlyIncome).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
          <label htmlFor="monthlyExpenses" className="font-medium">Monthly Expenses ($)</label>
          <input
            id="monthlyExpenses"
            className="border p-2 rounded bg-transparent focus:bg-white"
            type="text"
            name="monthlyExpenses"
            placeholder="Monthly Expenses ($)"
            value={inputs.monthlyExpenses ? parseFloat(inputs.monthlyExpenses).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : ''}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9,]*"
          />
        </div>
        <div className="sm:col-span-2 flex justify-center mt-2">
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalculateIcon />}
            onClick={() => {
              onCalculate();
              setExpanded(false);
            }}
          >
            Calculate
          </Button>
        </div>
      </div>
    </Collapse>
  )
}
