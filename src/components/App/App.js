import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useGetMovies from '../../hooks/useGetMovies';
import useAuth from '../../hooks/useAuth';
import useGetInitialData from '../../hooks/useGetInitialData';
import {
  keyWordMaxLength,
  shortMovieThresholdDuration,
} from '../../utils/constants';
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
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchResultInfo, setSearchResultInfo] = useState('');
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
  const [myMoviesToRender, setMyMoviesToRender] = useState([]);
  const [isMyMoviesUpdated, setIsMyMoviesUpdated] = useState(false);
  //my search
  const [myKeyWord, setMyKeyWord] = useState('');
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
  const [isMovieMenuClicked, setIsMovieMenuClicked] = useState(false);
  const [isAllDataReady, setIsAllDataReady] = useState(false);
  // favorite
  const [movieToFavorite, setMovieToFavorite] = useState({});
  const [movieToDelFromFavorite, setMovieToDelFromFavorite] = useState({});
  //loader
  const [isLoader, setIsLoader] = useState(false);

  // console.log('++++++++++++++++++++++++++++++++++', myKeyWord);
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
  // console.log('render', myMoviesToRender && myMoviesToRender.length);
  // console.log('render', myMoviesToRender);
  // console.log(myMovies, myMoviesSearchResult, isAllDataReady);
  console.log('isFirstRender', isFirstRender, location, isLoader);
  // console.log(allMovies);
  // console.log(myMovies);

  const history = useHistory();

  useEffect(() => {
    setLocation(history.location.pathname);
    if (isFirstRender && location === '/saved-movies') {
      setIsLoader(true);
    }
  }, [location]);

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

  // Get initial set of movies , my movies, and  current user
  const {
    initialUser,
    initialMyMovies,
    readyToUseAllMovies,
  } = useGetInitialData(token, isMyMoviesUpdated);

  // console.log('initialUser, initialMyMovies, ', readyToUseAllMovies);

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
      setKeyWord(keyWordItem);
      shortLengthItem === 'false' || !shortLengthItem
        ? setIsShortLength(false)
        : setIsShortLength(true);
      setIsMoviesReadyToRender(true);
      const myKeyWordItem = localStorage.getItem('myKeyWord');
      setMyKeyWord(myKeyWordItem);
    }
  }, [isFirstRender]);

  const handleMovieMenuClick = () => {
    setIsMovieMenuClicked(!isMovieMenuClicked);
  };

  // movies rendering and show more button state
  const handleResultMovies = (result) => {
    console.log(result, result.length);

    if (result.length === 0 && !keyWord) {
      setSearchResultInfo('');
    } else if (result.length === 0 && !isFirstRender) {
      setSearchResultInfo('По вашему запросу ничего не найдено');
    } else {
      setSearchResultInfo('');
    }

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
      const moviesToShow = getNewSearchResult(allMovies, keyWord);
      setMoviesSearchResult(moviesToShow);
      setMoviesFilteredResult([]);
      localStorage.setItem('movies', JSON.stringify(moviesToShow));
      localStorage.setItem('keyWord', keyWord);
      setIsMoviesReadyToRender(true);
      setNewRender(!newRender);
      setIsLoader(false);
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
    // if (searchQuery.length === 0) {
    //   setSearchError('Введите ключевое слово, пожалуйста');
    // } else if (searchQuery.length >= keyWordMaxLength) {
    //   setSearchError(
    //     'Самое длинное словарное слово в русском языке состоит из 35 букв'
    //   );
    // } else if (searchResultInfo.length > 0) {
    //   setSearchError(searchResultInfo);
    // } else {
    //   setIsClearBtn(true);
    setSearchResultInfo('');
    setIsLoader(true);
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
    resetMoviesIndex();
  };

  // my movies search and filter triggers
  useEffect(() => {
    if (myMoviesSearchResult) {
      const moviesToShow = getMoviesToShow(myMoviesSearchResult);
      setMyMoviesToRender(moviesToShow);
      moviesToShow.length === 0 &&
        !isFirstRender &&
        setSearchResultInfo('По вашему запросу ничего не найдено');
      setIsLoader(false);
    }
  }, [myMoviesSearchResult, isShortLength]);

  useEffect(() => {
    const searchMyMovies = (myKeyWord) => {
      const moviesToShow = getNewSearchResult(myMovies, myKeyWord);
      setMyMoviesSearchResult(moviesToShow);
      setIsLoader(false);
    };
    myMovies && myKeyWord && searchMyMovies(myKeyWord);
  }, [myKeyWord, isMovieMenuClicked, isAllDataReady, myMovies]);

  const resetMyMoviesResults = () => {
    setMyMoviesSearchResult([]);
    setMyMoviesToRender([]);
  };

  const onSearchMyMovies = (searchQuery) => {
    // if (searchQuery.length === 0) {
    //   setSearchError('Введите ключевое слово, пожалуйста');
    // } else if (searchQuery.length >= keyWordMaxLength) {
    //   setSearchError(
    //     'Самое длинное словарное слово в русском языке состоит из 35 букв'
    //   );
    // } else if (searchResultInfo.length > 0) {
    //   setSearchError(searchResultInfo);
    // } else {
    //   setIsClearBtn(true);
    setSearchResultInfo('');
    setIsLoader(true);
    setIsFirstRender(false);
    resetMyMoviesResults();
    localStorage.setItem('myKeyWord', searchQuery);
    setMyKeyWord(searchQuery);
  };

  const onClearSearchMovies = () => {
    console.log('clearSearchMovies');
    setSearchResultInfo('');
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
      // console.log('onFavorite in App 2', token, movieToAdd);
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
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
    };
    isLoggedIn && movieToFavorite.movieId && addToFavorite(movieToFavorite);
  }, [movieToFavorite]);

  useEffect(() => {
    const delFromFavorite = (movieToDel) => {
      const handleDelMovie = (movieArray, res) => {
        let indexOfDelMovie;
        movieArray.find((movie, index) => {
          indexOfDelMovie = index;
          return movie.movieId === res.movieId;
        });
        delete movieArray[indexOfDelMovie]['_id'];
      };

      const handleDelMyMovie = (movieArray, res) => {
        let indexOfDelMovie;
        movieArray.find((movie, index) => {
          indexOfDelMovie = index;
          return movie._id === res._id;
        });
        movieArray.splice(indexOfDelMovie, 1);
      };

      mainApi
        .delFromFavorite(movieToDel, token)
        .then((res) => {
          if (res) {
            handleDelMyMovie(myMovies, res);
            handleDelMyMovie(myMoviesToRender, res);
            handleDelMovie(allMovies, res);
            handleDelMovie(moviesSearchResult, res);
            handleDelMovie(moviesToRender, res);
            setIsMyMoviesUpdated(!isMyMoviesUpdated);
          }
          setMovieToDelFromFavorite({});
        })
        .catch((errStatus) => handleError(errStatus, setErrorMsg));
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
            moviesToRender={moviesToRender}
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
            onFavorite={onFavorite}
            keyWord={myKeyWord}
            isLoader={isLoader}
            searchResultInfo={searchResultInfo}
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

// let indexOfUpdatedMovieInAllMovies;
// const updatedMovie = allMovies.find((movie) => {
//   indexOfUpdatedMovieInAllMovies = allMovies.indexOf(movie);
//   return movie.movieId === res.data.movieId;
// });
//
// allMovies[indexOfUpdatedMovieInAllMovies].isFavorite = true;
// allMovies.splice(indexOfUpdatedMovieInAllMovies, 1, updatedMovie);
//

// main api get my movies  ----------------------------------

// useEffect(() => {
//   const getUserAndMyMovies = (token) => {
//     mainApi
//       .getUserAndMyMovies(token)
//       .then(([user, myMovies]) => {
//         // setCurrentUser(user);//??????
//         // setMyMovies(myMovies);
//         // setMyMoviesSearchResult(myMovies);
//         // setMyMoviesToRender([]); //???????????????????
//       })
//       .catch((errStatus) => handleError(errStatus, setErrorMsg));
//   };
//   token && getUserAndMyMovies(token);
// }, [token, isMyMoviesUpdated]);
