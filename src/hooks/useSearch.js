// import { useState, useEffect } from 'react';
// import { shortMovieThresholdDuration } from '../utils/constants';
//
// function useSearch(
//   keyWord,
//   isShortLength,
//   handleReadyToRenderState,
//   allMovies,
//   moviesToRender,
//   isFirstRender
// ) {
//   console.log('searching for', keyWord, isShortLength);
//   const [moviesToShowHook, setMoviesToShowHook] = useState([]);
//   const [startSearch, setStartSearch] = useState(false);
//
//   useEffect(() => {
//     console.log('search start');
//     const searchMovies = (keyWord) => {
//       console.log('search start1');
//       const checkMovie = (movie) => {
//         const nameRu = movie['nameRU'].toLowerCase().trim();
//         const word = keyWord.toLowerCase().trim();
//         const isShort = movie['duration'] < shortMovieThresholdDuration;
//         return (!isShortLength || isShort) && nameRu.indexOf(word) > -1;
//       };
//       const moviesToShow = allMovies.filter(checkMovie);
//       console.log(moviesToShow);
//       setMoviesToShowHook(moviesToShow);
//       localStorage.setItem('movies', JSON.stringify(moviesToShow));
//       localStorage.setItem('keyWord', keyWord);
//       localStorage.setItem('isShortLength', isShortLength.toString());
//       handleReadyToRenderState(true);
//     };
//
//     moviesToRender.length === 0 &&
//       !isFirstRender &&
//       allMovies &&
//       keyWord &&
//       searchMovies(keyWord);
//   }, [keyWord, isShortLength, startSearch]);
//
//   useEffect(() => {
//     setStartSearch(!startSearch);
//   }, [keyWord, isShortLength]);
//
//   console.log(moviesToShowHook);
//
//   return moviesToShowHook;
// }
//
// export default useSearch;

// const handleReadyToRenderState = (state) => {
//   setIsMovieReadyToRender(state);
// };
//
// const moviesToShowHook = useSearch(
//   keyWord,
//   isShortLength,
//   handleReadyToRenderState,
//   allMovies,
//   moviesToRender,
//   isFirstRender
// );
//
// useEffect(() => {
//   setMoviesToShow(moviesToShowHook);
// }, [keyWord, isShortLength, isFirstRender]);
//
