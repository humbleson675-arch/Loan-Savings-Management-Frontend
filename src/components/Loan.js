import { useState } from "react";
function Loan() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormData({ name: "", phone: "", amount: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${formData.name}\nPhone: ${formData.phone}\nAmount Requested: ${formData.amount}`);
  };

  /* Inline Styles */
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "150px",
      color: "white",
    },
    card: {
      alignItems: "center",
      width: "100%",
      maxWidth: "700px",
      backgroundColor: "#1d1717",
      padding: "150px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(240, 236, 236, 0.94)",
    },
    title: {
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      fontWeight: "500",
      color: "white",
       textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    button: {
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
    },
    submitBtn: {
      backgroundColor: "#198754",
      color: "#fff",
    },
    clearBtn: {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Apply for Loan</div>
        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="name">Enter Your Name</label>
          <input
            style={styles.input}
            id="name"
            name="name"
            placeholder="Gatluak peter"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="phone">Your Phone Number</label>
          <input
            style={styles.input}
            id="phone"
            name="phone"
            type="tel"
            placeholder="0712 345 678"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label style={styles.label} htmlFor="amount">Amount Requested</label>
          <input
            style={styles.input}
            id="amount"
            name="amount"
            type="number"
            placeholder="1000"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <div style={styles.buttonContainer}>
            <button type="submit" style={{ ...styles.button, ...styles.submitBtn }}>Submit</button>
            <button type="button" onClick={clearForm} style={{ ...styles.button, ...styles.clearBtn }}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loan;

