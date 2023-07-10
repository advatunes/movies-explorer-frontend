import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className='not-found-page'>
      <div className='not-found-page__text'>
        <h2 className='not-found-page__title'>404</h2>
        <h2 className='not-found-page__message'>Страница не найдена</h2>
      </div>
      <button className='not-found-page__button' onClick={goBack}>Назад</button>
    </div>
  );
}

export default NotFoundPage;
