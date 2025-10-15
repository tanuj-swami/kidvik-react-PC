import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({
  optionsList,       // array of strings or objects [{label,value}]
  selectedValues,    // array of selected values
  setSelectedValues, // state setter for local selection
  updateFilter,      // function to dispatch filter update
  filterName,        // name of filter in reducer, e.g. "area_id" or "sub_category_detail_id"
  placeholder = "Select...", // optional placeholder
}) => {
  // Prepare options
  const options = optionsList.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o
  );

  const handleChange = (selected) => {
    let values = selected ? selected.map((s) => s.value) : [];

    // Handle "All" logic
    if (values.includes("All") && values.length > 1) {
      values = values.filter((v) => v !== "All");
    }
    if (values.length === 0) {
      values = ["All"]; // optional: reset to All if nothing selected
    }

    setSelectedValues(values);
    updateFilter(filterName, values);
  };

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(opt.value)
  );

  return (
    <div className="mb-3">
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        closeMenuOnSelect={false}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MultiSelectDropdown;
