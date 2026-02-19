import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate(); 

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!data.identifier) {
      newErrors.identifier = "Email or phone number is required";
    } else {
      const isEmail = /\S+@\S+\.\S+/.test(data.identifier);
      const isPhone = /^\d{10,15}$/.test(data.identifier);

      if (!isEmail && !isPhone) {
        newErrors.identifier = "Enter a valid email or phone number";
      }
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const savedAccount = JSON.parse(localStorage.getItem("userAccount"));

    if (!savedAccount) {
      alert("No account found. Please sign up first.");
      return;
    }

    const isEmailMatch = data.identifier === savedAccount.email;
    const isPhoneMatch = data.identifier === savedAccount.phone;
    const isPasswordMatch = data.password === savedAccount.password;

    if ((isEmailMatch || isPhoneMatch) && isPasswordMatch) {
      localStorage.setItem("loggedInUser", JSON.stringify(savedAccount));
      navigate("/dashboard"); 
    } else {
      alert("Invalid login credentials");
    }
  };

  const styles = {
    container: {
      maxWidth: "50%",
      margin: "100px auto",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#bbc5bc",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    field: { marginBottom: "14px" },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    },
    passwordWrapper: { position: "relative" },
    toggleBtn: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#0d6efd",
    },
    error: { color: "red", fontSize: "12px" },
    forgotBtn: {
      background: "none",
      border: "none",
      color: "#2355a0",
      cursor: "pointer",
      fontSize: "20px", 
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#198754",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
    },
    footerNote: {
      marginTop: "15px",
      textAlign: "center",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Login</div>

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label htmlFor="identifier">Email or phone number</label>
          <input
            style={styles.input}
            name="identifier"
            value={data.identifier}
            onChange={handleChange}
          />
          <div style={styles.error}>{errors.identifier}</div>
        </div>

        <div style={styles.field}>
          <label htmlFor="password">Password</label>
          <div style={styles.passwordWrapper}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <button
              type="button"
              style={styles.toggleBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div style={styles.error}>{errors.password}</div>
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <p style={styles.footerNote}>
        Login to see how wonderful the loan and savings management system is.
      </p>
    </div>
  );
}

export default LoginForm;

