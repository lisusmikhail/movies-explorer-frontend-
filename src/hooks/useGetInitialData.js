import { useState, useEffect } from 'react';
import { handleError } from '../utils/error-handler';
import * as mainApi from '../utils/MainApi';

function useGetInitialData(token, isMyMoviesUpdated) {
  const [initialUser, setInitialUser] = useState({});
  const [initialMyMovies, setInitialMyMovies] = useState([]);
  const [initialAllMovies, setInitialAllMovies] = useState([]);
  const [readyToUseAllMovies, setReadyYoUseAllMovies] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    // console.log('useGetInitialData+++++++++++++++++++++++++++++++>');

    const getInitialData = (token) => {
      mainApi
        .getInitialData(token)
        .then(([user, myMovies, allMovies]) => {
          setInitialUser(user);
          setInitialMyMovies(myMovies);
          setInitialAllMovies(allMovies);
          setIsDataReady(true);
        })
        .catch((errStatus) => console.error(errStatus)); //????????????
      // catch((errStatus) => handleError(errStatus, 'test')); //????????????
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
      // console.log(isFavorite[0]);
      // readyToStoreMovie.isFavorite = isFavorite.length > 0;

      if (isFavorite.length > 0) {
        readyToStoreMovie._id = isFavorite[0]._id;
      }

      tempArr.push(readyToStoreMovie);
    });
    setReadyYoUseAllMovies(tempArr);
  }, [isDataReady]);

  // console.log('Main+++++++++ ', readyToUseAllMovies);

  return { initialUser, readyToUseAllMovies, initialMyMovies };
}

export default useGetInitialData;
