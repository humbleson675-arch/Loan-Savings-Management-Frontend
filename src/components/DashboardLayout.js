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
  const [withdrawAmount, setWithdrawAmount] = useState("");

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

  // const requestLoan = async () => {
  //   if (!loanAmount) return alert("Enter amount");

  //   await axios.post(
  //     "http://localhost:8080/api/member/loan",
  //     { amount: Number(loanAmount), duration: Number(loanDuration) },
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );

  //   setLoanAmount("");
  //   fetchDashboard();
  // };
  const requestLoan = async () => {
  if (!loanAmount || !loanDuration) return alert("Enter amount and duration");

  try {
    const res = await axios.post(
      "http://localhost:8080/api/member/loan",
      { amount: Number(loanAmount), duration: Number(loanDuration) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(res.data.message);
    setLoanAmount("");
    fetchDashboard();
  } catch (error) {
    console.error("Loan request error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Loan request failed");
  }
};

    const handleWithdraw = async () => {
  if (!withdrawAmount) return alert("Enter withdraw amount");

  try {
    await axios.post(
      "http://localhost:8080/api/member/withdraw",
      { amount: Number(withdrawAmount) },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setWithdrawAmount("");
    fetchDashboard();
  } catch (error) {
    alert(error.response?.data?.message || "Withdraw failed");
  }
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
   <div style={containerStyle}>
      {/* HEADER */}
        <div style={headerStyle}>
        <h2>Member Dashboard</h2>
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>

      {/* STATS */}
      <div style={statsGrid}>
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
       <div style={actionsGrid}>
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
         <button onClick={handleDeposit} style={depositButton}>
  Submit Deposit
</button>
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
            <option value>1 Week</option>
            <option value>2 Weeks</option>
            <option value>3 Weeks</option>
            <option value>1 Month</option>
            <option value>2 Months</option>
            <option value>3 Months</option>
            <option value>4 Months</option>
            <option value>5 Months</option>
          </select>
         <button onClick={requestLoan} style={loanButton}>Submit Loan</button>
        </div>
        {/* Withdraw */}
<div style={cardStyle}>
  <h3>Withdraw</h3>

  <input
    type="number"
    placeholder="Withdraw amount"
    value={withdrawAmount}
    onChange={(e) => setWithdrawAmount(e.target.value)}
    style={inputStyle}
  />

  <button onClick={handleWithdraw} style={withdrawButton}>
  Withdraw Money
</button>
</div>
      </div>
    </div>
  );
}



export default MemberDashboard;


const containerStyle = {
  maxWidth: "1200px",
  margin: "auto",
  padding: "20px",
  fontFamily: "Segoe UI, Arial",
  background: "#f4f6f9",
  minHeight: "100vh"
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  background: "#2c3e50",
  padding: "15px 20px",
  borderRadius: "10px",
  color: "white"
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const actionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "20px"
};

// const statCard = {
//   background: "white",
//   padding: "20px",
//   borderRadius: "10px",
//   textAlign: "center",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
// };

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.2s"
};

const depositButton = {
  ...buttonStyle,
  background: "#27ae60"
};

const loanButton = {
  ...buttonStyle,
  background: "#f39c12"
};

const withdrawButton = {
  ...buttonStyle,
  background: "#e74c3c"
};