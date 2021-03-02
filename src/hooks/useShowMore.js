import React, { useState, useEffect } from 'react';
import { initialNumberItems, showMoreIncrement } from '../utils/constants';

function useShowMore(props) {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialNumberItems);

  const resultToShow = props.rToShow;
  const setResultToRender = props.sResultToRender;
  const resultToRender = props.rToResult;
  const setIsShowMoreBtn = props.sIsShowMoreBtn;

  useEffect(() => {
    resultToShow &&
      setResultToRender(
        resultToRender.concat(resultToShow.slice(firstIndex, lastIndex))
      );
  }, [resultToShow, lastIndex]);

  useEffect(() => {
    resultToShow && setIsShowMoreBtn(lastIndex < resultToShow.length);
  }, [resultToShow, lastIndex]);

  // const onShowMore = () => {
  //   setFirstIndex(lastIndex);
  //   setLastIndex(lastIndex + showMoreIncrement);
  // };
  return {
    sFirstIndex: setFirstIndex,
    sLastIndex: setLastIndex,
    lIndex: lastIndex,
  };
}

export default useShowMore;
