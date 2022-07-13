import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <span className="navbar-item">
        <NavLink to="/danh-sach-sp" className="navbar-item_link">
          SẢN PHẨM
        </NavLink>
      </span>
      <span className="navbar-item">
        <NavLink to="/quan-ly-sp" className="navbar-item_link">
          QUẢN LÝ SẢN PHẨM
        </NavLink>
      </span>
    </div>
  );
}
