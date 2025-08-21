import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Amortization from "../components/Amortization";
const Home = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [intrestRates, setInterestRates] = useState(8.5);
  const [terms, setTerms] = useState(5);
  const [emi, setEmi] = useState(null);
  const [isvisible, setIsVisible] = useState(false);

  const calculateEmi = (e) => {
    e.preventDefault();

    const p = parseFloat(loanAmount);
    const annualRate = parseFloat(intrestRates);
    const years = parseFloat(terms);

    const r = annualRate / 12 / 100;
    const n = years * 12;

    if (p > 0 && r >= 0 && n > 0) {
      const calculatedEmi =
        (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(Number(calculatedEmi.toFixed(2)));
      setIsVisible(true);
    } else {
      setEmi(null);
      setIsVisible(false);
    }
  };

  return (
    <div className="mt-4 ml-[15%] bg-theme text-theme ">
      <h1 className=" text-[35px] heading-theme">Loan Calculator DashBoard</h1>
      <form className="flex flex-col mt-3" onSubmit={calculateEmi}>
        <div className="flex gap-x-4">
          <TextField
            label="Loan Amount"
            variant="outlined"
            required
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
          <TextField
            label="Intrest Rate(%)"
            variant="outlined"
            required
            value={intrestRates}
            onChange={(e) => setInterestRates(e.target.value)}
          />
          <TextField
            label="Term(Years)"
            variant="outlined"
            required
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-700 text-[#ffffff] text-[18px] px-5 py-2 rounded-lg cursor-pointer hover:shadow-2xl"
            type="submit"
          >
            Calculate
          </button>
        </div>
      </form>

      {isvisible && (
        <Amortization
          emi={emi}
          loanAmount={loanAmount}
          intrestRates={intrestRates}
          terms={terms}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
};

export default Home;
