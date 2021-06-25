import React from "react";

const ArtTagSelector = ({ name, onChange, value = null }) => {
  return (
    <select
      name={name}
      value={value}
      className="form-select"
      onChange={onChange}
    >
      <option value="" disabled selected hidden>
        Select
      </option>
      <option value="color" selected>
        color
      </option>
      <option value="monocolor">monocolor</option>
      <option value="red">red</option>
      <option value="green">green</option>
      <option value="white">white</option>
    </select>
  );
};

export default ArtTagSelector;
