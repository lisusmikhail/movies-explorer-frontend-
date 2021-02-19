import React from 'react';
import './Promo.css';
import mainBanner from '../../images/banner_1280.svg';

function Promo() {
  const title = `Учебный проект студента факультета \n Веб-разработки.`;
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__content'>
          <h1 className='promo__title'>{title}</h1>
          <p className='promo__text'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className='promo__button'>Узнать больше</button>
        </div>
        <img className='promo__image' src={mainBanner} alt='main banner' />
      </div>
    </section>
  );
}

export default Promo;
