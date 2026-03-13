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

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Protect route and fetch initial data
  useEffect(() => {
    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    if (storedUser.role !== "admin") {
      navigate("/");
      return;
    }

    fetchUsers();
    fetchLoans();
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch data functions
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

  const approvedLoans = loans.filter((l) => l.status === "approved");
  const pendingLoans = loans.filter((l) => l.status === "pending");
  const pendingUsers = users.filter((u) => !u.approved);
  const activeMembers = users.filter((u) => u.approved);

  // Inline responsive styles
  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
      backgroundColor: "#f4f6f9",
      fontFamily: "Arial",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
    },
    card: {
      padding: "20px",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    section: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "12px",
      padding: "10px",
      backgroundColor: "#f9fafb",
      borderRadius: "6px",
    },
    columnRow: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#f9fafb",
      borderRadius: "6px",
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
    },
    primaryBtn: {
      padding: "6px 10px",
      backgroundColor: "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    dangerBtn: {
      padding: "6px 10px",
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    backBtn: {
      marginTop: "15px",
      padding: "8px 12px",
      backgroundColor: "#6b7280",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    input: {
      padding: "8px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ddd",
    },
    logoutBtn: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#111827",
      color: "white",
      border: "none",
      borderRadius: "6px",
      width: "100%",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      {view === "home" && (
        <div style={styles.grid}>
          <button style={styles.card} onClick={() => setView("members")}>
            Approve Members
          </button>
          <button style={styles.card} onClick={() => setView("loans")}>
            Approve Loans
          </button>
          <button style={styles.card} onClick={() => setView("repayments")}>
            Record Repayments
          </button>
          <button style={styles.card} onClick={() => setView("reports")}>
            Financial Reports
          </button>
          <button style={styles.card} onClick={() => setView("active")}>
            Active Members
          </button>
        </div>
      )}

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
                <button
                  style={styles.primaryBtn}
                  onClick={() => approveMember(user._id)}
                >
                  Approve
                </button>
                <button
                  style={styles.dangerBtn}
                  onClick={() => deleteMember(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>
            Back
          </button>
        </div>
      )}

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
                <button
                  style={styles.primaryBtn}
                  onClick={() => approveLoan(loan._id)}
                >
                  Approve
                </button>
                <button
                  style={styles.dangerBtn}
                  onClick={() => rejectLoan(loan._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>
            Back
          </button>
        </div>
      )}

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

              <button
                style={styles.primaryBtn}
                onClick={() => recordRepayment(loan._id)}
              >
                Record
              </button>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>
            Back
          </button>
        </div>
      )}

      {view === "reports" && (
        <div style={styles.section}>
          <h3>Financial Reports</h3>
          <p>Total Loans: {reports.totalLoans || 0}</p>
          <p>Total Repayments: {reports.totalRepayments || 0}</p>
          <p>Outstanding: {reports.outstanding || 0}</p>
          <button style={styles.backBtn} onClick={() => setView("home")}>
            Back
          </button>
        </div>
      )}

      {view === "active" && (
        <div style={styles.section}>
          <h3>Active Members</h3>
          {activeMembers.map((u) => (
            <div key={u._id} style={styles.row}>
              <div>
                {u.name} <br />
                <small>{u.email}</small>
              </div>
              <button
                style={styles.dangerBtn}
                onClick={() => deleteMember(u._id)}
              >
                Delete
              </button>
            </div>
          ))}
          <button style={styles.backBtn} onClick={() => setView("home")}>
            Back
          </button>
        </div>
      )}

      <hr />
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;