import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TreasurerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [view, setView] = useState("home");
  const [loans, setLoans] = useState([]);
  const [repayments, setRepayments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [report, setReport] = useState({});
  const [amount, setAmount] = useState("");
  const [fineAmount, setFineAmount] = useState("");
  const [contribution, setContribution] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Protect route & fetch data
  useEffect(() => {
    if (!token || !storedUser) return navigate("/login");
    if (storedUser.role !== "treasurer") return navigate("/");

    fetchLoans();
    fetchUsers();
    fetchRepayments();
    fetchTransactions();
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/treasurer/loans", config);
      setLoans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/treasurer/users", config);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRepayments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/treasurer/repayments", config);
      setRepayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/treasurer/transactions", config);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReport = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/treasurer/financial-report", config);
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const recordRepayment = async (loanId) => {
    if (!amount) return alert("Enter repayment amount");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/treasurer/repayments",
        { loanId, amount: Number(amount) },
        config
      );
      setRepayments([...repayments, res.data]);
      setTransactions([...transactions, res.data]);
      setAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  const recordFine = async (loanId) => {
    if (!fineAmount) return alert("Enter fine amount");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/treasurer/fines",
        { loanId, amount: Number(fineAmount) },
        config
      );
      setTransactions([...transactions, res.data]);
      setFineAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  const recordContribution = async (userId) => {
    if (!contribution) return alert("Enter contribution amount");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/treasurer/contributions",
        { userId, amount: Number(contribution) },
        config
      );
      setTransactions([...transactions, res.data]);
      setContribution("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const activeLoans = loans.filter((l) => l.status === "approved");

  // Responsive styling with media queries
  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
      backgroundColor: "#f1f5f9",
      fontFamily: "Segoe UI, Arial, sans-serif",
    },
    title: { fontSize: "28px", fontWeight: "bold", marginBottom: "25px", color: "#1f2937", textAlign: "center" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
      marginBottom: "30px",
    },
    card: {
      padding: "20px",
      backgroundColor: "#2563eb",
      color: "#fff",
      borderRadius: "10px",
      fontWeight: "bold",
      textAlign: "center",
      cursor: "pointer",
      transition: "0.3s",
    },
    cardHover: { transform: "translateY(-5px)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
    section: { marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 6px 15px rgba(0,0,0,0.05)" },
    transactionCard: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      marginTop: "8px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      flexWrap: "wrap",
    },
    input: { padding: "8px", marginTop: "5px", width: "100%", borderRadius: "6px", border: "1px solid #d1d5db" },
    button: { padding: "8px 12px", marginLeft: "5px", marginTop: "8px", backgroundColor: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" },
    backButton: { padding: "10px 15px", marginTop: "15px", backgroundColor: "#6b7280", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    logout: { marginTop: "30px", padding: "12px", backgroundColor: "#dc2626", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", width: "100%", transition: "0.3s" },
    // media query for mobile
    "@media(max-width: 768px)": {
      grid: { gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" },
      card: { padding: "15px", fontSize: "14px" },
      input: { padding: "6px", fontSize: "14px" },
      button: { padding: "6px 10px", fontSize: "14px" },
    },
    "@media(max-width: 480px)": {
      grid: { gridTemplateColumns: "1fr", gap: "10px" },
      card: { padding: "12px", fontSize: "13px" },
      input: { padding: "5px", fontSize: "13px" },
      button: { padding: "5px 8px", fontSize: "13px" },
      title: { fontSize: "22px" },
    },
  };

  // Function to apply hover styles
  const handleHover = (e, hover = true) => {
    e.currentTarget.style.transform = hover ? "translateY(-5px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = hover ? "0 8px 20px rgba(0,0,0,0.15)" : "none";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Treasurer Dashboard</h2>

      {view === "home" && (
        <div style={styles.grid}>
          {["Active Loans", "Record Repayments", "Record Fines", "Record Contributions", "Transactions", "Reports"].map((text, i) => (
            <div
              key={i}
              style={styles.card}
              onClick={() => {
                const views = ["activeLoans", "repayments", "fines", "contributions", "transactions", "reports"];
                setView(views[i]);
              }}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              {text}
            </div>
          ))}
        </div>
      )}

      {/* Views: Active Loans, Repayments, Fines, Contributions, Transactions, Reports */}
      {/* Reuse the previous structure but styled section and transactionCard remain responsive */}
      {view === "activeLoans" && (
        <div style={styles.section}>
          <h3>Active Loans</h3>
          {activeLoans.map((loan) => (
            <div key={loan._id} style={styles.transactionCard}>
              Member: {users.find((u) => u._id === loan.userId)?.name || "Unknown"} | Amount: {loan.amount}
            </div>
          ))}
          <button style={styles.backButton} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {view === "repayments" && (
        <div style={styles.section}>
          <h3>Record Repayments</h3>
          {activeLoans.map((loan) => (
            <div key={loan._id} style={styles.transactionCard}>
              Member: {users.find((u) => u._id === loan.userId)?.name || "Unknown"} | Loan: {loan.amount}
              <input style={styles.input} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <button style={styles.button} onClick={() => recordRepayment(loan._id)}>Record</button>
            </div>
          ))}
          <button style={styles.backButton} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {view === "fines" && (
        <div style={styles.section}>
          <h3>Record Fines / Interest</h3>
          {activeLoans.map((loan) => (
            <div key={loan._id} style={styles.transactionCard}>
              Loan: {loan.amount}
              <input style={styles.input} placeholder="Fine amount" value={fineAmount} onChange={(e) => setFineAmount(e.target.value)} />
              <button style={styles.button} onClick={() => recordFine(loan._id)}>Add Fine</button>
            </div>
          ))}
          <button style={styles.backButton} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {view === "contributions" && (
        <div style={styles.section}>
          <h3>Record Member Contributions</h3>
          {users.map((user) => (
            <div key={user._id} style={styles.transactionCard}>
              {user.name}
              <input style={styles.input} placeholder="Contribution" value={contribution} onChange={(e) => setContribution(e.target.value)} />
              <button style={styles.button} onClick={() => recordContribution(user._id)}>Record</button>
            </div>
          ))}
          <button style={styles.backButton} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {view === "transactions" && (
        <div style={styles.section}>
          <h3>Transaction History</h3>
          {transactions.map((t) => (
            <div key={t._id || t.id} style={styles.transactionCard}>
              {t.date} - {t.type} - {t.amount} | Member: {users.find((u) => u._id === t.userId)?.name || "N/A"}
            </div>
          ))}
          <button style={styles.backButton} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {view === "reports" && (
        <div style={styles.section}>
          <h3>Financial Summary</h3>
          <p>Total Active Loans: {report.totalLoans || 0}</p>
          <p>Total Repayments: {report.totalRepayments || 0}</p>
          <p>Total Fines: {report.totalFines || 0}</p>
          <p>Total Contributions: {report.totalContributions || 0}</p>
          <p>Outstanding Balance: {report.outstanding || 0}</p>
          <button style={styles.backButton} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      <button
        style={styles.logout}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default TreasurerDashboard;