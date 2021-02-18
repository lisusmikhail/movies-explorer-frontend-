import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__line' />
      <div className='footer__info'>
        <p className='footer__copyright'>&copy; 2021</p>
        <ul className='footer__links'>
          <li className='footer__link-item'>
            <a className='footer__link' href='http://'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__link-item'>
            <a className='footer__link' href='http://'>
              Github
            </a>
          </li>
          <li className='footer__link-item'>
            <a className='footer__link' href='http://'>
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
