import React, { useState } from "react";

function SignUpForm() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!data.fullName) newErrors.fullName = "Full name is required";

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(data.phone)) {
      newErrors.phone = "Phone must be 10–15 digits";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userAccount = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    localStorage.setItem("userAccount", JSON.stringify(userAccount));
    alert("Account created successfully. You can now login.");
  };

  const styles = {
    container: {
      maxWidth: "50%",
      marginTop: "100px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "12px",
      background: "#bbc5bc",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      fontSize: "20px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
    },
    field: { marginBottom: "14px" },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "20px",
      outline: "none",
    },
    error: {
      color: "red",
      fontSize: "12px",
      marginTop: "4px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#198754",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "20px",
      fontWeight: "bold",
      marginTop: "10px",
    },
    footerNote: {
      textAlign: "center",
      fontSize: "20px",
      color: "#ffffff",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Create Account</div>

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label htmlFor="">Enter your fullName</label>
          <input
            style={styles.input}
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
          />
          <div style={styles.error}>{errors.fullName}</div>
        </div>

        <div style={styles.field}>
          <label htmlFor="">Enter your Email</label>
          <input
            style={styles.input}
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <div style={styles.error}>{errors.email}</div>
        </div>

        <div style={styles.field}>
          <label htmlFor="">Enter your Phone Number</label>
          <input
            style={styles.input}
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
          <div style={styles.error}>{errors.phone}</div>
        </div>

        <div style={styles.field}>
          <label htmlFor="">Enter your password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <div style={styles.error}>{errors.password}</div>
        </div>

        <div style={styles.field}>
          <label htmlFor="">Confirm your password</label>
          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          />
          <div style={styles.error}>{errors.confirmPassword}</div>
        </div>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      <p style={styles.footerNote}>
        We value your communication and will respond as soon as possible.
      </p>
    </div>
  );
}

export default SignUpForm;
