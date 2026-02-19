import React from "react";
import { Link } from "react-router-dom";

function Footer({ page = "home" }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* LEFT */}
        <div style={styles.left}>
          <h4 style={styles.title}>DLSMS</h4>

          {page === "home" && (
            <p style={styles.texts}>
              Digital Loan & Savings Management System empowering refugee
              community groups through transparency and accountability.
            </p>
          )}
        </div>

        {/* CENTER */}
        <div style={styles.center}>
          <h4 style={styles.title}>Quick Links</h4>
          <ul style={styles.list}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><Link to="/loan" style={styles.link}>Loan</Link></li>
            <li><Link to="/savings" style={styles.link}>Savings</Link></li>
            
          </ul>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          {(page === "home" || page === "login") && (
            <>
              <h4 style={styles.title}>Waht we do</h4>
              <p style={styles.text}>Secure Digital Savings</p>
              <p style={styles.text}>Instant Digital Loans</p>
              <p style={styles.text}>Improved Safety & Transparency</p>
            </>
          )}

          {page === "dashboard" && (
            <p style={styles.text}>Version 1.0.0</p>
          )}

          <p style={styles.copy}>
            © {new Date().getFullYear()} DLSMS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

/* STYLES */
const styles = {
  footer: {
    backgroundColor: "#1f2933",
    color: "#ffffff",
    padding: "30px 20px",
    marginTop: "auto", // for sticky footer layout
  },
  container: {
    maxWidth: "1100px",
    height: "50%",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "50px",
  },
  left: {
    flex: "1 1 300px",
    textAlign: "left",

  },
  center: {
    flex: "1 1 300px",
    textAlign: "left",
  },
  right: {
    flex: "1 1 100px",
    textAlign: "right",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "18px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "#d1d5db",
    fontSize: "14px",
    display: "block",
    marginBottom: "6px",
    transition: "color 0.2s ease",
  },
  text: {
    margin: "20px 0",
    fontSize: "14px",
    color: "#d1d5db",
    textAlign: "right",
    marginLeft: "65px",
  },
  texts: {
    margin: "20px 0",
    fontSize: "14px",
    color: "#d1d5db",
    textAlign: "left",
    marginRight: "80px",
    paddingRight:"80px",
  },

  copy: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#9ca3af",
  },
};
