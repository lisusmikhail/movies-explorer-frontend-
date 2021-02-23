import React from 'react';
import './AuthForm.css';

function AuthForm({ title, submitButtonTitle, formPurpose }) {
  const errorMsg1 = '';
  const errorMsg2 = '';
  const errorMsg3 = 'Что-то пошло не так...';
  let nameValue = '';
  let emailValue = '';

  if (formPurpose === 'profile') {
    nameValue = 'Виталий';
    emailValue = 'pochta@yandex.ru';
  }

  return (
    <form className={`auth-form auth-form_${formPurpose}`}>
      <h2 className={`auth-form__title auth-form__title_${formPurpose}`}>
        {title}
      </h2>
      <fieldset
        className={`auth-form__fields auth-form__fields_${formPurpose}`}
      >
        {formPurpose !== 'login' && (
          <label className={`auth-form__field-input`}>
            <input
              className={`auth-form__input auth-form__input_${formPurpose}`}
              type='text'
              id='first-auth-field'
              name='name'
              minLength='2'
              maxLength='60'
              required
              autoComplete='chrome-off'
              defaultValue={nameValue}
            />
            <span
              className={`auth-form__legend auth-form__legend_${formPurpose}`}
            >
              Имя
            </span>
            <span className='auth-form__tips'>{errorMsg1}</span>
          </label>
        )}
        <label className='auth-form__field-input'>
          <input
            className={`auth-form__input auth-form__input_${formPurpose} auth-form__input_${formPurpose}_mail`}
            type='email'
            id='second-auth-field'
            name='email'
            minLength='5'
            maxLength='60'
            required
            autoComplete='off'
            defaultValue={emailValue}
          />
          <span
            className={`auth-form__legend auth-form__legend_${formPurpose}`}
          >
            {formPurpose === 'profile' ? 'Почта' : 'E-mail'}
          </span>
          <span className='auth-form__tips'>{errorMsg2}</span>
        </label>
        {formPurpose !== 'profile' && (
          <label className={`auth-form__field-input`}>
            <input
              className='auth-form__input'
              type='password'
              id='third-field-person'
              name='password'
              minLength='8'
              maxLength='20'
              required
              autoComplete='off'
            />
            <span className='auth-form__legend'>Пароль</span>
            <span className='auth-form__tips'>{errorMsg3}</span>
          </label>
        )}
      </fieldset>
      <button
        type='submit'
        className={`auth-form__submit-button auth-form__submit-button_${formPurpose}`}
      >
        {submitButtonTitle}
      </button>
    </form>
  );
}

export default AuthForm;
