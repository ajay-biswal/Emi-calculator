import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ExchangeRateProvider } from "./context/ExchangeRatesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ExchangeRateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ExchangeRateProvider>
    </ThemeProvider>
  </StrictMode>
);
