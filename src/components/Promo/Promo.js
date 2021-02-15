import React from 'react';
import './Promo.css';
import mainBanner from '../../images/banner_1280.svg';

function Promo() {
  return (
    <div className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className="promo__text">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <button className="promo__button">Узнать больше</button>
      <img className="promo__image" src={mainBanner} alt="main banner" />
    </div>
  );
}

export default Promo;
