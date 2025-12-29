import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../Helper/Loader";
import { fetchPlans } from "./paymentApi";

export const Plans = ({ onSelect }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-danger">Failed to load plans</p>;

  const plans = data?.data?.data ?? [];

  return (
    <div className="row g-4">
      {plans.map((plan) => (
        <div key={plan.plan_id} className="col-md-4">
          <div className="card pricing-card h-100 shadow-sm border-0">
            {/* Header */}
            <div className="card-header bg-white text-center border-0">
              <h5 className="fw-bold mb-1">{plan.name}</h5>
              <p className="text-muted small">{plan.title}</p>
            </div>

            {/* Body */}
            <div className="card-body text-center">
              <h2 className="fw-bold text-primary mb-1">
                ₹{plan.price}
              </h2>
              <p className="text-muted">
                for {plan.duration_days} days
              </p>

              {/* <hr /> */}

              {/* Features */}
              {/* <ul className="list-unstyled text-start small">
                {plan.details?.map((item) => (

                  <li key={item.detail_id} className="mb-2">
                    ✅ {item.description}
                  </li>
                ))}
              </ul> */}
            </div>
            {/* Footer */}
            <div className="card-footer bg-white border-0 text-center">
              <button
                className="btn btn-primary w-100"
                onClick={() =>
                  onSelect(plan.details?.[0]?.detail_id)
                }
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


