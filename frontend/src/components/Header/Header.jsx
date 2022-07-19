import React from 'react';
import './index.css';
import logo from '../../assets/images/logoncc.png';
import Navbar from '../Navbar/Navbar';

function Header() {
  return (
    <div className="header">
      <div className="logo-header" style={{ marginLeft: -30 }}>
        <span
          className="logo-image"
          style={{ backgroundImage: `url(${logo})` }}
        />
        <span className="text-header">NCC</span>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
