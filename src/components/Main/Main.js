import React from 'react';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import './Main.css';

function Main() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
    </div>
  );
}

export default Main;
