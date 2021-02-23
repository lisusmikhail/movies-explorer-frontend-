import React from 'react';
import './AboutProject.css';
import Chart from '../Chart/Chart';

function AboutProject() {
  return (
    <section className='about about_position' id='about'>
      <h2 className='about__title section-title'>О проекте</h2>
      <div className='about__content'>
        <div className='about__description'>
          <h3 className='about__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__description-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__description'>
          <h3 className='about__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <Chart />
    </section>
  );
}

export default AboutProject;
