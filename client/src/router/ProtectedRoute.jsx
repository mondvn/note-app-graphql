import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("accessToken")) {
    console.log('Protected Route')
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
