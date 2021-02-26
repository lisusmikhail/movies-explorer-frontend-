import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';

function ProfileMenu({ isLoggedIn, handleNavClick }) {
  return (
    <Link
      className={
        isLoggedIn
          ? 'profile-menu profile-menu_position'
          : 'profile-menu profile-menu_visibility'
      }
      to='/profile'
      onClick={handleNavClick}
    >
      <p className='profile-menu__title'>Аккаунт</p>
      <button className='profile-menu__button profile-menu__icon' />
    </Link>
  );
}

export default ProfileMenu;
