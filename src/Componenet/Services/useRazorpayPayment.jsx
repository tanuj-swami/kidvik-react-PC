import { useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../Helper/toastService";
import { loadRazorpayScript } from "./loadRazorpayScript";
import { createOrder, verifyPayment } from "./paymentApi";

export const useRazorpayPayment = () => {
  // ✅ Hook yahan sahi jagah call ho raha hai
  const queryClient = useQueryClient();

  const startPayment = async (plan_detail_id, userForm) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      showToast("Razorpay SDK failed to load", "error");
      return;
    }
    
    const orderRes = await createOrder(plan_detail_id);
    const { order_id, amount, razorpay_key } = orderRes.data;

    const options = {
      key: razorpay_key,
      amount,
      currency: "INR",
      name: "KidVik",
      description: "Subscription Payment",
      order_id,

      prefill: {
        name: userForm.name,
        email: userForm.email,
        // contact: userForm.phone,
      },

      notes: {
        plan_detail_id,
        user_id: localStorage.getItem("user_id") ? localStorage.getItem("user_id") : null,
        usertype: "Parent",
        address: userForm.address,
      },

      handler: async (response) => {
        console.log("RAZORPAY RESPONSE:", response);

        const payload = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
         };
           console.log("VERIFY PAYMENT PAYLOAD:", payload);
       const verifyRes = await verifyPayment(payload);
        console.log("VERIFY PAYMENT API RESPONSE:", verifyRes.data);

        showToast(verifyRes?.data?.message || "Payment Successful", "success");

        queryClient.invalidateQueries(["check-plan"]);
        onSuccess?.();
      },

      theme: { color: "#0d6efd" },
    };

    new window.Razorpay(options).open();
  };

  return { startPayment };
};
