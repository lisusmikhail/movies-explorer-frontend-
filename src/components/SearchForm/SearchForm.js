import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

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
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
