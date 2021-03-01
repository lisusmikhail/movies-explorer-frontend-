import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { keyWordMaxLength } from '../../utils/constants';

function SearchForm({
  onSearch,
  onCheckBox,
  isShortLength,
  setIsShortLength,
  setIsFirstRender,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFirstRender(false);
    if (searchQuery.length === 0) {
      setSearchError('Нужно ввести ключевое слово');
    } else if (searchQuery.length > keyWordMaxLength) {
      setSearchError('Самое длинное словарное слово в русском языке - 35 букв');
    } else {
      onSearch(searchQuery);
    }
  };

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
        setIsChecked={setIsShortLength}
        isChecked={isShortLength}
        setIsFirstRender={setIsFirstRender}
        onCheckBox={onCheckBox}
      />
    </form>
  );
}

export default SearchForm;
