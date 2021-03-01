import React, { useState } from 'react';
import './MoviesCard.css';
import heart from '../../images/icon__heart_empty.png';
import activeHeart from '../../images/icon__heart_active.png';
import delFavorite from '../../images/icon__del_favorite.svg';

function MoviesCard(props) {
  const { movie, favoriteOnly, onAddFavorite, pageName } = props;
  const { nameRU, image, duration } = movie;

  let imageURL;
  if (pageName === 'myMovies') {
    imageURL = image;
  } else {
    imageURL = image ? 'https://api.nomoreparties.co' + image.url : null;
  }

  const handleFavorite = () => {
    const movieToAdd = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: imageURL,
      trailer: movie.trailerLink,
      thumbnail:
        'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };
    onAddFavorite(movieToAdd);
  };

  const isFavorite = false;
  // Данный JS код используется для демонстрации верстки
  // и не будет присутствовать в окончательном варианте проекта
  let favoriteIcon;
  let isVisible = true;
  if (!favoriteOnly && isFavorite) {
    favoriteIcon = activeHeart;
  } else if (favoriteOnly && isFavorite) {
    favoriteIcon = delFavorite;
  } else if (favoriteOnly && !isFavorite) {
    isVisible = false;
  } else {
    favoriteIcon = heart;
  }

  return (
    <div
      className={
        isVisible
          ? 'movies-card movies-card_position'
          : 'movies-card movies-card_visibility'
      }
    >
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{nameRU}</h2>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        <img
          className='movies-card__favorite'
          src={favoriteIcon}
          alt={nameRU}
          onClick={handleFavorite}
        />
      </div>
      <a
        className='movies-card__poster-link'
        href={pageName === 'myMovies' ? movie.trailer : movie.trailerLink}
        target='_blank'
      >
        <img className='movies-card__poster' src={imageURL} alt={nameRU} />
      </a>
    </div>
  );
}

export default MoviesCard;
