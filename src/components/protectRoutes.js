import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  // Fix: Use "user" instead of "currentUser" to match your Login code
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // If no user found, go to login
    return <Navigate to="/login" replace />;
  }

  // Optional: Make role check case-insensitive to be safe
  const userRole = user.role?.toLowerCase();
  const requiredRole = allowedRole?.toLowerCase();

  if (requiredRole && userRole !== requiredRole) {
    // If role doesn't match, send to their default dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
