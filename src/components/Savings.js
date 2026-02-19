import { useState } from "react";

function Savings() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
  });

  const [savings, setSavings] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSaving = () => {
    if (!formData.name || !formData.amount || formData.amount <= 0) return;
    setSavings([
      ...savings,
      {
        name: formData.name,
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
        date: formData.date,
      },
    ]);

    // Reset amount only
    setFormData({ ...formData, amount: "" });
  };

  const totalSavings = savings.reduce((a, b) => a + b.amount, 0);

  return (
    <div
      style={{
        maxWidth: "650px",
        width: "100%",
        margin: "auto",
        MarginTop: "50%",
        padding: "20px",
        paddingBottom: "30px",

        border: "1px solid #e4e0e0",
        borderRadius: "10px",
      }}
    >
      <h4 style={{ textAlign: "center", marginBottom: "15px" }}>
        Add Savings (Deposit)
      </h4>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Enter member name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Amount */}
      <input
        type="number"
        name="amount"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Payment Method */}
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="Cash">Cash</option>
        <option value="Mobile Money">Mobile Money</option>
        <option value="Bank Transfer">Bank Transfer</option>
      </select>

      {/* Date */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Save Button */}
      <button
        onClick={addSaving}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Save Deposit
      </button>

      {/* Savings Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>1</th>
              <th>Name</th>   {/* replaces role */}
              <th>Amount</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {savings.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.amount}</td>
                <td>{s.paymentMethod}</td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h5 style={{ marginTop: "15px" }}>
        Total Savings: <b>{totalSavings}</b>
      </h5>
    </div>
  );
}

/* Inline styles */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const tableStyle = {
  width: "100%",
  heigh: "50%",
  borderCollapse: "collapse",
};

export default Savings;
