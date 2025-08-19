import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ExchangeRates from "./pages/ExchangeRates";
import About from "./pages/About";
import Error from "./pages/Error";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
