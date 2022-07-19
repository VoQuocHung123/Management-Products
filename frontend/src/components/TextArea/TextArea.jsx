/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function TextArea({ title, value, id, handleChangeValue }) {
  return (
    <>
      <label htmlFor="description">{title}</label>
      <span style={{ color: 'red' }}> * </span>
      <textarea
        id={id}
        cols="30"
        rows=""
        value={value}
        className="form-input"
        style={{ height: 100 }}
        placeholder="Nhập mô tả"
        onChange={handleChangeValue}
      />
    </>
  );
}
