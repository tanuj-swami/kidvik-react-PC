import { useState } from "react";
import { useRazorpayPayment } from "./useRazorpayPayment";
import { Plans } from "./Viwe_Plan";
import OrderDetailsModal from "./OrderDetailsModal";

const SubscriptionPage = () => {
  const { startPayment } = useRazorpayPayment();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = (planDetailId) => {
    setSelectedPlan(planDetailId);
    setShowModal(true);
  };

  const handleBuyNow = (formData) => {
    setShowModal(false);
    startPayment(selectedPlan , formData);
  };

  return (
    <>
      <Plans onSelect={handleSubscribe} />

      <OrderDetailsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onBuy={handleBuyNow}
      />
    </>
  );
};

export default SubscriptionPage;
