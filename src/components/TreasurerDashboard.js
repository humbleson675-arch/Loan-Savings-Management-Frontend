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

  const [amount, setAmount] = useState("");
  const [fineAmount, setFineAmount] = useState("");
  const [contribution, setContribution] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Protect route & fetch data
  useEffect(() => {
    if (!token || !storedUser) {
      navigate("/login");
      return;
    }
    if (storedUser.role !== "treasurer") {
      navigate("/");
      return;
    }

    fetchLoans();
    fetchUsers();
    fetchRepayments();
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch data functions
  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/treasurer/loans", config);
      setLoans(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // Fetch financial report
const [report, setReport] = useState({});
const fetchReport = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/treasurer/financial-report", config);
    setReport(res.data);
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

  // Actions
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
      alert("Repayment recorded successfully");
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
      alert("Fine recorded successfully");
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
      alert("Contribution recorded successfully");
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

  // Reports
  const totalLoans = activeLoans.reduce((sum, l) => sum + Number(l.amount || 0), 0);
  const totalRepayments = repayments.reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const totalFines = transactions.filter((t) => t.type === "fine").reduce((sum, f) => sum + Number(f.amount), 0);
  const totalContributions = transactions.filter((t) => t.type === "contribution").reduce((sum, c) => sum + Number(c.amount), 0);
  const outstandingBalance = totalLoans - totalRepayments + totalFines;

  // Inline responsive styling
  const styles = {
    container: { padding: "30px", minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Arial" },
    title: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", marginBottom: "20px" },
    card: { padding: "20px", backgroundColor: "#eef2ff", borderRadius: "10px", cursor: "pointer", textAlign: "center", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
    section: { marginTop: "20px", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
    input: { padding: "6px", marginTop: "5px", width: "100%" },
    button: { marginTop: "10px", padding: "6px 10px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "5px" },
    logout: { marginTop: "30px", padding: "10px 15px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
    transactionCard: { display: "flex", justifyContent: "space-between", padding: "8px", marginTop: "8px", backgroundColor: "#f4f4f4", borderRadius: "5px", flexWrap: "wrap" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Treasurer Dashboard</div>

      {view === "home" && (
        <div style={styles.grid}>
          <div style={styles.card} onClick={() => setView("activeLoans")}>View Active Loans</div>
          <div style={styles.card} onClick={() => setView("repayments")}>Record Repayments</div>
          <div style={styles.card} onClick={() => setView("fines")}>Record Fines & Interest</div>
          <div style={styles.card} onClick={() => setView("contributions")}>Record Member Contributions</div>
          <div style={styles.card} onClick={() => setView("transactions")}>Transaction History</div>
          <div style={styles.card} onClick={() => setView("reports")}>Generate Financial Reports</div>
        </div>
      )}

      {/* Active Loans */}
      {view === "activeLoans" && (
        <div style={styles.section}>
          <h3>Active Loans</h3>
          {activeLoans.map((loan) => (
            <div key={loan._id} style={styles.transactionCard}>
              Member: {users.find(u => u._id === loan.userId)?.name || "Unknown"} | Amount: {loan.amount}
            </div>
          ))}
          <button style={styles.button} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Repayments */}
      {view === "repayments" && (
        <div style={styles.section}>
          <h3>Record Repayments</h3>
          {activeLoans.map((loan) => (
            <div key={loan._id} style={styles.transactionCard}>
              Member: {users.find(u => u._id === loan.userId)?.name || "Unknown"} | Loan: {loan.amount}
              <input style={styles.input} placeholder="Repayment Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <button style={styles.button} onClick={() => recordRepayment(loan._id)}>Record</button>
            </div>
          ))}
          <button style={styles.button} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Fines */}
      {view === "fines" && (
        <div style={styles.section}>
          <h3>Record Fine / Interest</h3>
          {activeLoans.map((loan) => (
            <div key={loan._id} style={styles.transactionCard}>
              Loan: {loan.amount}
              <input style={styles.input} placeholder="Fine amount" value={fineAmount} onChange={(e) => setFineAmount(e.target.value)} />
              <button style={styles.button} onClick={() => recordFine(loan._id)}>Add Fine</button>
            </div>
          ))}
          <button style={styles.button} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Contributions */}
      {view === "contributions" && (
        <div style={styles.section}>
          <h3>Record Member Contributions</h3>
          {users.map((user) => (
            <div key={user._id} style={styles.transactionCard}>
              {user.name}
              <input style={styles.input} placeholder="Contribution Amount" value={contribution} onChange={(e) => setContribution(e.target.value)} />
              <button style={styles.button} onClick={() => recordContribution(user._id)}>Record</button>
            </div>
          ))}
          <button style={styles.button} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Transactions */}
      {view === "transactions" && (
        <div style={styles.section}>
          <h3>Transaction History</h3>
          {transactions.map((t) => (
            <div key={t._id || t.id} style={styles.transactionCard}>
              {t.date} - {t.type} - {t.amount} | Member: {users.find(u => u._id === t.userId)?.name || "N/A"}
            </div>
          ))}
          <button style={styles.button} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Reports */}
      {view === "reports" && (
        <div style={styles.section}>
          <h3>Financial Summary</h3>
          <p>Total Active Loans: {totalLoans}</p>
          <p>Total Repayments: {totalRepayments}</p>
          <p>Total Fines Collected: {totalFines}</p>
          <p>Total Contributions: {totalContributions}</p>
          <p>Outstanding Balance: {outstandingBalance}</p>
          <button style={styles.button} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      <button style={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default TreasurerDashboard;