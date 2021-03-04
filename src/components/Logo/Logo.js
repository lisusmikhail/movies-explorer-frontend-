import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo_1280.svg';

function Logo({ isHeader, handleMovieMenuClick }) {
  return (
    <Link to='/'>
      <img
        className={isHeader ? 'logo logo_position_header' : 'logo'}
        src={logo}
        alt='Logo'
        onClick={handleMovieMenuClick}
      />
    </Link>
  );
}

export default Logo;
