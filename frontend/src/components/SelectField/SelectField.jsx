/* eslint-disable react/no-array-index-key */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function SelectField({
  title,
  id,
  name,
  handleChangeValue,
  handleChangeCategory,
  value,
  content,
  optionCate,
  optionBrand,
  setErrors,
}) {
  return (
    <>
      <label htmlFor={id}>{title} </label>
      <span style={{ color: 'red' }}> * </span>
      <select name={name} id={id} className="form-input" onChange={handleChangeValue} onClick={handleChangeCategory}>
        <option value={value} hidden>
          {content}
        </option>
        {optionCate && optionCate.map((item, index) => (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        ))}
        {optionBrand && optionBrand.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <p className="msg-err">{setErrors}</p>
    </>
  );
}
