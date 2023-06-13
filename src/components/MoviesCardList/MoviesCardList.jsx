import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className='cardlist'>
      <div className='cardlist__wrap'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </div>
      <button className='cardlist__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
