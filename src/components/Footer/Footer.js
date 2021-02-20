import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const history = useHistory();
  const location = history.location.pathname;
  console.log(location);

  return (
    <div className={location === '/' ? 'footer' : 'footer footer_movies'}>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      {/*<div className='footer__line' />*/}
      <div className='footer__info'>
        <p
          className={
            location === '/'
              ? 'footer__copyright'
              : 'footer__copyright footer__copyright_movies'
          }
        >
          &copy; 2021
        </p>
        <ul
          className={
            location === '/'
              ? 'footer__links'
              : 'footer__links footer__links_movies'
          }
        >
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
