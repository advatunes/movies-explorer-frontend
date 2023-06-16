import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../utils/cards';

function MoviesCardList({ isSavedMovies }) {
  return (
    <section className='cardlist'>
      <div className='cardlist__wrap'>
        {cards.map((card) => (
          <MoviesCard
            key={card.link}
            card={card}
            link={card.link}
            title={card.title}
            duration={card.duration}
            isSavedMovies={isSavedMovies}
          />
        ))}
      </div>
      <button className='cardlist__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
