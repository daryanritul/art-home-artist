import React from 'react';

const ArtCategorySelector = ({ value = null, onChange, name }) => {
  const category = [
    'All',
    'Painting',
    'Mandala',
    'Craft',
    'Pop Art',
    'Abstract Art',
    'Illustration',
    'Aborignal Art',
    'Oil Painting',
    'Sculpture Art',
    'Sketching',
    'Polaroids',
    'Cartoon Art',
  ];
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-select"
    >
      <option value="" disabled hidden>
        Select
      </option>
      {category.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default ArtCategorySelector;
