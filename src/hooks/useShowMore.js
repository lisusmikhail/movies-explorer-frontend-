import React, { useState, useEffect } from 'react';
import { initialNumberItems, showMoreIncrement } from '../utils/constants';

function useShowMore(props) {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialNumberItems);
  console.log(props);

  const resultToShow = props.resultToShow;
  const setResultToRender = props.setResultToRender;
  const resultToRender = props.resultToRender;
  const setIsShowMoreBtn = props.setIsShowMoreBtn;

  useEffect(() => {
    resultToShow &&
      setResultToRender(
        resultToRender.concat(resultToShow.slice(firstIndex, lastIndex))
      );
  }, [resultToShow, lastIndex]);

  useEffect(() => {
    resultToShow && setIsShowMoreBtn(lastIndex < resultToShow.length);
  }, [resultToShow, lastIndex]);

  const onShowMore = () => {
    setFirstIndex(lastIndex);
    setLastIndex(lastIndex + showMoreIncrement);
  };

  const resetIndex = () => {
    setFirstIndex(0);
    setLastIndex(initialNumberItems);
  };

  return {
    onShowMore,
    resetIndex,
  };
}

export default useShowMore;
