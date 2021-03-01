import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  shortMovieThresholdDuration,
  initialNumberItems,
  showMoreIncrement,
} from '../../utils/constants';
import { getMovies } from '../../utils/MoviesApi';
import useAuth from '../../hooks/useAuth';
import useEditProfile from '../../hooks/useEditProfile';
import useWindowSize from '../../hooks/useWindowSize';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import { handleError } from '../../utils/error-handler';
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
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLogOut, setIsLogOut] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({});
  const [newProfile, setNewProfile] = useState({});

  const [allMovies, setAllMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [myMoviesToRender, setMyMoviesToRender] = useState([]);
  const [myFirstIndex, setMyFirstIndex] = useState(0);
  const [myLastIndex, setMyLastIndex] = useState(initialNumberItems);
  const [isShowMyMoreBtn, setIsShowMyMoreBtn] = useState(false);

  const [searchResult, setSearchResult] = useState([]);
  const [resultToLocalStorage, setResultToLocalStorage] = useState('');
  const [isStorageUpdated, setIsStorageUpdated] = useState(false);
  const [resultToShow, setResultToShow] = useState([]);

  const [resultToRender, setResultToRender] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialNumberItems);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);

  const [keyWord, setKeyWord] = useState('');
  const [isShortLength, setIsShortLength] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [movieToAdd, setMovieToAdd] = useState({});

  const size = useWindowSize();

  const { isLoggedIn } = useAuth(
    credentials,
    setErrorMsg,
    setToken,
    setIsTokenChecked,
    isLogOut,
    setIsLogOut
  );

  const { newUsersProfile } = useEditProfile(
    newProfile,
    isLoggedIn,
    setErrorMsg
  );

  const onAuth = (email, password, name) => {
    setCredentials({ email, password, name });
  };

  const onSignOut = () => {
    setIsLogOut(true);
    setCurrentUser({});
  };

  const onEditProfile = (email, _, name) => {
    setNewProfile({ email, name, token });
  };

  useEffect(() => {
    newUsersProfile.name && setCurrentUser(newUsersProfile);
  }, [newUsersProfile]);

  const settingInitialState = () => {
    setResultToRender([]);
    setResultToShow([]);
    setFirstIndex(0);
    setLastIndex(initialNumberItems);
    setErrorMsg('');
  };

  const settingInitialMyState = () => {
    setMyMovies([]);
    setMyMoviesToRender([]);
    setMyFirstIndex(0);
    setMyLastIndex(initialNumberItems);
    setErrorMsg('');
  };

  useEffect(() => {
    isLoggedIn &&
      getMovies()
        .then((movies) => {
          setAllMovies(movies);
        })
        .catch(() => {
          handleError(500, setErrorMsg);
        });
  }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const resultFromLocalStorage = localStorage.getItem('movies');
      setResultToShow(JSON.parse(resultFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    const shortLengthItem = localStorage.getItem('isShortLength');
    if (isFirstRender && shortLengthItem) {
      setKeyWord(localStorage.getItem('keyWord'));
      if (shortLengthItem === 'false') {
        setIsShortLength(false);
      } else {
        setIsShortLength(true);
      }
    }
  }, [isFirstRender]);

  //search start ---------------------------------------------------------
  useEffect(() => {
    const searchMovies = (keyWord) => {
      const checkMovie = (movie) => {
        const nameRu = movie['nameRU'].toLowerCase().trim();
        const word = keyWord.toLowerCase().trim();
        const isShort = movie['duration'] < shortMovieThresholdDuration;
        return (!isShortLength || isShort) && nameRu.indexOf(word) > -1;
      };
      const moviesToShow = allMovies.filter(checkMovie);
      setSearchResult(moviesToShow);
    };

    resultToRender.length === 0 &&
      !isFirstRender &&
      allMovies &&
      keyWord &&
      searchMovies(keyWord);
  }, [allMovies, keyWord, isShortLength, resultToRender]);

  useMemo(() => {
    setResultToLocalStorage(JSON.stringify(searchResult));
  }, [searchResult]);

  useEffect(() => {
    !isFirstRender && localStorage.setItem('movies', resultToLocalStorage);
    !isFirstRender && setIsStorageUpdated(!isStorageUpdated);
  }, [resultToLocalStorage]);

  useEffect(() => {
    const resultFromLocalStorage = localStorage.getItem('movies');
    setResultToShow(JSON.parse(resultFromLocalStorage));
  }, [isStorageUpdated]);

  useEffect(() => {
    localStorage.setItem('keyWord', keyWord);
    localStorage.setItem('isShortLength', isShortLength.toString());
  }, [keyWord, isShortLength]);

  const onSearchMovies = (searchQuery) => {
    setKeyWord(searchQuery);
    keyWord !== searchQuery && settingInitialState();
  };

  const onCheckBoxSearch = (searchQuery) => {
    setKeyWord(searchQuery);
    settingInitialState();
  };

  //search end ---------------------------------------------------------

  const resetStates = () => {
    setErrorMsg('');
  };

  // main api my movies start ----------------------------------

  useEffect(() => {
    const getUserAndMyMovies = (token) => {
      mainApi
        .getUserAndMyMovies(token)
        .then(([user, myMovies]) => {
          setCurrentUser(user);
          setMyMovies(myMovies);
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    token && getUserAndMyMovies(token);
  }, [token]);

  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            console.log(res);
            console.log([...myMovies, res.data]);
            setMyMovies([...myMovies, res.data]);
          } else {
            console.log('Произошла ошибка');
          }
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };

    isLoggedIn && addToFavorite(movieToAdd);
  }, [movieToAdd]);

  const onAddFavorite = (movieToAdd) => {
    setMovieToAdd(movieToAdd);
    settingInitialMyState();
  };

  // main api my movies end ----------------------------------

  // show more movies start ---------------------------------------

  useEffect(() => {
    resultToShow &&
      setResultToRender(
        resultToRender.concat(resultToShow.slice(firstIndex, lastIndex))
      );
  }, [resultToShow, lastIndex]);

  useEffect(() => {
    resultToShow && setIsShowMoreBtn(lastIndex < resultToShow.length);
  }, [resultToShow, lastIndex]);

  const onShowMore = () => {
    setFirstIndex(lastIndex);
    setLastIndex(lastIndex + showMoreIncrement);
  };

  // show more movies end ---------------------------------------

  // const [myMoviesToRender, setMoviesToRender]=useState({})
  // const [firstMyIndex, setFirstMyIndex] = useState(0);
  // const [lastMyIndex, setLastMyIndex] = useState(initialNumberItems);
  // const [isShowMoreMyBtn, setIsShowMoreMyBtn] = useState(false);

  // show more My movies start ---------------------------------------
  // console.log(myMovies, myMoviesToRender);
  useEffect(() => {
    myMovies &&
      setMyMoviesToRender(
        myMoviesToRender.concat(myMovies.slice(myFirstIndex, myLastIndex))
      );
  }, [myMovies, myLastIndex]);

  useEffect(() => {
    myMovies && setIsShowMyMoreBtn(myLastIndex < myMovies.length);
  }, [myMovies, myLastIndex]);

  const onMyMoviesShowMore = () => {
    setMyFirstIndex(myLastIndex);
    setMyLastIndex(myLastIndex + showMoreIncrement);
  };

  // show more My movies end ---------------------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>
          <ProtectedRoute
            path='/profile'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            onAuth={onEditProfile}
            resetStates={resetStates}
            errorMsg={errorMsg}
            onSignOut={onSignOut}
            component={Profile}
          />
          <ProtectedRoute
            path='/movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            onSearch={onSearchMovies}
            onCheckBox={onCheckBoxSearch}
            isShortLength={isShortLength}
            setIsShortLength={setIsShortLength}
            setIsFirstRender={setIsFirstRender}
            resultToRender={resultToRender}
            onShowMore={onShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onAddFavorite={onAddFavorite}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            myMoviesToRender={myMoviesToRender}
            onMyMoviesShowMore={onMyMoviesShowMore}
            isShowMoreBtn={isShowMyMoreBtn}
            onShowMore={onMyMoviesShowMore}
            component={SavedMovies}
          />
          <Route path='/signup'>
            <Register
              onAuth={onAuth}
              errorMsg={errorMsg}
              resetStates={resetStates}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path='/signin'>
            <Login
              onAuth={onAuth}
              errorMsg={errorMsg}
              resetStates={resetStates}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
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
