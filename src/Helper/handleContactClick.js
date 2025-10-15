import { useNavigate, useLocation } from "react-router-dom";
import { logUserAction } from "./logUserAction";

export const useHandleContactClick = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = async (e, type, value, locationLabel = "Topbar Home Page") => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id") || localStorage.getItem("userId");

    if (!userId) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    const actionLabel =
      type === "email"
        ? "Email Click"
        : type === "call"
        ? "Call Button Click"
        : "Unknown Click";

    try {
      await logUserAction("user", actionLabel, locationLabel);
    } catch (error) {
      console.error("Error logging user action:", error);
    }

    if (type === "email") window.location.href = `mailto:${value}`;
    else if (type === "call") window.location.href = `tel:${value}`;
  };

  return handleContactClick;
};
