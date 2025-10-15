import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLogin } from "../Contaxt/Login_Contaxt";
import { usePartnerLogin } from "../Contaxt/PartnarLogin_context";

const ProtectedRoute = ({ children, requirePartner = false  , allowedCodes = []}) => {
  const { auth } = useLogin();
  const { partnerAuth } = usePartnerLogin();
  const location = useLocation();

  // Case 1: Agar dono tokens null → login bhejo
  if (!auth?.accessToken && !partnerAuth?.partnerAccess) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Case 2: Agar sirf partner required hai, aur partner token nahi hai → home bhejo
  if (requirePartner && !partnerAuth?.partnerAccess) {
    return <Navigate to="/" replace />;
  }

    if (allowedCodes.length > 0 && !allowedCodes.includes(partnerAuth?.code)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, access allow karo
  return children;
};

export default ProtectedRoute;
