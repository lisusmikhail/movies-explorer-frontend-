import React, { useState } from 'react';
import './MoviesCard.css';
import heart from '../../images/icon__heart_empty.png';
import activeHeart from '../../images/icon__heart_active.png';
import delFavorite from '../../images/icon__del_favorite.svg';

function MoviesCard(props) {
  const { movie, favoriteOnly, onAddFavorite, pageName } = props;
  const { nameRU, image, duration } = movie;

  const handleFavorite = () => {
    const movieToFavorite = {
      country: movie.country ? movie.country : 'Unknown Country',
      director: movie.director ? movie.director : 'Unknown Director',
      duration: movie.duration ? movie.duration : 0,
      year: movie.year ? movie.year : 'Unknown Year',
      description: movie.description
        ? movie.description
        : 'Unknown Description',
      image: image
        ? 'https://api.nomoreparties.co' + image.url
        : 'https://mysite.com/default-image',
      trailer: movie.trailerLink ? movie.trailerLink : 'Unknown Trailer Link',
      thumbnail:
        movie.image && movie.image.formats.thumbnail
          ? 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url
          : 'https://mysite.com/default-image',
      movieId: movie.id,
      nameRU: movie.nameRU ? movie.nameRU : 'unknownNameRU',
      nameEN: movie.nameEN ? movie.nameEN : 'unknownNameEN',
    };
    onAddFavorite(movieToFavorite);
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
        href={
          pageName === 'myMovies'
            ? movie.trailer
            : movie.trailerLink
            ? movie.trailerLink
            : 'https://images.unsplash.com/photo-1552452380-4137214f33b6'
        }
        target='_blank'
      >
        <img
          className='movies-card__poster'
          src={
            pageName === 'myMovies'
              ? image
              : image
              ? 'https://api.nomoreparties.co' + image.url
              : 'https://images.unsplash.com/photo-1552452380-4137214f33b6'
          }
          alt={nameRU}
        />
      </a>
    </div>
  );
}

export default MoviesCard;
