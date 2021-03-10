export const timeConversion = (durations) => {
  const hours = Math.floor(durations / 60);
  const minutes = durations % 60;
  return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
};

export const moviePreparation = (movie) => {
  const isValidURL = (string) => {
    if (string !== null) {
      const res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g
      );
      return res !== null ? res[0] : 'https://myvideobookmark.com/404';
    }
  };

  const movieImage = !movie.image
    ? 'https://source.unsplash.com/random'
    : isValidURL('https://api.nomoreparties.co' + movie.image.url);

  const movieTrailer = !movie.trailerLink
    ? 'https://myvideobookmark.com/404'
    : isValidURL(movie.trailerLink);

  const movieThumbnail =
    movie.image && movie.image.formats.thumbnail
      ? isValidURL(
          'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url
        )
      : 'https://source.unsplash.com/random';

  return {
    movieId: movie.id,
    country: movie.country ? movie.country : 'Unknown Country',
    director: movie.director ? movie.director : 'Unknown Director',
    duration: movie.duration ? movie.duration : 0,
    year: movie.year ? movie.year : 'Unknown Year',
    description: movie.description ? movie.description : 'Unknown Description',
    image: movieImage,
    trailer: movieTrailer,
    thumbnail: movieThumbnail,
    nameRU: movie.nameRU ? movie.nameRU : 'Unknown RU Name',
    nameEN: movie.nameEN ? movie.nameEN : 'unknown EN Name',
  };
};
