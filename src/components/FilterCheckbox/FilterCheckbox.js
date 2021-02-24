import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  // Данный JS код используется для демонстрации верстки
  // и не будет присутствовать в окончательном варианте проекта
  let isChecked = false;
  const handleInputChange = (e) => {
    const labelElement = document.querySelector('.checkbox__label');
    const labelSwitchElement = document.querySelector(
      '.checkbox__label-switch'
    );
    if (!isChecked) {
      labelElement.classList.add('checkbox__label_active');
      labelSwitchElement.classList.add('checkbox__label-switch_active');
      isChecked = true;
    } else {
      labelElement.classList.remove('checkbox__label_active');
      labelSwitchElement.classList.remove('checkbox__label-switch_active');
      isChecked = false;
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
