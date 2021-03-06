import { useEffect, useState } from 'react';
import { shortMovieThresholdDuration } from '../utils/constants';

function useFilter(props) {
  const searchResult = props.searchResult;
  const filteredResult = props.filteredResult;
  const isShortLength = props.isShortLength;
  const newRender = props.newRender;
  const newFilter = props.newFilter;

  console.log('in filter', searchResult);

  const [result, setResult] = useState([]);
  const [localNewRender, setLocalNewRender] = useState(newRender);

  useEffect(() => {
    if (searchResult) {
      console.log('searchResult+++++++++++++++++++++++++++', searchResult);
      const checkMovie = (movie) => {
        const isShort = movie['duration'] < shortMovieThresholdDuration;
        return !isShortLength || isShort;
      };
      const moviesToShow = searchResult.filter(checkMovie);
      setResult(moviesToShow);
      setLocalNewRender(!localNewRender);
    }
  }, [newFilter]);

  console.log(
    'result',
    result,
    localNewRender,
    searchResult,
    filteredResult,
    isShortLength
  );
  return {
    result,
    localNewRender,
  };
}

export default useFilter;
