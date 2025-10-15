import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { showToast } from "../../Helper/toastService";
import { BASE_URL } from "../../Helper/Base_Url";
import useFacilityGroups from "../../Helper/useGroupedOptions";
import MultiSelect from "../../Helper/MultiSelect";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import { Loading } from "../../Helper/Loader";

function Step_03({ next, setloading , setCompletedSteps , activeStep }) {
  const { partner_id } = usePartnerLogin();
  const { slug } = useParams();
  const category_id = localStorage.getItem("selectedCategory")

  const [formData, setFormData] = useState({
    facilities: {},
  });

  const { groups, loading, error } = useFacilityGroups(`${BASE_URL}/facility_mst/?category_id=${category_id}`);
  // console.log(`${BASE_URL}/facility_mst/?category_id=${category_id}`);
  console.log(" groups", groups)
  
  // ✅ Handle change per group
  const handleChange = (groupName, values) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [groupName]: values,
      },
    }));
  };

  // ✅ Submit handler with safe JSON parse
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const allFacilities = Object.values(formData.facilities).flat();
      const payload = {
        partner_id,
        partner_facility: allFacilities.map((id) => ({
          facility_id: id,
        })),
      };

      console.log("🚀 Sending:", payload);

      const response = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        const text = await response.text();
        console.error("❌ Invalid JSON from POST:", text);
        showToast("Server returned invalid response", "error");
        return;
      }

      if (response.ok) {
        showToast(data.message || "Submitted successfully", "success");
        setCompletedSteps((prev) => [...prev, activeStep]);

        next();
      } else {
        showToast(data.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("❌ Network error (POST):", error);
      showToast("Network error occurred", "error");
    } finally {
      setloading(false);
    }
  };

  // ✅ Fetch partner details safely
  const fetchPartner = async (slug) => {
    try {
      const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
      let data;

      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error("❌ Invalid JSON from GET:", text);
        return;
      }

      if (res.ok && data.partner_facility) {
        const groupedFacilities = {};

        data.partner_facility.forEach((pf) => {
          const groupName = pf.facility.fac_grp_id.fac_group;
          const facilityId = pf.facility.id;

          if (!groupedFacilities[groupName]) {
            groupedFacilities[groupName] = [];
          }
          groupedFacilities[groupName].push(facilityId);
        });

        setFormData({
          facilities: groupedFacilities,
        });
      } else {
        console.warn("⚠️ No partner_facility found in response");
      }
    } catch (error) {
      console.error("❌ Network error (GET):", error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchPartner(slug);
    }
  }, [slug]);

  return (
    <Form id="listingForm" onSubmit={handleSubmit}>
      <hr className="m-0 p-0 mb-4 text-primary" />
      {
        loading ? (
          <Loading />
        ) :
          (
            Object.keys(groups).map((group) => (
              <Row
                key={group}
                className="border border-2 border-primary rounded p-3 mb-4"
              >
                <MultiSelect
                  label={group}
                  name={group}
                  options={groups[group]}
                  value={formData.facilities[group] || []}
                  onChange={handleChange}
                />
              </Row>
            ))

          )

      }

    </Form>
  );
}

export default Step_03;
