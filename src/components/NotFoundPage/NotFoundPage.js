import React from 'react';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='not-found-page'>
      <p className='not-found-page__title'>404</p>
      <p className='not-found-page__text'>Страница не найдена</p>
      <Link to='/' className='not-found-page__link'>
        Назад
      </Link>
    </div>
  );
}

export default NotFoundPage;
