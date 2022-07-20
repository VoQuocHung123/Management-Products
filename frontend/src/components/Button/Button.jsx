/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import './style.css';

function Button({ className, onClick, title, type }) {
  return (
    <>
      <button className={className} type={type} onClick={onClick}>
        {title}
      </button>
    </>
  );
}

export default Button;
