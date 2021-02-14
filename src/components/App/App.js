import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Promo() {
  return (
    <div className="app">
      <Header/>
      <Footer/>
    </div>
  );
}

export default Promo;
