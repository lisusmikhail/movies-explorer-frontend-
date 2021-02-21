import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo_1280.svg';

function Logo() {
  return (
    <Link to='/'>
      <img className='logo logo_position_header' src={logo} alt='Logo' />
    </Link>
  );
}

export default Logo;
