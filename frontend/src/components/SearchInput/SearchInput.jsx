/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './style.css';

export default function SearchInput(props) {
  const { onChange } = props;
  const [searchContent, setSearchContent] = useState('');
  const typingTimeoutRef = useRef(null);
  const handleChange = (e) => {
    // eslint-disable-next-line no-useless-escape
    const value = e.target.value.replace(/[&\/\\#,+()$~%@^=|[\]`.'":*?!<>{}]/g, '');
    setSearchContent(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onChange({ searchContent: value.trim() });
    }, 500);
  };
  return (
    <div className="search-container">
      <span className="icon-search">
        <FaSearch />
      </span>
      <input
        className="input-search"
        type="text"
        placeholder="Search ..."
        name="search"
        value={searchContent}
        onChange={handleChange}
      />
    </div>
  );
}
