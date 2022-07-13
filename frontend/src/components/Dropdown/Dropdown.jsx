/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import './style.css';

// eslint-disable-next-line react/prop-types
function Dropdown({ headerTitle, options, handleChangeValue, active }) {
  const [activeDropdown, setActiveDropdown] = useState(true);
  function handleShowDropdown() {
    setActiveDropdown(!activeDropdown);
  }
  function handleChangeOptions(value) {
    handleChangeValue(value);
  }
  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={handleShowDropdown}>
        <span className="dropdown-header-title">{headerTitle}</span>
        <FaCaretDown />
      </div>
      <div className={`dropdown-list ${activeDropdown ? 'active' : ''}`}>
        {options.map((value, index) => (
          <div
            className={`dropdown-item ${
              active === value.name || active === value ? 'active' : ''
            } `}
            key={index}
            onClick={() => handleChangeOptions(value)}
          >
            {value.name ? value.name : value}
          </div>
        ))}
      </div>
    </div>
  );
}
// Dropdown.protoTypes = {
//   headerTitle: PropTypes.string.isRequired,
// };
export default Dropdown;
