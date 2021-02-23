import React from 'react';
import './Chart.css';

function Chart() {
  return (
    <div className='chart'>
      <div className='chart__backend'>1 неделя</div>
      <div className='chart__frontend'>4 недели</div>
      <div className='chart__label'>Back-end</div>
      <div className='chart__label'>Front-end</div>
    </div>
  );
}

export default Chart;
