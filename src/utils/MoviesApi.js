const URL = 'https://api.nomoreparties.co/beatfilm-movies';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const getMovies = () => {
  console.log(
    ' fetch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
  );
  return fetch(URL).then((res) => handleResponse(res));
};
