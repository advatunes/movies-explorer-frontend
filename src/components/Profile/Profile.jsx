function Profile() {
  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, "name"</h2>
      <div className='profile__container'>
        <form className='profile__form' name='profile'>
          <div className='profile__form-group'>
            <p className='profile__label'>Имя</p>
            <input
              className='profile__input'
              type='text'
              placeholder='Ваше имя'
              pattern='.{2,}'
              title='Минимальная длина имени: 2 символа'
              required
            />
          </div>

          <div className='profile__form-group'>
            <p className='profile__label'>E-mail</p>
            <input className='profile__input' type='email' placeholder='Ваш email' required />
          </div>

          <div className='profile__buttons'>
            <button
              className='profile__button profile__button-edit'
              type='submit'
              aria-label='Редактировать'
            >
              Редактировать
            </button>
            <button
              className='profile__button profile__button-logout'
              type='button'
              aria-label='Выйти из аккаунта'
            >
              Выйти из аккаунта
            </button>
            {/* <button
              className='profile__button button-orange'
              type='button'
              aria-label='Выйти из аккаунта'
            >
              Сохранить
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;