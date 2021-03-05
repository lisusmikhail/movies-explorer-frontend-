import { useState, useEffect } from 'react';
import { initialNumberItems, showMoreIncrement } from '../utils/constants';

function useShowMore(props) {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(initialNumberItems);

  const isReadyToRender = props.isReadyToRender;
  const resultToShow = props.resultToShow;
  const handleResult = props.handleResult;
  const resultToRender = props.resultToRender;
  const handleBtn = props.handleBtn;
  const newRender = props.newRender;

  useEffect(() => {
    resultToShow &&
      isReadyToRender &&
      handleResult(
        resultToRender.concat(resultToShow.slice(firstIndex, lastIndex))
      );

    resultToShow && handleBtn(lastIndex < resultToShow.length);
  }, [lastIndex, isReadyToRender, newRender]);

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
