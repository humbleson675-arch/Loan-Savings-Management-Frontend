import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Homeimage1 from "../assets/image.png";
import Homeimage2 from "../assets/.png";
import Homeimage3 from "../assets/cash.png";

function Home() {
  // Inline styles
  const containerStyle = {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    backgroundColor: "#bbc5bc"
  };

  const imageStyle = {
    width: "60%",       // adjust as needed
    maxWidth: "500px",
    height: "auto",
    borderRadius: "10px",
    margin: "20px 0",
    justifyContent: "spaceBetween",
  };

  const headingStyle = {
    color: "#2c3e50",
    margin: "10px 0"
  };

  const subheadingStyle = {
    color: "#34495e",
    margin: "10px 0"
  };

  const paragraphStyle = {
    color: "rgb(7, 145, 19)",
    margin: "10px 0",
    fontZise: "20px",
  };

  const listStyle = {
    textAlign: "left",
    display: "inline-block",
    marginTop: "10px",
    color: "#555"
  };

  return (
    <div style={containerStyle}>

      {/* Add picture here */}
      <img src={Homeimage1} alt="Financial Management" style={imageStyle} />
      <img src={Homeimage2} alt="Financial Management" style={imageStyle} />
      <img src={Homeimage3} alt="Financial Management" style={imageStyle} />

      <h2 style={headingStyle}>Loan & Savings Management System</h2>
      <h3 style={subheadingStyle}>Welcome to Your Financial Control Center</h3>
      <p style={paragraphStyle}>
        Welcome to the Loan & Savings Management System, a simple and secure platform designed to help users
        manage their savings, track loans, and monitor financial progress with ease.
      </p>

      <h3 style={subheadingStyle}>This system allows you to:</h3>
      <ol style={listStyle}>
        <li>View and manage your savings records</li>
        <li>Apply for and track loans</li>
        <li>Monitor transactions and balances</li>
        <li>Access your account securely from anywhere</li>
      </ol>

      <p style={paragraphStyle}>
        Our goal is to promote financial discipline, transparency, and smart money management by providing an
        easy-to-use digital solution for individuals and groups.
      </p>

      <p style={paragraphStyle}>
        Use the navigation menu above to explore the system, manage your finances, and stay in control of your
        financial future.
      </p>

      <Footer />
    </div>
  );
}

export default Home;