import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { keyWordMaxLength } from '../../utils/constants';

function SearchForm({ onSearch, isShortLength, handleIsShortLength }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    setSearchQuery(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchQuery.length === 0) {
      setSearchError('Нужно ввести ключевое слово');
    } else if (searchQuery.length > keyWordMaxLength) {
      setSearchError(
        'Самое длинное словарное слово в русском языке состоит из 35 букв'
      );
    } else {
      onSearch(searchQuery);
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__container'>
        <label className='search-form__label'>
          <input
            className='search-form__input'
            placeholder='Фильм'
            type='text'
            id='search-form'
            name='search'
            minLength='2'
            maxLength='36'
            required
            autoComplete='off'
            onChange={handleChange}
          />
        </label>
        <button
          type='submit'
          className='search-form__submit-button'
          onSubmit={handleSubmit}
        />
      </div>
      <FilterCheckbox
        handleIsShortLength={handleIsShortLength}
        isShortLength={isShortLength}
      />
    </form>
  );
}

export default SearchForm;
