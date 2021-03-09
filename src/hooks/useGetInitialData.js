import { useState, useEffect } from 'react';
import { handleError } from '../utils/error-handler';
import * as mainApi from '../utils/MainApi';

function useGetInitialData(
  token,
  isMyMoviesUpdated,
  setErrorMsg,
  setSearchResultError,
  setIsLoader
) {
  const [initialUser, setInitialUser] = useState({});
  const [initialMyMovies, setInitialMyMovies] = useState([]);
  const [initialAllMovies, setInitialAllMovies] = useState([]);
  const [readyToUseAllMovies, setReadyYoUseAllMovies] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    const getInitialData = (token) => {
      mainApi
        .getInitialData(token)
        .then(([user, myMovies, allMovies]) => {
          setInitialUser(user);
          setInitialMyMovies(myMovies);
          setInitialAllMovies(allMovies);
          setIsDataReady(true);
        })
        .catch((err) => {
          if (err.message === 'Failed to fetch') {
            handleError(503, setSearchResultError);
          } else if (err.url.indexOf('movie')) {
            handleError(err, setSearchResultError);
          } else {
            handleError(err.status, setSearchResultError);
          }
        })
        .finally(() => setIsLoader(false));
    };
    token && getInitialData(token);
  }, [token, isMyMoviesUpdated]);

  useEffect(() => {
    const tempArr = [];
    initialAllMovies.forEach((movie) => {
      const readyToStoreMovie = {
        movieId: movie.id,
        country: movie.country ? movie.country : 'Unknown Country',
        director: movie.director ? movie.director : 'Unknown Director',
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : 'Unknown Year',
        description: movie.description
          ? movie.description
          : 'Unknown Description',
        image: movie.image
          ? 'https://api.nomoreparties.co' + movie.image.url
          : 'https://images.unsplash.com/photo-1537237858032-3ad1b513cbcc',
        trailer: movie.trailerLink ? movie.trailerLink : 'Unknown Trailer Link',
        thumbnail:
          movie.image && movie.image.formats.thumbnail
            ? 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url
            : 'https://images.unsplash.com/photo-1537237858032-3ad1b513cbcc',
        nameRU: movie.nameRU ? movie.nameRU : 'Unknown RU Name',
        nameEN: movie.nameEN ? movie.nameEN : 'unknown EN Name',
      };

      const isFavorite = initialMyMovies.filter((myMovie) => {
        return myMovie.movieId === movie.id;
      });

      if (isFavorite.length > 0) {
        readyToStoreMovie._id = isFavorite[0]._id;
      }

      tempArr.push(readyToStoreMovie);
    });
    setReadyYoUseAllMovies(tempArr);
  }, [isDataReady]);

  return { initialUser, readyToUseAllMovies, initialMyMovies };
}

export default useGetInitialData;
