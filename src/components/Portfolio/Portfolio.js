import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__projects'>
        <li className='portfolio__project'>
          <h3 className='portfolio__name'>Статичный сайт</h3>
          <a className='portfolio__arrow' href='http://yandex.ru'>
            ↗
          </a>
        </li>
        <li className='portfolio__project'>
          <h3 className='portfolio__name'>Адаптивный сайт</h3>
          <a className='portfolio__arrow' href='http://yandex.ru'>
            ↗
          </a>
        </li>
        <li className='portfolio__project'>
          <h3 className='portfolio__name'>Одностраничное приложение</h3>
          <a className='portfolio__arrow' href='http://yandex.ru'>
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
