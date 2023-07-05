import React, { useState, useEffect } from 'react';
import useValidation from '../../utils/useValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';

function Profile({
  handleUpdateUser,
  errorMessage,
  showNotification,
  setShowNotification,
  setLoggedIn,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, setValues, error, onChangeValue, resetValidation, formValid } = useValidation();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    setShowNotification(false);
  }

  const navigate = useNavigate();

  useEffect(() => {
    setValues(currentUser);
    resetValidation();
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUser({
      name: values.name,
      email: values.email,
    });
    setIsEditing(false);
  }

  function handleEditClick(e) {
    setIsEditing(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className='profile'>
      <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
      <div className='profile__container'>
        <form
          className='profile__form'
          name='profile'
          onSubmit={handleSubmit}
          isDisabled={!formValid}
          noValidate
        >
          <div className='profile__form-group'>
            <p className='profile__label'>Имя</p>
            <input
              className='profile__input'
              type='text'
              name='name'
              value={isEditing ? values.name : currentUser.name}
              minLength={2}
              onChange={onChangeValue}
              required
            />
          </div>

          <div className='profile__form-group'>
            <p className='profile__label'>E-mail</p>
            <input
              className='profile__input'
              type='email'
              name='email'
              value={isEditing ? values.email : currentUser.email}
              onChange={onChangeValue}
              required
            />
          </div>

          {showNotification && (
            <div className='profile__notification'>Профиль успешно сохранен</div>
          )}

          <div className='profile__buttons'>
            <span className='input__error input__error-visible profile__error'>
              {' '}
              {errorMessage}
            </span>
            {!isEditing ? (
              <>
                <button
                  className='profile__button profile__button-edit'
                  type='button'
                  aria-label='Редактировать'
                  onClick={handleEditClick}
                >
                  Редактировать
                </button>
                <button
                  className='profile__button profile__button-logout'
                  type='button'
                  aria-label='Выйти из аккаунта'
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <button
                type='submit'
                aria-label='Сохранить'
                className={`profile__button button-orange ${
                  !formValid ||
                  (currentUser.email === values.email && currentUser.name === values.name)
                    ? 'profile__button_disabled'
                    : ''
                }`}
                onClick={setIsEditing}
                disabled={
                  !formValid ||
                  (currentUser.email === values.email && currentUser.name === values.name)
                }
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
