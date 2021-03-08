import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ClearSearchIcon from '../../images/clear_search.svg';
import { keyWordMaxLength } from '../../utils/constants';

function SearchForm({
  onSearch,
  isShortLength,
  handleIsShortLength,
  onClearSearch,
  keyWord,
  searchResultInfo,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isClearBtn, setIsClearBtn] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    setInputValue(value);
    setSearchQuery(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchQuery);
  }

  useEffect(() => {
    keyWord && setInputValue(keyWord);
    keyWord && setIsClearBtn(true);
  }, [keyWord]);

  useEffect(() => {
    keyWord === undefined && setIsClearBtn(false);
  }, []);

  function handleClearSearch() {
    setIsClearBtn(false);
    setInputValue('');
    onClearSearch();
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__container'>
        <label className='search-form__label'>
          <input
            className={
              isClearBtn
                ? 'search-form__input search-form__input_keyword-position'
                : 'search-form__input'
            }
            placeholder='Фильм'
            type='text'
            id='search-form'
            name='search'
            minLength='2'
            maxLength='37'
            required
            autoComplete='off'
            value={inputValue}
            onChange={handleChange}
          />
          <span className='search-form__input-error'>{searchResultInfo}</span>
        </label>
        <img
          className={
            isClearBtn
              ? 'search-form__clear'
              : 'search-form__clear search-form__clear_visibility'
          }
          src={ClearSearchIcon}
          onClick={handleClearSearch}
          alt={'ClearSearch'}
        />
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
