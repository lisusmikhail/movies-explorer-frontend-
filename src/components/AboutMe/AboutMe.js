import React from 'react';
import './AboutMe.css';
import picture from '../../images/ML_pic.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <h2 className='about-me__title section-title'>Студент</h2>
        <div className='about-me__full-info'>
          <div className='about-me__description'>
            <div className='about-me__texts'>
              <h3 className='about-me__name'>Михаил</h3>
              <h4 className='about-me__job'>Фронтенд-разработчик, 53 года</h4>
              <p className='about-me__text'>
                Я родился в Киеве, потом жил в Санкт-Петербурге. Теперь живу в
                Торонто. Много работал в телекоммуникациях на разных позициях в
                роли управленца. Год назад решил "перезапустить" свою жизнь.
                Результат налицо: делаю финальный проект в программе
                Яндекс.Практикума.
              </p>
            </div>
            <div className='about-me__links'>
              <a
                className='about-me__social'
                href='https://www.facebook.com/yandex.praktikum/'
                target='_blank'
                rel='noopener'
              >
                Facebook
              </a>
              <a
                className='about-me__social'
                href='https://github.com/lisusmikhail'
                target='_blank'
                rel='noopener'
              >
                GitHub
              </a>
            </div>
          </div>
          <img className='about-me__image' src={picture} alt='About Me' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
