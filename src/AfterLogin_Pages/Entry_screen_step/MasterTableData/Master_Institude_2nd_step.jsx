// src/utils/apiUtils.js
export  default async function fetchSelectOptions(url, labelField, valueField = "id") {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data?.data) return [];

    return data.data.map((item) => ({
      value: item[valueField],
      label: item[labelField],
    }));
  } catch (err) {
    console.error(`Error fetching from ${url}:`, err);
    return [];
  }
}
