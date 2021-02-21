import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

function Promo() {
  let location = useLocation();
  // console.log(location.pathname);
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route path='*'>
          <Footer />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default Promo;
