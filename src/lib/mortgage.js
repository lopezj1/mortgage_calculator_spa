// src/lib/mortgage.js
// Utility function for mortgage calculations
export function calculateMortgage(inputs) {
  const listPrice = parseFloat(inputs.listPrice) || 0;
  const offerPrice = parseFloat(inputs.offerPrice) || 0;
  const downPaymentPct = parseFloat(inputs.downPaymentPct) || 0;
  const interestRatePct = parseFloat(inputs.interestRatePct) || 0;
  const grossMonthlyIncome = parseFloat(inputs.grossMonthlyIncome) || 0;
  const netMonthlyIncome = parseFloat(inputs.netMonthlyIncome) || 0;
  const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;
  const taxes = parseFloat(inputs.taxes) || 0;
  const insurance = parseFloat(inputs.insurance) || 0;

  const downPayment = offerPrice * (downPaymentPct / 100);
  const loanAmount = offerPrice - downPayment;
  const monthlyInterestRate = interestRatePct / 100 / 12;
  const n = 30 * 12; // 30 years
  const monthlyPayment = loanAmount > 0 && monthlyInterestRate > 0
    ? (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -n))
    : 0;
  const monthlyTaxes = taxes / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthlyHouseExpense = monthlyPayment + monthlyTaxes + monthlyInsurance;
  const totalPayment = monthlyPayment * n;
  const emergencyFund3 = (monthlyExpenses || 0) * 3;
  const emergencyFund6 = (monthlyExpenses || 0) * 6;
  const mortgagePctGross = grossMonthlyIncome > 0 ? (totalMonthlyHouseExpense / grossMonthlyIncome) * 100 : 0;

  return {
    loanAmount,
    monthlyPayment,
    totalMonthlyHouseExpense,
    totalPayment,
    emergencyFund3,
    emergencyFund6,
    mortgagePctGross,
    monthlyTaxes,
    monthlyInsurance,
  };
}
