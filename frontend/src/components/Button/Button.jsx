/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import './style.css';

function Button({ className, onClick, title }) {
  return (
    <>
      <button className={className} onClick={onClick}>
        {title}
      </button>
    </>
  );
}

export default Button;
