import React from "react";

function Repayments() {
  // sample data (later this will come from backend)
  const repayments = [
    {
      id: 1,
      loanId: "LN-001",
      amount: 5000,
      dueDate: "2026-02-20",
      status: "Pending",
    },
    {
      id: 2,
      loanId: "LN-002",
      amount: 3000,
      dueDate: "2026-01-15",
      status: "Paid",
    },
  ];

  return (
    <div className="repayments-page">
      <h2>Loan Repayments</h2>

      <table className="repayments-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Loan ID</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {repayments.map((repay, index) => (
            <tr key={repay.id}>
              <td>{index + 1}</td>
              <td>{repay.loanId}</td>
              <td>KES {repay.amount}</td>
              <td>{repay.dueDate}</td>
              <td>
                <span
                  className={
                    repay.status === "Paid"
                      ? "status-paid"
                      : "status-pending"
                  }
                >
                  {repay.status}
                </span>
              </td>
              <td>
                {repay.status === "Pending" ? (
                  <button className="btn-pay">Pay Now</button>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Repayments;