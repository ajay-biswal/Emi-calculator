// src/context/ExchangeRatesContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;

const ExchangeRateContext = createContext();

export function useExchangeRate() {
  const context = useContext(ExchangeRateContext);
  if (!context) {
    throw new Error(
      "useExchangeRate must be used within an exchangeRate Provider"
    );
  }
  return context;
}

export function ExchangeRateProvider({ children }) {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        setRates(response.data.conversion_rates);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRates(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const value = {
    rates,
    loading,
    error,
  };

  return (
    <ExchangeRateContext.Provider value={value}>
      {children}
    </ExchangeRateContext.Provider>
  );
}
