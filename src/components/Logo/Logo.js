import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo_1280.svg';

function Logo({ isHeader }) {
  return (
    <Link to='/'>
      <img
        className={isHeader ? 'logo logo_position_header' : 'logo'}
        src={logo}
        alt='Logo'
      />
    </Link>
  );
}

export default Logo;
