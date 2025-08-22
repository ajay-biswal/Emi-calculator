import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useExchangeRate } from "../context/ExchangeRatesContext";

const Amortization = ({ setIsVisible, loanAmount, intrestRates, terms }) => {
  const { rates, loading, error } = useExchangeRate();
  const [currency, setCurrency] = useState("USD");

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!rates) return <p>No exchange rates available.</p>;

  // Calculate EMI correctly
  const totalMonths = terms * 12;
  const monthlyRate = intrestRates / 12 / 100;

  const emi = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / totalMonths;
    return (
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  }, [loanAmount, monthlyRate, totalMonths]);

  // Currency conversion
  const convertedEMI = rates[currency]
    ? (emi * rates[currency]).toFixed(2)
    : emi;

  const formatCurrency = (value, curr) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 2,
    }).format(value);

  // Build Amortization Schedule
  const schedule = useMemo(() => {
    let balance = loanAmount;
    let rows = [];

    for (let i = 1; i <= totalMonths; i++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance = balance - principal;

      rows.push({
        month: i,
        interest,
        principal,
        emi,
        balance: balance > 0 ? balance : 0,
      });
    }

    return rows;
  }, [loanAmount, monthlyRate, totalMonths, emi]);

  return (
    <div className="mt-6 h-calc(100vh - 100px)">
      <h1 className="font-medium text-[22px] mb-2">
        Base EMI (USD): {formatCurrency(emi, "USD")}
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Box sx={{ minWidth: 120 }}>
            <FormControl size="small" sx={{ width: 80 }}>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <h1 className="flex text-lg font-medium gap-x-1">
            Converted EMI: {convertedEMI}
            <span className="flex gap-x-3">{currency}</span>
          </h1>
        </div>

        <div className="mr-[10%]">
          <button
            onClick={() => setIsVisible(false)}
            className="border-1 border-purple-900 bg-white rounded-md px-6 py-3 text-purple-900 font-medium cursor-pointer"
          >
            Reset Table
          </button>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="border mr-[10%] mt-4 border-white shadow-xl h-[30rem] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-white text-black">
            <tr>
              <th
                colSpan="4"
                className="font-medium text-xl px-3 py-3  text-left"
              >
                Amortization Schedule ({currency})
              </th>
            </tr>
            <tr className="border-b border-gray-200 sticky top-[3rem] z-10">
              <th className="px-3 py-3 text-left">Month</th>
              <th className="py-3  text-right">Principal</th>
              <th className="py-3 text-right">Intrest</th>
              <th className="px-3 py-3 text-right">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month} className="border-b border-gray-200">
                <td className="px-3 py-4 text-left">{row.month}</td>
                <td className="py-4  text-right">
                  {row.principal.toFixed(2)} {currency}
                </td>
                <td className="py-4 text-right">
                  {row.interest.toFixed(2)} {currency}
                </td>
                <td className="px-3 py-4 text-right">
                  {row.balance.toFixed(2)} {currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Amortization;
