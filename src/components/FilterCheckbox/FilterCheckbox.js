import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { isChecked, setIsChecked } = props;

  // Данный JS код используется для демонстрации верстки
  // и не будет присутствовать в окончательном варианте проекта
  // let isChecked = false;
  const handleInputChange = (e) => {
    console.log(e.target.checked);
    const labelElement = document.querySelector('.checkbox__label');
    const labelSwitchElement = document.querySelector(
      '.checkbox__label-switch'
    );
    if (!isChecked) {
      labelElement.classList.add('checkbox__label_active');
      labelSwitchElement.classList.add('checkbox__label-switch_active');
      setIsChecked(true);
    } else {
      labelElement.classList.remove('checkbox__label_active');
      labelSwitchElement.classList.remove('checkbox__label-switch_active');
      setIsChecked(false);
    }
  };

  return (
    <div className='checkbox'>
      <p className='checkbox__title'>Короткометражки</p>
      <input
        onChange={handleInputChange}
        id='offer'
        name='offer'
        className='checkbox__input'
        type='checkbox'
      />
      <label htmlFor='offer' className='checkbox__label'>
        <div className='checkbox__label-switch' />
      </label>
    </div>
  );
}

export default FilterCheckbox;
