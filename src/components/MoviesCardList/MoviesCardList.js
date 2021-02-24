import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import firstImg from '../../images/pic__COLOR_pic.png';
import secondImg from '../../images/pic__COLOR_pic_2.png';
import thirdImg from '../../images/pic__COLOR_pic_3.png';
import forthImg from '../../images/pic__COLOR_pic_4.png';
import fifthImg from '../../images/pic__COLOR_pic_5.png';
import sixthImg from '../../images/pic__COLOR_pic_6.png';
import seventhImg from '../../images/pic__COLOR_pic_7.png';

function MoviesCardList({ favoriteOnly }) {
  return (
    <section className='movies-card-list movies-card-list_position'>
      <MoviesCard
        title={'33 слова о дизайне'}
        img={firstImg}
        duration={'1ч 42м'}
        isFavorite={true}
        favoriteOnly={favoriteOnly}
      />
      <MoviesCard
        title={'Киноальманах «100 лет дизайна»'}
        img={secondImg}
        duration={'1ч 42м'}
        isFavorite={true}
        favoriteOnly={favoriteOnly}
      />
      <MoviesCard
        title={'В погоне за Бенкси'}
        img={thirdImg}
        duration={'1ч 42м'}
        isFavorite={false}
        favoriteOnly={favoriteOnly}
      />
      <MoviesCard
        title={'Баския: Взрыв реальности'}
        img={forthImg}
        duration={'1ч 42м'}
        isFavorite={false}
        favoriteOnly={favoriteOnly}
      />
      <MoviesCard
        title={'Бег это свобода'}
        img={fifthImg}
        duration={'1ч 42м'}
        isFavorite={true}
        favoriteOnly={favoriteOnly}
      />
      <MoviesCard
        title={'Книготорговцы'}
        img={sixthImg}
        duration={'1ч 42м'}
        isFavorite={false}
        favoriteOnly={favoriteOnly}
      />
      <MoviesCard
        title={'Когда я думаю о Германии ночью'}
        img={seventhImg}
        duration={'1ч 42м'}
        isFavorite={false}
        favoriteOnly={favoriteOnly}
      />
      <button type='button' className='movies-card-list__more-button'>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
