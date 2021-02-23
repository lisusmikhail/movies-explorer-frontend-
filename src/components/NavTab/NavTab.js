import React from 'react';
import { Link } from 'react-scroll';
import './NavTab.css';

function NavTab() {
  return (
    <div className='nav-tab'>
      <Link className='nav-tab__button' to='about' spy={true} smooth={true}>
        Узнать больше
      </Link>
    </div>
  );
}

export default NavTab;
