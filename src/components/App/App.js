import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useAuth from '../../hooks/useAuth';
import useGetInitialData from '../../hooks/useGetInitialData';
import {
  initialNumberItems,
  keyWordMaxLength,
  shortMovieThresholdDuration,
  showMoreIncrement,
} from '../../utils/constants';
import useEditProfile from '../../hooks/useEditProfile';
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
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchResultInfo, setSearchResultInfo] = useState('');
  const [searchResultError, setSearchResultError] = useState('');

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
  const [isMyMoviesUpdated, setIsMyMoviesUpdated] = useState(false);
  //my search
  const [myKeyWord, setMyKeyWord] = useState('');
  //all movies
  const [allMovies, setAllMovies] = useState([]);
  const [moviesSearchResult, setMoviesSearchResult] = useState([]);
  const [moviesFilteredResult, setMoviesFilteredResult] = useState([]);
  // movies rendering
  const [newSearch, setNewSearch] = useState(false);
  const [newRender, setNewRender] = useState(false);
  const [isShowMoreBtn, setIsShowMoreBtn] = useState(false);
  const [isMovieMenuClicked, setIsMovieMenuClicked] = useState(false);
  const [isAllDataReady, setIsAllDataReady] = useState(false);
  // favorite
  const [movieToFavorite, setMovieToFavorite] = useState({});
  const [movieToDelFromFavorite, setMovieToDelFromFavorite] = useState({});
  //loader
  const [isLoader, setIsLoader] = useState(false);
  //on show more button
  const [lastIndex, setLastIndex] = useState(initialNumberItems);
  const [lastMyIndex, setLastMyIndex] = useState(0);
  const [isClearBtn, setIsClearBtn] = useState(false);

  // console.log('++++++++++++++++++++++++++++++++++', myKeyWord);
  // console.log('++++++++++++++++++++++++++++++++++', keyWord);
  // console.log({ isFirstRender });
  // console.log('=================================', myMovies);
  // console.log({ isMovieReadyToRender });
  // console.log(
  //   'moviesSearchResult',
  //   moviesSearchResult,
  //   moviesSearchResult && moviesSearchResult.length
  // );
  // console.log(
  //   'moviesToRender',
  //   moviesToRender,
  //   moviesToRender && moviesToRender.length
  // );
  // console.log('filter', moviesFilteredResult && moviesFilteredResult.length);
  // console.log('filter', moviesFilteredResult);
  // console.log(currentUser);
  // console.log(
  //   'myMoviesSearchResult',
  //   myMoviesSearchResult,
  //   myMoviesSearchResult && myMoviesSearchResult.length
  // );
  // console.log(
  //   'render',
  //   myMoviesFilteredResult,
  //   myMoviesFilteredResult && myMoviesFilteredResult.length
  // );
  // console.log('render', myMoviesToRender);
  // console.log(myMovies, myMoviesSearchResult, isAllDataReady);
  // console.log('isFirstRender', isFirstRender, location, isLoader);
  // console.log(allMovies);
  // console.log(myMovies);

  const history = useHistory();

  useEffect(() => {
    if (
      isFirstRender &&
      location === '/saved-movies' &&
      myMoviesFilteredResult.length === 0
    ) {
      setIsLoader(true);
      setIsMyMoviesUpdated(!isMyMoviesUpdated);
    }
  }, [location]);

  useEffect(() => {
    setSearchResultInfo('');
    setSearchResultError('');
  }, [location]);

  useEffect(() => {
    setLocation(history.location.pathname);
  }, [isMovieMenuClicked]);

  // Authentication and Authorization
  const { isLoggedIn } = useAuth(
    credentials,
    setErrorMsg,
    setToken,
    setIsTokenChecked,
    isLogOut,
    setIsLogOut
  );

  const handleLoader = (state) => {
    setIsLoader(state);
  };

  const { newUsersProfile } = useEditProfile(
    newProfile,
    isLoggedIn,
    setErrorMsg,
    handleLoader
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

  // Get initial data of all movies , my movies, and  current user
  const {
    initialUser,
    initialMyMovies,
    readyToUseAllMovies,
  } = useGetInitialData(
    token,
    isMyMoviesUpdated,
    setErrorMsg,
    setSearchResultError,
    setIsLoader
  );

  useMemo(() => {
    setCurrentUser(initialUser);
    setMyMovies(initialMyMovies);
    setMyMoviesSearchResult(initialMyMovies);
    setAllMovies(readyToUseAllMovies);
    setIsAllDataReady(!isAllDataReady);
  }, [initialUser, initialMyMovies, readyToUseAllMovies]);

  // First render: get values and attributes from localStorage
  useEffect(() => {
    if (isFirstRender) {
      const shortLengthItem = localStorage.getItem('isShortLength');
      const keyWordItem = localStorage.getItem('keyWord');
      const moviesToShowItems = JSON.parse(localStorage.getItem('movies'));
      setMoviesSearchResult(moviesToShowItems);
      keyWordItem === null ? setKeyWord('') : setKeyWord(keyWordItem);
      shortLengthItem === 'false' || !shortLengthItem
        ? setIsShortLength(false)
        : setIsShortLength(true);
      const myKeyWordItem = localStorage.getItem('myKeyWord');
      myKeyWordItem === null ? setMyKeyWord('') : setMyKeyWord(myKeyWordItem);
    }
  }, [isFirstRender]);

  // movies rendering and show more button state
  const onMoviesShowMore = () => {
    setLastIndex(lastIndex + showMoreIncrement);
  };

  const resetMoviesIndex = () => {
    setLastIndex(initialNumberItems);
  };

  const handleBtnMovies = (state) => {
    setIsShowMoreBtn(state);
  };

  useEffect(() => {
    moviesFilteredResult &&
      handleBtnMovies(lastIndex < moviesFilteredResult.length);
  }, [lastIndex, moviesFilteredResult, newRender]);

  //general states and functions
  const handleMovieMenuClick = () => {
    setIsMovieMenuClicked(!isMovieMenuClicked);
  };

  const resetMyMoviesResults = () => {
    setMyMoviesSearchResult([]);
    setMyMoviesFilteredResult([]);
  };

  const resetMoviesResults = () => {
    setMoviesSearchResult([]);
    setMoviesFilteredResult([]);
  };

  const handleIsShortLength = (state) => {
    localStorage.setItem('isShortLength', state);
    setIsShortLength(state);
    setMoviesFilteredResult([]);
  };

  //movies and my movies search
  const getNewSearchResult = (moviesSet, newKeyWord) => {
    const checkMovie = (movie) => {
      const nameRu = movie['nameRU'].toLowerCase().trim();
      const word = newKeyWord.toLowerCase().trim();
      return nameRu.indexOf(word) > -1;
    };
    return moviesSet.filter(checkMovie);
  };

  const handleNoContentMsg = (currentMovieSet, currentKeyWord) => {
    const currentMessage = isShortLength
      ? 'По вашему запросу ничего не найдено. Попробуйте поискать без фильтра "короткометражки".'
      : 'По вашему запросу ничего не найдено.';
    !isFirstRender &&
      currentMovieSet.length === 0 &&
      currentKeyWord &&
      setSearchResultInfo(currentMessage);
    currentMovieSet.length !== 0 && setSearchResultInfo('');
  };

  const handleQueryException = (currentKeyWord, currentQuery) => {
    if (!currentKeyWord && !currentQuery) {
      setSearchResultInfo('Введите ключевое слово, пожалуйста.');
    } else if (currentQuery.length > 35) {
      setSearchResultInfo(
        'Самое длинное словарное слово в русском языке состоит из 35 букв.'
      );
      setIsClearBtn(true);
    }
  };

  useEffect(() => {
    const searchMovies = (keyWord) => {
      const moviesToShow = getNewSearchResult(allMovies, keyWord);
      setMoviesSearchResult(moviesToShow);
      setMoviesFilteredResult([]);
      localStorage.setItem('movies', JSON.stringify(moviesToShow));
      localStorage.setItem('keyWord', keyWord);
      setNewRender(!newRender);
      setIsLoader(false);
    };

    !isFirstRender && allMovies && keyWord && searchMovies(keyWord);
  }, [keyWord, newSearch]);

  useEffect(() => {
    const searchMyMovies = (myKeyWord) => {
      const moviesToShow = getNewSearchResult(myMovies, myKeyWord);
      localStorage.setItem('myKeyWord', myKeyWord);
      setMyMoviesSearchResult(moviesToShow);
      setIsLoader(false);
    };
    myMovies && myKeyWord && searchMyMovies(myKeyWord);
  }, [myKeyWord, isMovieMenuClicked, isAllDataReady, myMovies]);

  const onSearchMovies = (searchQuery) => {
    setSearchResultInfo('');
    if (keyWord !== searchQuery && !!searchQuery) {
      setIsFirstRender(false);
      resetMoviesIndex();
      resetMoviesResults();
      setNewSearch(!newSearch);
      setKeyWord(searchQuery);
    } else {
      handleQueryException(keyWord, searchQuery);
    }
  };

  const onSearchMyMovies = (searchQuery) => {
    setSearchResultInfo('');
    if (myKeyWord !== searchQuery && !!searchQuery) {
      setIsFirstRender(false);
      setMyKeyWord(searchQuery);
    } else {
      handleQueryException(myKeyWord, searchQuery);
    }
  };

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

  useEffect(() => {
    if (myMoviesSearchResult) {
      const moviesToShow = getMoviesToShow(myMoviesSearchResult);
      setLastMyIndex(moviesToShow.length - 1);
      setMyMoviesFilteredResult(moviesToShow);
      setIsLoader(false);
    }
  }, [myMoviesSearchResult, isShortLength]);

  useEffect(() => {
    handleNoContentMsg(moviesFilteredResult, myKeyWord);
  }, [moviesFilteredResult]);

  useEffect(() => {
    handleNoContentMsg(myMoviesFilteredResult, keyWord);
  }, [myMoviesFilteredResult]);

  //clear search button
  const onClearSearchMovies = () => {
    setKeyWord('');
    setSearchResultInfo('');
    setIsClearBtn(false);
    resetMoviesResults();
    localStorage.setItem('keyWord', '');
    localStorage.removeItem('movies');
    localStorage.removeItem('isShortLength');
  };

  const onClearSearchMyMovies = () => {
    setMyKeyWord('');
    setSearchResultInfo('');
    setIsClearBtn(false);
    resetMyMoviesResults();
    localStorage.setItem('myKeyWord', '');
    setMyMoviesSearchResult(myMovies);
  };

  useEffect(() => {
    if (location === '/saved-movies') {
      myKeyWord ? setIsClearBtn(true) : setIsClearBtn(false);
    } else if (location === '/movies') {
      keyWord ? setIsClearBtn(true) : setIsClearBtn(false);
    }
  }, [keyWord, myKeyWord, location]);

  // add favorite
  useEffect(() => {
    const addToFavorite = (movieToAdd) => {
      mainApi
        .addToFavorite(movieToAdd, token)
        .then((res) => {
          if (res) {
            let indexOfAdd;
            moviesSearchResult.find((movie) => {
              indexOfAdd = moviesSearchResult.indexOf(movie);
              return movie.movieId === res.data.movieId;
            });

            moviesSearchResult[indexOfAdd]._id = res.data._id;
            localStorage.setItem('movies', JSON.stringify(moviesSearchResult));
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          } else {
            console.log('Произошла ошибка');
          }
          setMovieToFavorite({});
        })
        .catch((err) => handleError(err.status, setSearchResultError));
    };

    isLoggedIn && movieToFavorite.movieId && addToFavorite(movieToFavorite);
  }, [movieToFavorite]);

  // del favorite
  useEffect(() => {
    const delFromFavorite = (movieToDel) => {
      setIsLoader(true);
      const handleDelMovie = (movieArray, res) => {
        let indexOfDelMovie;
        movieArray.find((movie, index) => {
          indexOfDelMovie = index;
          return movie.movieId === res.movieId;
        });
        delete movieArray[indexOfDelMovie]['_id'];
        movieArray === moviesSearchResult &&
          localStorage.setItem('movies', JSON.stringify(movieArray));
      };

      const handleDelMyMovie = (movieArray, res) => {
        let indexOfDelMovie;
        movieArray.find((movie, index) => {
          indexOfDelMovie = index;
          return movie._id === res._id;
        });
        movieArray.splice(indexOfDelMovie, 1);
        setIsMyMoviesUpdated(!isMyMoviesUpdated);
      };

      mainApi
        .delFromFavorite(movieToDel, token)
        .then((res) => {
          if (res) {
            handleDelMyMovie(myMovies, res);
            handleDelMovie(allMovies, res);
            handleDelMovie(moviesSearchResult, res);
            handleDelMovie(moviesFilteredResult, res);
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          }
          setMovieToDelFromFavorite({});
        })
        .catch((err) => handleError(err.status, setSearchResultError));
    };

    isLoggedIn &&
      movieToDelFromFavorite._id &&
      delFromFavorite(movieToDelFromFavorite);
  }, [movieToDelFromFavorite]);

  const onFavorite = (movie) => {
    if (!movie._id) {
      setMovieToFavorite(movie);
    } else {
      setMovieToDelFromFavorite(movie);
    }
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
            moviesFilteredResult={moviesFilteredResult}
            lastIndex={lastIndex}
            onShowMore={onMoviesShowMore}
            isShowMoreBtn={isShowMoreBtn}
            onFavorite={onFavorite}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            onClearSearch={onClearSearchMovies}
            keyWord={keyWord}
            isMyMoviesUpdated={isMyMoviesUpdated}
            isLoader={isLoader}
            searchResultInfo={searchResultInfo}
            searchResultError={searchResultError}
            isClearBtn={isClearBtn}
            component={Movies}
          />
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            onSearch={onSearchMyMovies}
            isTokenChecked={isTokenChecked}
            moviesFilteredResult={myMoviesFilteredResult}
            lastIndex={lastMyIndex}
            handleIsShortLength={handleIsShortLength}
            isShortLength={isShortLength}
            handleMovieMenuClick={handleMovieMenuClick}
            myMovies={myMovies}
            onClearSearch={onClearSearchMyMovies}
            onFavorite={onFavorite}
            keyWord={myKeyWord}
            isLoader={isLoader}
            searchResultInfo={searchResultInfo}
            searchResultError={searchResultError}
            isClearBtn={isClearBtn}
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
