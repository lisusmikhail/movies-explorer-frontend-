import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { isChecked, setIsChecked } = props;

  const handleInputChange = () => {
    setIsChecked(!isChecked);
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
        defaultChecked={isChecked}
      />
      <label
        htmlFor='offer'
        className={
          isChecked
            ? 'checkbox__label'
            : 'checkbox__label checkbox__label_active'
        }
      >
        <div
          className={
            isChecked
              ? 'checkbox__label-switch'
              : 'checkbox__label-switch checkbox__label-switch_active'
          }
        />
      </label>
    </div>
  );
}

export default FilterCheckbox;
