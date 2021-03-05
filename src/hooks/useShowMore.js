import React, { useState, useEffect } from 'react';
import { initialNumberItems, showMoreIncrement } from '../utils/constants';

function useShowMore(props) {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialNumberItems);

  const isReadyToRender = props.isReadyToRender;
  const resultToShow = props.resultToShow;
  const handleResult = props.handleResult;
  const resultToRender = props.resultToRender;
  const handleBtn = props.handleBtn;
  const isNewRender = props.isNewRender;

  // console.log({ firstIndex, lastIndex, resultToShow });

  useEffect(() => {
    // debugger;
    console.log({ resultToShow, isReadyToRender, firstIndex, lastIndex });
    console.log(
      resultToShow.slice(firstIndex, lastIndex),
      firstIndex,
      lastIndex
    );
    resultToShow &&
      isReadyToRender &&
      handleResult(
        resultToRender.concat(resultToShow.slice(firstIndex, lastIndex))
      );

    // console.log(lastIndex < resultToShow.length - 1);
    resultToShow && handleBtn(lastIndex < resultToShow.length - 1);
  }, [lastIndex, isReadyToRender]);

  // useEffect(() => {
  //   resultToShow && handleBtn(lastIndex < resultToShow.length - 1);
  // }, [lastIndex, isReadyToRender]);

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
