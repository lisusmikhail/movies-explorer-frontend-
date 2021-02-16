import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about'>
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
      <div className='about__gantt-chart'>
        <div className='about__backend-chart'>1 неделя</div>
        <div className='about__frontend-chart'>4 недели</div>
        <div className='about__chart-label'>back-end</div>
        <div className='about__chart-label'>front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;
