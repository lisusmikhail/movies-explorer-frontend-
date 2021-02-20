import React from 'react';
import { useHistory } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo_1280.svg';

function Logo() {
  const history = useHistory();
  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <img
      className='logo logo_position_header'
      src={logo}
      alt='Logo'
      onClick={handleLogoClick}
    />
  );
}

export default Logo;
