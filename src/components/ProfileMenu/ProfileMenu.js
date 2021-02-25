import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ProfileMenu({ handleNavClick }) {
  const user = useContext(CurrentUserContext);
  return (
    <Link
      className={
        user._id
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
