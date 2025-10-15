import React from "react";
import { FaCheckCircle , FaBuilding} from "react-icons/fa";

function Facility({ partner_facility }) {
  if (!partner_facility || partner_facility.length === 0) {
    return (
      <div className="content-section container py-4">
        <h2 className="text-primary mb-3">Our Facilities</h2>
        <p className="text-secondary">No facilities have been added yet.</p>
      </div>
    );
  }

  // Group facilities by "fac_group"
  const groupedFacilities = partner_facility.reduce((acc, item) => {
    const groupName = item.facility.fac_grp_id.fac_group;
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(item.facility.facility);
    return acc;
  }, {});

  return (
    <div className="">
   
<h2 className="text-primary mb-2 d-flex align-items-center">
  <FaBuilding className="me-2" /> Our Facilities
</h2>
<hr className="mb-3 p-0" />
      {/* <p className="text-secondary mb-4">
        Explore the facilities we provide to create a safe, engaging, and enriching environment for our students.
      </p> */}

      <div className="row g-3">
        {Object.entries(groupedFacilities).map(([group, facilities]) => (
          <div key={group} className="col-sm-6 col-md-4">
            <div className="card facility-card h-100 shadow-sm border-0">
              <div className="card-header bg-primary text-white fw-bold">
                        {group}
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  {facilities.map((fac, index) => (
                    <li key={index} className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .facility-card {
          transition: transform 0.2s, box-shadow 0.2s;
          border-radius: 0.5rem;
        }
        .facility-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        .card-header {
          text-align: center;
          font-size: 1.1rem;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default Facility;
