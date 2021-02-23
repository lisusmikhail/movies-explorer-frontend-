import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';

function ProfileMenu({ isRoot, handleNavClick }) {
  return (
    <Link
      className={
        isRoot
          ? 'profile-menu profile-menu_visibility'
          : 'profile-menu profile-menu_position'
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
