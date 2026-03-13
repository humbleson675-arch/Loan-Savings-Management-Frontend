import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // add Navigate

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Sign from "./components/Sign";
import About from "./components/About";
import Support from "./components/Support";
import Contact from "./components/Contact";
import ForgotPassword from "./components/ForgotPassword";

import AdminDashboard from "./components/AdminDashboard";
import TreasurerDashboard from "./components/TreasurerDashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/protectRoutes";

// ---------------- Public pages wrapper ----------------
const PublicPage = ({ Component }) => (
  <>
    <Navbar
      link1="Home"
      link2="About"
      link3="Support"
      link4="Contact"
      link5="Sign up"
    />
    <Component />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* ===== PUBLIC PAGES ===== */}
        <Route path="/home" element={<PublicPage Component={Home} />} />  {/* Landing page */}
        <Route path="/about" element={<PublicPage Component={About} />} />
        <Route path="/support" element={<PublicPage Component={Support} />} />
        <Route path="/contact" element={<PublicPage Component={Contact} />} />
        <Route path="/sign" element={<PublicPage Component={Sign} />} />
        <Route path="/forgot-password" element={<PublicPage Component={ForgotPassword} />} />

        {/* ===== DASHBOARDS ===== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/treasurer"
          element={
            <ProtectedRoute allowedRole="treasurer">
              <TreasurerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="member">
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
