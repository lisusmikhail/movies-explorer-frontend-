import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const history = useHistory();
  const location = history.location.pathname;

  return (
    <div className={location === '/' ? 'footer' : 'footer footer_movies'}>
      <p className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
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
            <Link
              className='footer__link'
              target='_blank'
              rel='noopener'
              href='https://praktikum.yandex.ru/'
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className='footer__link-item'>
            <Link
              className='footer__link'
              target='_blank'
              rel='noopener'
              href='https://github.com/lisusmikhail'
            >
              Github
            </Link>
          </li>
          <li className='footer__link-item'>
            <Link
              className='footer__link'
              target='_blank'
              rel='noopener'
              href='https://ru-ru.facebook.com/yandex.praktikum'
            >
              Facebook
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
