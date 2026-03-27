import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const localIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const sessionIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  const localRole = localStorage.getItem("role");
  const sessionRole = sessionStorage.getItem("role");

  const isLoggedIn = localIsLoggedIn || sessionIsLoggedIn;
  const role = localRole || sessionRole;

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}