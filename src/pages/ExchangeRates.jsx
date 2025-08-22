import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { useExchangeRate } from "../context/ExchangeRatesContext.jsx";
const ExchangeRates = () => {
  const { rates, loading, error } = useExchangeRate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Fetching Rates</p>;
  if (!rates) return null;

  const entries = Object.entries(rates);
  const paginatedRates = entries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="w-full h-screen">
      <div className="m-4 ">
        <h1 className="mt-10 px-4 py-4 font-medium text-lg border-t border-gray-200">
          Live Exchange Rates (Base USD)
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-4 text-left">Currency</th>
              <th className="px-4 py-4 text-right">Rate</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRates.map(([currency, value]) => (
              <tr className="border-b border-gray-200">
                <td className="px-4 py-4 text-left">{currency}</td>
                <td className="px-4 py-4 text-right">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          component="div"
          count={entries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </div>
  );
};

export default ExchangeRates;
