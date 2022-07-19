/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function InputField({ title, value, handleChangeValue, id }) {
  return (
    <>
      <label htmlFor={id}>{title} </label>
      <span style={{ color: 'red' }}> * </span>
      <input
        type="text"
        id={id}
        value={value}
        className="form-input"
        placeholder="Nhập tên sản phẩm "
        onChange={handleChangeValue}
      />
    </>
  );
}
