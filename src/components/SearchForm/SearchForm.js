import React from 'react';
import './SearchForm.css';

// Данный JS код сделан в целях демонстрации верстки.
let isChecked = false;
const handleInputChange = (e) => {
  const labelElement = document.querySelector('.search-form__toggle-label');
  const labelSwitchElement = document.querySelector(
    '.search-form__toggle-label-switch'
  );
  if (!isChecked) {
    labelElement.classList.add('search-form__toggle-label_active');
    labelSwitchElement.classList.add('search-form__toggle-label-switch_active');
    isChecked = true;
  } else {
    labelElement.classList.remove('search-form__toggle-label_active');
    labelSwitchElement.classList.remove(
      'search-form__toggle-label-switch_active'
    );
    isChecked = false;
  }
};

function SearchForm() {
  return (
    <form className='search-form'>
      <div className='search-form__container'>
        <label className='search-form__label'>
          <input
            className='search-form__input'
            placeholder='Фильм'
            type='text'
            id='search-form'
            name='search'
            minLength='2'
            maxLength='140'
            required
            autoComplete='off'
          />
        </label>
        <button type='submit' className='search-form__submit-button' />
      </div>
      <div className='search-form__toggle'>
        <p className='search-form__toggle-title'>Короткометражки</p>
        <input
          onChange={handleInputChange}
          // checked={isChecked}
          id='offer'
          name='offer'
          className='search-form__toggle-input'
          type='checkbox'
        />
        <label htmlFor='offer' className='search-form__toggle-label'>
          <div className='search-form__toggle-label-switch' />
        </label>
      </div>
    </form>
  );
}

export default SearchForm;
