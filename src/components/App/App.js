import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import handleError from '../../utils/error-handler';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [myMovies, setMyMovies] = useState({});
  const [token, setToken] = useState('');
  const history = useHistory();
  console.log(user, myMovies);
  const onSignUp = (email, password, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          resetStates();
          onSignIn(email, password);

          console.log('signup', 'will be appropriate action here...');
        } else {
          console.log('Произошла ошибка');
        }
      })
      .catch((errStatus) => handleError(errStatus, setErrorMsg));
  };

  const onSignIn = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .then((data) => {
        setIsLoggedIn(true);
        history.push('/movies');
        console.log(data);
      })
      .catch((errStatus) => handleError(errStatus, setErrorMsg));
  };

  const onEditProfile = (email, _, name) => {
    console.log(email, name);
    auth
      .editProfile(email, name, token)
      .then((profile) => {
        setUser(profile);
      })
      .catch((errStatus) => handleError(errStatus, setErrorMsg));
  };

  useEffect(() => {
    // console.log('useEffect check TOKEN');
    const handleTokenCheck = () => {
      if (localStorage.getItem('jwt')) {
        const jwt = localStorage.getItem('jwt');
        setToken(jwt);
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res) {
              setIsLoggedIn(true);
            }
          })
          .catch((errStatus) => handleError(errStatus, setErrorMsg));
      }
    };
    handleTokenCheck();
  }, [isLoggedIn]);

  useEffect(() => {
    const getUserAndMyMovies = (token) => {
      auth
        .getUserAndMyMovies(token)
        .then(([user, myMovies]) => {
          setUser(user);
          setMyMovies(myMovies);
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    token && getUserAndMyMovies(token);
  }, [token]);

  const resetStates = () => {
    setErrorMsg('');
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path='/signup'>
            <Register
              onAuth={onSignUp}
              errorMsg={errorMsg}
              resetStates={resetStates}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onAuth={onSignIn}
              errorMsg={errorMsg}
              resetStates={resetStates}
            />
          </Route>
          <Route path='/profile'>
            <Header />
            <Profile onAuth={onEditProfile} resetStates={resetStates} />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
