import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { isShortLength, handleIsShortLength } = props;

  function handleInputChange() {
    handleIsShortLength(!isShortLength);
  }

  return (
    <div className='checkbox'>
      <p className='checkbox__title'>Короткометражки</p>
      <input
        onChange={handleInputChange}
        id='offer'
        name='offer'
        className='checkbox__input'
        type='checkbox'
        defaultChecked={isShortLength}
      />
      <label
        htmlFor='offer'
        className={
          isShortLength
            ? 'checkbox__label'
            : 'checkbox__label checkbox__label_active'
        }
      >
        <div
          className={
            isShortLength
              ? 'checkbox__label-switch'
              : 'checkbox__label-switch checkbox__label-switch_active'
          }
        />
      </label>
    </div>
  );
}

export default FilterCheckbox;
