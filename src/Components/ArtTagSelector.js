import React from "react";

const ArtTagSelector = ({ name, onChange, value = "" }) => {
  return (
    <select
      name={name}
      value={value}
      className="form-select"
      onChange={onChange}
    >
      <option value="" disabled hidden>
        Select
      </option>
      <option value="color">color</option>
      <option value="monocolor">monocolor</option>
      <option value="red">red</option>
      <option value="green">green</option>
      <option value="white">white</option>
    </select>
  );
};

export default ArtTagSelector;
