import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import * as auth from '../../utils/auth';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [errorMsg, setErrorMsg] = useState('');

  const onSignUp = (email, password, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          resetStates();
          console.log('signup', 'will be appropriate action here...');
        } else {
          console.log('Произошла ошибка');
        }
      })
      .catch((err) => handleError(err));
  };

  const handleError = (err) => {
    if (err === 400) {
      setErrorMsg('Неправильный формат данных');
    } else if (err === 403) {
      setErrorMsg('Нет прав на эту операцию');
    } else if (err === 409) {
      setErrorMsg('Зритель с таким e-mail уже зарегистрирован');
    } else if (err === 429) {
      setErrorMsg('Данная операция временно недоступна');
    } else {
      setErrorMsg('Произошла ошибка');
    }
  };

  const resetStates = () => {
    setErrorMsg('');
  };

  console.log(errorMsg);
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path='/signup'>
          <Register onSignUp={onSignUp} errorMsg={errorMsg} />
        </Route>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Header />
          <Profile />
        </Route>
        <Route path='/movies'>
          <Header />
          <Movies />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
