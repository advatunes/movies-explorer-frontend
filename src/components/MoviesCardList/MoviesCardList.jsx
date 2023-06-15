import MoviesCard from '../MoviesCard/MoviesCard';
import cards from '../../utils/cards';

function MoviesCardList() {
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
          />
        ))}
      </div>
      <button className='cardlist__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
