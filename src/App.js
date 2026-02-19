import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sign from "./components/Sign";
import About from "./components/About";
import Support from "./components/Support";
import Contact from "./components/Contact";
import LoginForm from "./components/Login";
import DashboardNavbar from "./components/DashboardNavbar";
import Loan from "./components/Loan";
import Savings from "./components/Savings";
import Transactions from "./components/Transactions";
import Profile from "./components/profile";
import Overview from "./components/Overview";
import Repayments from "./components/Repayments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar link1 ="Home" link2 ="Sign up" link3 ="Login" link4 ="About us" link5 ="Support us" link6 ="Contact us"/>}>
        <Route path="/home" element={<Home/>} />
        <Route path="/sign" element={<Sign Up/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/about" element={<About Us/>} />
        <Route path="/support" element={<Support Us/>} />
         <Route path="/contact" element={<Contact Us/>} />
        <Route path="/loan" element={<Loan/>}/>
       <Route path="/savings" element={<Savings/>}/>
       <Route path="/repayment" element={<Repayments/>}/>
       <Route path="/transactions" element={<Transactions/>}/>
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/overview" element={<Overview/>}/>
         </Route>
          </Routes>
    </BrowserRouter>
  
  );
}

export default App;
