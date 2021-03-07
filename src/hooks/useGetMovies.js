// import { useEffect, useState } from 'react';
// import { handleError } from '../utils/error-handler';
// import { getMovies } from '../utils/MoviesApi';
//
// function useGetMovies(isLoggedIn) {
//   const [gottenMovies, setGottenMovies] = useState([]);
//
//   useEffect(() => {
//     isLoggedIn &&
//       getMovies()
//         .then((movies) => {
//           setGottenMovies(movies);
//         })
//         .catch(() => {
//           handleError(500, 'errorMessage');
//         });
//   }, [isLoggedIn]);
//
//   return { gottenMovies };
// }
//
// export default useGetMovies;
