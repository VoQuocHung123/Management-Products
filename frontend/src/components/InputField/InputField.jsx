/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function InputField({ title, name, value, handleChangeValue, id, setErrors }) {
  return (
    <>
      <label htmlFor={id}>{title} </label>
      <span style={{ color: 'red' }}> * </span>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        className="form-input"
        placeholder="Nhập tên sản phẩm "
        onChange={handleChangeValue}
      />
      <p className="msg-err">{setErrors}</p>
    </>
  );
}
