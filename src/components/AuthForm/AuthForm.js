import React, { useState, useContext, useMemo } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './AuthForm.css';
import useValidation from '../../hooks/useValidation';

function AuthForm(props) {
  const {
    title,
    submitButtonTitle,
    formPurpose,
    errorMsg,
    onAuth,
    resetStates,
  } = props;

  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [isDisplayError, setIsDisplayError] = useState({
    email: false,
    name: false,
    password: false,
  });

  const {
    isSubmitBtnActive,
    errorElements,
    handleDisplayErrorMsg,
  } = useValidation({
    values,
    isDisplayError,
    setIsDisplayError,
  });

  useMemo(() => {
    if (currentUser._id) {
      setValues({ email: currentUser.email, name: currentUser.name });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetStates();
    const { email, password, name } = values;
    onAuth(email, password, name);
  };

  return (
    <form
      className={`auth-form auth-form_position auth-form_${formPurpose}`}
      onSubmit={handleSubmit}
    >
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
              pattern='[A-Za-z]+'
              value={values.name}
              onChange={handleChange}
              onFocus={handleDisplayErrorMsg}
            />
            <span
              className={`auth-form__legend auth-form__legend_${formPurpose}`}
            >
              Имя
            </span>
            <span className='auth-form__tips'>
              {isDisplayError.name &&
                errorElements.name &&
                (errorElements.name === 'Please match the requested format.'
                  ? 'В имени допустимы только латинские буквы'
                  : errorElements.name)}
            </span>
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
            value={values.email}
            onChange={handleChange}
            onFocus={handleDisplayErrorMsg}
          />
          <span
            className={`auth-form__legend auth-form__legend_${formPurpose}`}
          >
            {formPurpose === 'profile' ? 'Почта' : 'E-mail'}
          </span>
          <span className='auth-form__tips'>
            {isDisplayError.email && errorElements.email && errorElements.email}
          </span>
        </label>
        {formPurpose !== 'profile' && (
          <label className={`auth-form__field-input`}>
            <input
              className='auth-form__input auth-form__input_style_red'
              type='password'
              id='third-field-person'
              name='password'
              minLength='8'
              maxLength='20'
              required
              autoComplete='off'
              value={values.password}
              onChange={handleChange}
              onFocus={handleDisplayErrorMsg}
            />
            <span className='auth-form__legend'>Пароль</span>
            <span className='auth-form__tips'>
              {isDisplayError.password &&
                errorElements.password &&
                errorElements.password}
            </span>
          </label>
        )}
      </fieldset>
      <p className='auth-form__error-message'>{errorMsg}</p>
      <button
        type='submit'
        className={
          isSubmitBtnActive
            ? `auth-form__submit-button auth-form__submit-button_${formPurpose}`
            : `auth-form__submit-button auth-form__submit-button_${formPurpose} auth-form__submit-button_active`
        }
        disabled={!isSubmitBtnActive}
        onSubmit={handleSubmit}
      >
        {submitButtonTitle}
      </button>
    </form>
  );
}

export default AuthForm;
