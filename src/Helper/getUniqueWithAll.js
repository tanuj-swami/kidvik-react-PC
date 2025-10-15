
export const getUniqueWithAll = (data = [], keyPath) => {
  if (!Array.isArray(data) || !keyPath) return ["All"];

  // Split nested key like "area.Location_name"
  const keys = keyPath.split(".");

  // Extract values safely
  const values = data
    .map((item) => {
      let value = item;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined || value === null) return null;
      }
      return value;
    })
    .filter(Boolean);

  // Remove duplicates using Set
  const unique = [...new Set(values)];

  // Add "All" at the top
  return ["All", ...unique];
};
