import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/signIN" />;
  if (!allowedRoles.includes(user.role ||)) return <Navigate to="/unauthorized" />;
  

  return children;
};

export default ProtectedRoute