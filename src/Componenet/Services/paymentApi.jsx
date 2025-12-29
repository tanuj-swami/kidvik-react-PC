import api from "./Api";




export const fetchPlans = () => api.get("/plans/");

export const createOrder = (plan_detail_id) =>
  api.post("/create_order/", { plan_detail_id });

export const verifyPayment = (payload) =>
  api.post("/verify_payment/", payload);




export const checkPlan = (user_id) =>
  api.post("/check_plan/", { user_id });