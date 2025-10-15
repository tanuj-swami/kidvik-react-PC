import { BASE_URL } from "./Base_Url";

export const logUserAction = async (type = "user", action = "Unknown" , action_page ,  partner_id) => {

  const user_id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : localStorage.getItem("userId");

  try {
    const url =
      type === "user"
        ? `${BASE_URL}/partner-log/`
        : `${BASE_URL}/user-log/`;
 
    const deviceInfo = {
      Device: navigator.userAgent.includes("Mobile") ? "Mobile" : "Laptop",
      Device_ID: crypto.randomUUID(), // random unique ID
      IP: Math.floor(Math.random() * 9999999999), // (use real IP fetch if backend allows)
      OS: navigator.platform,
      Latitude: "",
      Longitude: "",
    };

    const payload = {
      user_id: user_id ,  
      record_status: "Active",
      action_page: action_page,
      action_on: new Date().toISOString(),
      action: action,
      partner_id : partner_id,
      ...deviceInfo,
    };
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Logging failed:", error);
  }
};
