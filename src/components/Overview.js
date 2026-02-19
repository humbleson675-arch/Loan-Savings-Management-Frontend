import React from "react";

function Overview() {
  // sample summary data (replace with API later)
  const summary = {
    totalSavings: 45000,
    activeLoan: 1,
    loanBalance: 18000,
    nextRepaymentDate: "2026-02-20",
  };

  return (
    <div className="overview-page">
      <h2>Dashboard Overview</h2>

      <div className="overview-cards">
        <div className="card">
          <h4>Total Savings</h4>
          <p>KES {summary.totalSavings}</p>
        </div>

        <div className="card">
          <h4>Active Loans</h4>
          <p>{summary.activeLoan}</p>
        </div>

        <div className="card">
          <h4>Outstanding Loan Balance</h4>
          <p>KES {summary.loanBalance}</p>
        </div>

        <div className="card">
          <h4>Next Repayment Date</h4>
          <p>{summary.nextRepaymentDate}</p>
        </div>
      </div>

      <div className="overview-actions">
        <button className="btn">Apply for Loan</button>
        <button className="btn secondary">Make Repayment</button>
        <button className="btn outline">Add Savings</button>
      </div>
    </div>
  );
}

export default Overview;