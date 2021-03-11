import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__projects'>
          <li className='portfolio__project'>
            <h3 className='portfolio__name'>Статичный сайт</h3>
            <a
              className='portfolio__arrow'
              target='_blank'
              rel='noreferrer'
              href='https://lisusmikhail.github.io/how-to-learn/index.html'
            >
              ↗
            </a>
          </li>
          <li className='portfolio__project'>
            <h3 className='portfolio__name'>Адаптивный сайт</h3>
            <a
              className='portfolio__arrow'
              target='_blank'
              rel='noreferrer'
              href='https://lisusmikhail.github.io/russian-travel/index.html'
            >
              ↗
            </a>
          </li>
          <li className='portfolio__project'>
            <h3 className='portfolio__name'>Одностраничное приложение</h3>
            <a
              className='portfolio__arrow'
              target='_blank'
              rel='noreferrer'
              href='https://izoommer.com'
            >
              ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
