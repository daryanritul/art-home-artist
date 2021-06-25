import React from "react";

const ArtCategorySelector = ({ value = null, onChange, name }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-select"
    >
      <option value="" disabled selected hidden>
        Select
      </option>
      <option value="c++">C++</option>

      <option value="Java">Java</option>
      <option value="Python">Python</option>
    </select>
  );
};

export default ArtCategorySelector;
