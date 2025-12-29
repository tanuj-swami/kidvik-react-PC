import { useState } from "react";
import { showToast } from "../../Helper/toastService";

const OrderDetailsModal = ({ open, onClose, onBuy }) => {
  const [form, setForm] = useState({
    name: localStorage.getItem("username") ? localStorage.getItem("username") : "" ,
    email: "",
    phone: "",
    address: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = () => {
    if (!form.name || !form.email  || !form.address) {
      showToast("Please fill all required fields", "error");
      return;
    }
    onBuy(form);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content rounded-4 shadow">

          {/* Header */}
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Order Details</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control bg-white text-dark"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control bg-white text-dark"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            {/* <div className="mb-3">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="tel"
                className="form-control bg-white text-dark"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div> */}

            {/* Address */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                className="form-control bg-white text-dark"
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter full address"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-0">
            <button
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-4"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
