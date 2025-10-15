// hooks/useFacilityGroups.js
import { useEffect, useState } from "react";

export default function useFacilityGroups(url) {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(async (res) => {
        console.log("📥 Raw Response:", res);  // ✅ response object log
        const data = await res.json();
        console.log("📦 Parsed Data:", data);   // ✅ parsed data log
        return data;
      })
      .then((data) => {
        if (data.data) {
          const grouped = data.data.reduce((acc, item) => {
            const groupName = item.fac_grp_id?.fac_group || "Others";
            if (!acc[groupName]) acc[groupName] = [];
            acc[groupName].push({
              value: item.id,
              label: item.facility,
            });
            return acc;
          }, {});
          setGroups(grouped);
        } else {
          setGroups({});
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching facilities:", err);
        setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { groups, loading, error };
}
