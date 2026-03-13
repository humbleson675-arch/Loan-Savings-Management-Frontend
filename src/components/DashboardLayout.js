// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function MemberDashboard() {
//   const navigate = useNavigate();

//   const [dashboard, setDashboard] = useState(null);
//   const [depositAmount, setDepositAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("mpesa");
//   const [loanAmount, setLoanAmount] = useState("");
//   const [loanDuration, setLoanDuration] = useState("3");

//   const token = localStorage.getItem("token");
//   const storedUser = JSON.parse(localStorage.getItem("user"));

//   /*
//   ===========================
//   FETCH DASHBOARD
//   ===========================
//   */
//   const fetchDashboard = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/member/dashboard",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setDashboard(res.data);
//     } 
    
//      catch (error) {
//   console.log(error.response?.data || error.message);
// }
    
//   }, [token]);

//   /*
//   ===========================
//   ROLE + TOKEN PROTECTION
//   ===========================
//   */
//   useEffect(() => {
//     if (!token || !storedUser) {
//       navigate("/login");
//       return;
//     }

//     if (storedUser.role !== "member") {
//       navigate("/"); // block non-members
//       return;
//     }

//     fetchDashboard();
//   }, [token, storedUser, navigate, fetchDashboard]);

//   /*
//   ===========================
//   SUBMIT DEPOSIT
//   ===========================
//   */
//   const handleDeposit = async () => {
//     if (!depositAmount) return alert("Enter amount");

//     await axios.post(
//       "http://localhost:8080/api/member/deposit",
//       { amount: Number(depositAmount), method: paymentMethod },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setDepositAmount("");
//     fetchDashboard();
//   };

//   /*
//   ===========================
//   REQUEST LOAN
//   ===========================
//   */
//   const requestLoan = async () => {
//     if (!loanAmount) return alert("Enter amount");

//     await axios.post(
//       "http://localhost:8080/api/member/loan",
//       { amount: Number(loanAmount), duration: Number(loanDuration) },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setLoanAmount("");
//     fetchDashboard();
//   };

//   /*
//   ===========================
//   LOGOUT
//   ===========================
//   */
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   if (!dashboard) return <div>Loading...</div>;

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Member Dashboard</h2>

//       <div>
//         <p>Savings: {dashboard.totalSavings}</p>
//         <p>Loans: {dashboard.totalLoanAmount}</p>
//         <p>Interest: {dashboard.totalInterest}</p>
//         <p>Balance: {dashboard.balance}</p>
//         <p>Credit Score: {Math.floor(dashboard.creditScore)}</p>
//       </div>

//       <hr />

//       <h3>Deposit</h3>
//       <input
//         placeholder="Amount"
//         value={depositAmount}
//         onChange={(e) => setDepositAmount(e.target.value)}
//       />
//       <select
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//       >
//         <option value="mpesa">M-Pesa</option>
//         <option value="airtel">Airtel Money</option>
//         <option value="paypal">PayPal</option>
//       </select>
//       <button onClick={handleDeposit}>Submit Deposit</button>

//       <hr />

//       <h3>Request Loan</h3>
//       <input
//         placeholder="Loan amount"
//         value={loanAmount}
//         onChange={(e) => setLoanAmount(e.target.value)}
//       />
//       <select
//         value={loanDuration}
//         onChange={(e) => setLoanDuration(e.target.value)}
//       >
//         <option value="3">3 Months</option>
//         <option value="6">6 Months</option>
//         <option value="12">12 Months</option>
//       </select>
//       <button onClick={requestLoan}>Submit Loan</button>

//       <hr />


//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default MemberDashboard;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MemberDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositType, setDepositType] = useState("group_savings");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("3");

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/member/dashboard",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDashboard(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token || !storedUser) {
      navigate("/login");
      return;
    }
    if (storedUser.role !== "member") {
      navigate("/");
      return;
    }
    fetchDashboard();
  }, [token, storedUser, navigate, fetchDashboard]);

  const handleDeposit = async () => {
    if (!depositAmount) return alert("Enter amount");

    await axios.post(
      "http://localhost:8080/api/member/deposit",
      {
        amount: Number(depositAmount),
        method: paymentMethod,
        type: depositType,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setDepositAmount("");
    fetchDashboard();
  };

  const requestLoan = async () => {
    if (!loanAmount) return alert("Enter amount");

    await axios.post(
      "http://localhost:8080/api/member/loan",
      { amount: Number(loanAmount), duration: Number(loanDuration) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setLoanAmount("");
    fetchDashboard();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!dashboard)
    return (
      <div style={{ textAlign: "center", marginTop: 100, fontSize: 22 }}>
        Loading...
      </div>
    );

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: 20, fontFamily: "Arial" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
        <h2>Member Dashboard</h2>
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 30 }}>
        {[
          { title: "Savings", value: dashboard.totalSavings },
          { title: "Loans", value: dashboard.totalLoanAmount },
          { title: "Interest", value: dashboard.totalInterest },
          { title: "Balance", value: dashboard.balance },
          { title: "Credit Score", value: Math.floor(dashboard.creditScore) },
        ].map((item, index) => (
          <div key={index} style={cardStyle}>
            <h4 style={{ color: "#666" }}>{item.title}</h4>
            <p style={{ fontSize: 22, fontWeight: "bold", color: "#2c3e50" }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
        {/* Deposit */}
        <div style={cardStyle}>
          <h3>Deposit</h3>
          <input
            type="number"
            placeholder="Enter amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            style={inputStyle}
          />
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={inputStyle}>
            <option value="mpesa">M-Pesa</option>
            <option value="airtel">Airtel Money</option>
            <option value="paypal">PayPal</option>
          </select>
          <select value={depositType} onChange={(e) => setDepositType(e.target.value)} style={inputStyle}>
            <option value="group_savings">Group Savings</option>
            <option value="loan_repayment">Loan Repayment</option>
          </select>
          <button onClick={handleDeposit} style={buttonStyle}>Submit Deposit</button>
        </div>

        {/* Loan */}
        <div style={cardStyle}>
          <h3>Request Loan</h3>
          <input
            type="number"
            placeholder="Loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            style={inputStyle}
          />
          <select value={loanDuration} onChange={(e) => setLoanDuration(e.target.value)} style={inputStyle}>
            <option value="1">1 Week</option>
            <option value="2">2 Weeks</option>
            <option value="3">3 Weeks</option>
            <option value="1m">1 Month</option>
            <option value="2m">2 Months</option>
            <option value="3m">3 Months</option>
            <option value="4m">4 Months</option>
            <option value="5m">5 Months</option>
          </select>
          <button onClick={requestLoan} style={buttonStyle}>Submit Loan</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: 10, marginTop: 10, marginBottom: 12, borderRadius: 6, border: "1px solid #ccc" };
const buttonStyle = { width: "100%", padding: 10, background: "#3498db", color: "white", border: "none", borderRadius: 6, cursor: "pointer" };
const cardStyle = { background: "white", padding: 25, borderRadius: 10, boxShadow: "0 3px 10px rgba(0,0,0,0.08)" };

export default MemberDashboard;