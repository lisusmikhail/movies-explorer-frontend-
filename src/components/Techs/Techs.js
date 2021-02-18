import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
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
        <li className='techs__stack-item techs__stack-item_css'>CSS</li>
        <li className='techs__stack-item techs__stack-item_js'>JS</li>
        <li className='techs__stack-item techs__stack-item_react'>React</li>
        <li className='techs__stack-item techs__stack-item_git'>Git</li>
        <li className='techs__stack-item techs__stack-item_express'>
          Express.js
        </li>
        <li className='techs__stack-item techs__stack-item_mongo'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
