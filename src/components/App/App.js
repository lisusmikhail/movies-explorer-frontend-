import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useGetMovies from '../../hooks/useGetMovies';
import useAuth from '../../hooks/useAuth';
import { shortMovieThresholdDuration } from '../../utils/constants';
import useEditProfile from '../../hooks/useEditProfile';
import useShowMore from '../../hooks/useShowMore';
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
  const [errorMsg, setErrorMsg] = useState('');
  //user
  const [isLogOut, setIsLogOut] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState('');
  const [credentials, setCredentials] = useState({});
  const [newProfile, setNewProfile] = useState({});
  // search criteria
  const [keyWord, setKeyWord] = useState('');
  const [isShortLength, setIsShortLength] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  //my movies
  const [myMovies, setMyMovies] = useState([]);
  const [myMoviesSearchResult, setMyMoviesSearchResult] = useState([]);
  const [myMoviesFilteredResult, setMyMoviesFilteredResult] = useState([]);
  const [myMoviesToRender, setMyMoviesToRender] = useState([]);
  const [isMyMoviesUpdated, setIsMyMoviesUpdated] = useState(false);
  //my search
  const [myKeyWord, setMyKeyWord] = useState('');
  const [newMySearch, setNewMySearch] = useState(false);
  //all movies
  const [allMovies, setAllMovies] = useState([]);
  const [moviesSearchResult, setMoviesSearchResult] = useState([]);
  const [moviesFilteredResult, setMoviesFilteredResult] = useState([]);
  const [moviesToRender, setMoviesToRender] = useState([]);
  // movies rendering
  const [newSearch, setNewSearch] = useState(false);
  const [newRender, setNewRender] = useState(false);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);
  const [isMoviesReadyToRender, setIsMoviesReadyToRender] = useState(false);
  // favorite
  const [movieToFavorite, setMovieToFavorite] = useState({});

  console.log('++++++++++++++++++++++++++++++++++', myKeyWord);
  // console.log({ isFirstRender });
  // console.log({ isMovieReadyToRender });
  // console.log('search', moviesSearchResult && moviesSearchResult.length);
  // console.log('filter', moviesFilteredResult && moviesFilteredResult.length);
  // console.log('filter', moviesFilteredResult);

  // console.log('initial', myMoviesSearchResult && myMoviesSearchResult.length);
  // console.log('render', myMoviesToRender && myMoviesToRender.length);
  // console.log('render', myMoviesToRender);
  // Authentication and Authorization

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
    localStorage.clear();
    setKeyWord('');
    setIsShortLength(false);
  };

  const onEditProfile = (email, _, name) => {
    setNewProfile({ email, name, token });
  };

  useEffect(() => {
    newUsersProfile.name && setCurrentUser(newUsersProfile);
  }, [newUsersProfile]);

  const resetStates = () => {
    setErrorMsg('');
  };

  // First render: get values and attributes from localStorage
  useEffect(() => {
    if (isFirstRender) {
      const shortLengthItem = localStorage.getItem('isShortLength');
      const keyWordItem = localStorage.getItem('keyWord');
      const moviesToShowItems = JSON.parse(localStorage.getItem('movies'));
      setMoviesSearchResult(moviesToShowItems);
      setKeyWord(keyWordItem);
      shortLengthItem === 'false' || !shortLengthItem
        ? setIsShortLength(false)
        : setIsShortLength(true);
      setIsMoviesReadyToRender(true);
      const myKeyWordItem = localStorage.getItem('myKeyWord');
      setMyKeyWord(myKeyWordItem);
    }
  }, [isFirstRender]);

  // Get initial set of movies
  const { gottenMovies } = useGetMovies(isLoggedIn);

  useMemo(() => {
    setAllMovies(gottenMovies);
  }, [gottenMovies]);

  const handleMovieMenuClick = () => {};

  // movies rendering and show more button state
  const handleResultMovies = (result) => {
    setMoviesToRender(result);
  };

  const handleBtnMovies = (state) => {
    setIsShowMoreBtn(state);
  };

  const moviesShowMoreBtn = useShowMore({
    isReadyToRender: isMoviesReadyToRender,
    resultToShow: moviesFilteredResult,
    resultToRender: moviesToRender,
    handleResult: handleResultMovies,
    handleBtn: handleBtnMovies,
    newRender: newRender,
  });

  const onMoviesShowMore = moviesShowMoreBtn.onShowMore;
  const resetMoviesIndex = moviesShowMoreBtn.resetIndex;

  //movies search
  const getNewSearchResult = (moviesSet, newKeyWord) => {
    const checkMovie = (movie) => {
      const nameRu = movie['nameRU'].toLowerCase().trim();
      const word = newKeyWord.toLowerCase().trim();
      return nameRu.indexOf(word) > -1;
    };
    return moviesSet.filter(checkMovie);
  };

  useEffect(() => {
    const searchMovies = (keyWord) => {
      console.log('new search');
      const moviesToShow = getNewSearchResult(allMovies, keyWord);
      setMoviesSearchResult(moviesToShow);
      setMoviesFilteredResult([]);
      localStorage.setItem('movies', JSON.stringify(moviesToShow));
      localStorage.setItem('keyWord', keyWord);
      setIsMoviesReadyToRender(true);
      setNewRender(!newRender);
    };

    moviesToRender.length === 0 &&
      !isFirstRender &&
      allMovies &&
      keyWord &&
      searchMovies(keyWord);
  }, [keyWord, newSearch]);

  //movies filter
  const getMoviesToShow = (moviesResult) => {
    const checkMovie = (movie) => {
      const isShort = movie['duration'] < shortMovieThresholdDuration;
      return !isShortLength || isShort;
    };
    return moviesResult.filter(checkMovie);
  };

  useEffect(() => {
    if (moviesSearchResult && moviesFilteredResult.length === 0) {
      const moviesToShow = getMoviesToShow(moviesSearchResult);
      setMoviesFilteredResult(moviesToShow);
      setNewRender(!newRender);
    }
  }, [moviesSearchResult, isShortLength]);

  //search and filter triggers
  const resetMoviesResults = () => {
    setMoviesSearchResult([]);
    setMoviesFilteredResult([]);
    setMoviesToRender([]);
  };

  const onSearchMovies = (searchQuery) => {
    setIsFirstRender(false);
    if (searchQuery !== keyWord) {
      resetMoviesResults();
      setIsMoviesReadyToRender(false);
      resetMoviesIndex();
    } else {
      resetMoviesIndex();
      resetMoviesResults();
      setNewSearch(!newSearch);
    }
    setKeyWord(searchQuery);
  };

  const handleIsShortLength = (state) => {
    localStorage.setItem('isShortLength', state);
    setIsShortLength(state);
    setMoviesFilteredResult([]);
    setMoviesToRender([]);
    // setMyMoviesToRender([]);
    resetMoviesIndex();
  };

  // main api get my movies  ----------------------------------

  useEffect(() => {
    const getUserAndMyMovies = (token) => {
      mainApi
        .getUserAndMyMovies(token)
        .then(([user, myMovies]) => {
          setCurrentUser(user);
          setMyMovies(myMovies);
          setMyMoviesSearchResult(myMovies);
          setMyMoviesToRender([]); //???????????????????
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    token && getUserAndMyMovies(token);
  }, [token, isMyMoviesUpdated]);

  // my movies search and filter triggers
  useEffect(() => {
    // debugger;
    if (myMoviesSearchResult) {
      const moviesToShow = getMoviesToShow(myMoviesSearchResult);
      console.log('move search 222222', moviesToShow);
      setMyMoviesToRender(moviesToShow);
    }
  }, [myMoviesSearchResult, isShortLength]);

  useEffect(() => {
    const searchMyMovies = (myKeyWord) => {
      console.log('new my search');
      const moviesToShow = getNewSearchResult(myMovies, myKeyWord);
      setMyMoviesSearchResult(moviesToShow);
    };

    myMoviesToRender.length === 0 &&
      myMovies &&
      myKeyWord &&
      searchMyMovies(myKeyWord);
  }, [myKeyWord, myMoviesSearchResult]);

  const resetMyMoviesResults = () => {
    setMyMoviesSearchResult([]);
    setMyMoviesFilteredResult([]);
    setMyMoviesToRender([]);
  };

  const onSearchMyMovies = (searchQuery) => {
    setIsFirstRender(false);
    resetMyMoviesResults();
    localStorage.setItem('myKeyWord', searchQuery);
    setMyKeyWord(searchQuery);
  };

  const onClearSearchMovies = () => {
    setKeyWord('');
    resetMoviesResults();
    localStorage.removeItem('keyWord');
    localStorage.removeItem('movies');
    localStorage.removeItem('isShortLength');
  };

  const onClearSearchMyMovies = () => {
    setMyKeyWord('');
    localStorage.removeItem('myKeyWord');
    setMyMoviesSearchResult(myMovies);
  };

  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          } else {
            console.log('Произошла ошибка');
          }
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    isLoggedIn && addToFavorite(movieToFavorite);
  }, [movieToFavorite]);

  const onFavorite = (movie) => {
    setMovieToFavorite(movie);
  };

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
            handleMovieMenuClick={handleMovieMenuClick}
            component={Profile}
          />
          <ProtectedRoute
            path='/movies'
            isLoggedIn={isLoggedIn}
            isTokenChecked={isTokenChecked}
            onSearch={onSearchMovies}
            isShortLength={isShortLength}
            handleIsShortLength={handleIsShortLength}
            moviesToRender={moviesToRender}
            onShowMore={onMoviesShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onFavorite={onFavorite}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            onClearSearch={onClearSearchMovies}
            keyWord={keyWord}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            onSearch={onSearchMyMovies}
            isTokenChecked={isTokenChecked}
            myMoviesToRender={myMoviesToRender}
            handleIsShortLength={handleIsShortLength}
            isShortLength={isShortLength}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            onClearSearch={onClearSearchMyMovies}
            keyWord={myKeyWord}
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
            <Header
              isLoggedIn={isLoggedIn}
              handleMovieMenuClick={handleMovieMenuClick}
            />
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
