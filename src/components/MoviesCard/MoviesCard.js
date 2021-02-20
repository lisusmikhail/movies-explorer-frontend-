import React from 'react';
import { useHistory } from 'react-router-dom';
import './MoviesCard.css';
import firstImg from '../../images/pic__COLOR_pic.png';
import heart from '../../images/icon__heart_empty.png';
import activeHeart from '../../images/icon__heart_active.png';
import delFavorite from '../../images/icon__del_favorite.svg';

function MoviesCard(props) {
  const { title, img, duration, isFavorite } = props;
  const history = useHistory();
  const location = history.location.pathname;

  let favoriteIcon;
  if (location === '/movies' && isFavorite) {
    favoriteIcon = activeHeart;
  } else if (location === '/saved-movies') {
    favoriteIcon = delFavorite;
  } else {
    favoriteIcon = heart;
  }

  return (
    <div className='movies-card'>
      <div className='movies-card__info'>
        <div className='movies-card__description'>
          <h2 className='movies-card__title'>{title}</h2>
          <p className='movies-card__duration'>{duration}</p>
        </div>
        <img className='movies-card__favorite' src={favoriteIcon} alt={title} />
      </div>
      <img className='movies-card__poster' src={img} alt={title} />
    </div>
  );
}

export default MoviesCard;

// src={isFavorite ? activeHeart : heart}
