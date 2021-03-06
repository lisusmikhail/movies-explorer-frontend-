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
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isClearBtn, setIsClearBtn] = useState(false);
  const [inputValue, setInputValue] = useState('');

  console.log(keyWord);

  function handleChange(e) {
    const { value } = e.target;
    setInputValue(value);
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
      setIsClearBtn(true);
      onSearch(searchQuery);
    }
  }

  useEffect(() => {
    keyWord && setInputValue(keyWord);
    keyWord && setIsClearBtn(true);
    console.log('readInputValue', keyWord);
  }, [keyWord]);

  useEffect(() => {
    keyWord === undefined && setIsClearBtn(false);
    console.log('!!!!!!!!!!!!!!!!!!', keyWord);
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
            maxLength='36'
            required
            autoComplete='off'
            value={inputValue}
            onChange={handleChange}
          />
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
