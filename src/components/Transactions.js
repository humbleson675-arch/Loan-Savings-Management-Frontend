import React from "react";

function Transactions() {
  // Sample data (replace with backend API later)
  const transactions = [
    {
      id: 1,
      date: "2026-01-10",
      type: "Savings",
      amount: 5000,
      status: "Completed",
    },
    {
      id: 2,
      date: "2026-01-15",
      type: "Loan Disbursement",
      amount: 30000,
      status: "Approved",
    },
    {
      id: 3,
      date: "2026-02-01",
      type: "Repayment",
      amount: 7000,
      status: "Completed",
    },
    {
      id: 4,
      date: "2026-02-05",
      type: "Savings",
      amount: 3000,
      status: "Completed",
    },
  ];

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>

      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Type</th>
              <th>Amount (KES)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No transactions available
                </td>
              </tr>
            ) : (
              transactions.map((item) => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.type}</td>
                  <td>{item.amount}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;