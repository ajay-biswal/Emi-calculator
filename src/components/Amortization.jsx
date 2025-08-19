import React from "react";

const Amortization = ({ emi, loanAmount, intrestRates, terms }) => {
  const p = parseFloat(loanAmount);
  const r = parseFloat(intrestRates) / 12 / 100;
  const n = parseFloat(terms) * 12;

  let balance = p;
  let schedule = [];

  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    const principal = emi - interest;
    balance -= principal;

    schedule.push({
      month: i,
      emi: emi.toFixed(2),
      principal: principal.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance > 0 ? balance.toFixed(2) : "0.00",
    });
  }
  return (
    <div className="mt-6">
      <h1 className="font-medium text-[22px]">Monthly EMI: {emi}</h1>
    </div>
  );
};

export default Amortization;
