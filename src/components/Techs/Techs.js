import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='techs' id={'tech'}>
      <div className='techs__container'>
        <h2 className='techs__title section-title'>Технологии</h2>
        <div className='techs__description'>
          <h3 className='techs__description-title'>7 технологий</h3>
          <p className='techs__description-text'>
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className='techs__stack'>
          <li className='techs__stack-item'>HTML</li>
          <li className='techs__stack-item'>CSS</li>
          <li className='techs__stack-item'>JS</li>
          <li className='techs__stack-item'>React</li>
          <li className='techs__stack-item'>Git</li>
          <li className='techs__stack-item'>Express.js</li>
          <li className='techs__stack-item'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
