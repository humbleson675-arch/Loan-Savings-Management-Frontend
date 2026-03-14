import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [view, setView] = useState("home");
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [reports, setReports] = useState({});
  const [repaymentAmount, setRepaymentAmount] = useState("");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token || !storedUser) return navigate("/login");
    if (storedUser.role !== "admin") return navigate("/");

    fetchUsers();
    fetchLoans();
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch functions
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users", config);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/loans", config);
      setLoans(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/reports", config);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Member actions
  const approveMember = async (id) => {
    await axios.put(`http://localhost:8080/api/admin/users/${id}/approve`, {}, config);
    fetchUsers();
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    await axios.delete(`http://localhost:8080/api/admin/users/${id}`, config);
    fetchUsers();
  };

  // Loan actions
  const approveLoan = async (id) => {
    await axios.put(`http://localhost:8080/api/admin/loans/${id}/approve`, {}, config);
    fetchLoans();
    fetchReports();
  };

  const rejectLoan = async (id) => {
    await axios.put(`http://localhost:8080/api/admin/loans/${id}/reject`, {}, config);
    fetchLoans();
  };

  // Repayment
  const recordRepayment = async (loanId) => {
    if (!repaymentAmount) return alert("Enter amount");
    await axios.post(
      "http://localhost:8080/api/admin/repayments",
      { loanId, amount: Number(repaymentAmount) },
      config
    );
    setRepaymentAmount("");
    fetchReports();
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Filtered data
  const approvedLoans = loans.filter((l) => l.status === "approved");
  const pendingLoans = loans.filter((l) => l.status === "pending");
  const pendingUsers = users.filter((u) => !u.approved);
  const activeMembers = users.filter((u) => u.approved);

  // Modern responsive styles
  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      background: "#f1f5f9",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "25px",
      color: "#1f2937",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
      marginBottom: "30px",
    },
    card: {
      padding: "20px",
      background: "#2563eb",
      color: "#fff",
      borderRadius: "10px",
      fontWeight: "bold",
      textAlign: "center",
      cursor: "pointer",
      transition: "0.3s",
    },
    cardHover: {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    },
    section: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      marginBottom: "20px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "8px",
      backgroundColor: "#f9fafb",
    },
    columnRow: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      backgroundColor: "#f9fafb",
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      padding: "8px 12px",
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.2s",
    },
    dangerBtn: {
      padding: "8px 12px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.2s",
    },
    backBtn: {
      marginTop: "15px",
      padding: "10px 15px",
      backgroundColor: "#6b7280",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      width: "100%",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
    },
    logoutBtn: {
      marginTop: "25px",
      padding: "12px",
      background: "#111827",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      width: "100%",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      {view === "home" && (
        <div style={styles.grid}>
          {["Approve Members", "Approve Loans", "Record Repayments", "Financial Reports", "Active Members"].map((text, i) => (
            <button
              key={i}
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0px)"}
              onClick={() => {
                const views = ["members", "loans", "repayments", "reports", "active"];
                setView(views[i]);
              }}
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Members view */}
      {view === "members" && (
        <div style={styles.section}>
          <h3>Pending Members</h3>
          {pendingUsers.map((user) => (
            <div key={user._id} style={styles.row}>
              <div>
                {user.name} <br />
                <small>{user.email}</small>
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.primaryBtn} onClick={() => approveMember(user._id)}>Approve</button>
                <button style={styles.dangerBtn} onClick={() => deleteMember(user._id)}>Delete</button>
              </div>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Loans view */}
      {view === "loans" && (
        <div style={styles.section}>
          <h3>Pending Loans</h3>
          {pendingLoans.map((loan) => (
            <div key={loan._id} style={styles.row}>
              <div>
                {loan.userId?.name} <br />
                <small>Amount: {loan.amount}</small>
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.primaryBtn} onClick={() => approveLoan(loan._id)}>Approve</button>
                <button style={styles.dangerBtn} onClick={() => rejectLoan(loan._id)}>Reject</button>
              </div>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Repayments view */}
      {view === "repayments" && (
        <div style={styles.section}>
          <h3>Approved Loans</h3>
          {approvedLoans.map((loan) => (
            <div key={loan._id} style={styles.columnRow}>
              <div>
                {loan.userId?.name} <br />
                <small>Loan: {loan.amount}</small>
              </div>
              <input
                style={styles.input}
                placeholder="Repayment Amount"
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(e.target.value)}
              />
              <button style={styles.primaryBtn} onClick={() => recordRepayment(loan._id)}>Record</button>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Reports view */}
      {view === "reports" && (
        <div style={styles.section}>
          <h3>Financial Reports</h3>
          <p>Total Loans: {reports.totalLoans || 0}</p>
          <p>Total Repayments: {reports.totalRepayments || 0}</p>
          <p>Outstanding: {reports.outstanding || 0}</p>
          <button style={styles.backBtn} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      {/* Active Members */}
      {view === "active" && (
        <div style={styles.section}>
          <h3>Active Members</h3>
          {activeMembers.map((u) => (
            <div key={u._id} style={styles.row}>
              <div>
                {u.name} <br />
                <small>{u.email}</small>
              </div>
              <button style={styles.dangerBtn} onClick={() => deleteMember(u._id)}>Delete</button>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>Back</button>
        </div>
      )}

      <hr style={{ margin: "25px 0" }} />
      <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;