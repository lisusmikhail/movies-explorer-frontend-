const URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = async () => {
  const response = await fetch(URL);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.status);
  }
};
