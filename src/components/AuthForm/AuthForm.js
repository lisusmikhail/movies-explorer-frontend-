import React, { useState } from 'react';
import './AuthForm.css';

function AuthForm({
  title,
  submitButtonTitle,
  formPurpose,
  onSignUp,
  errorMsg,
}) {
  const [values, setValues] = useState({ email: '', password: '', name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = values;
    console.log({ email, password, name });
    onSignUp(email, password, name);
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
              // defaultValue={'1111111111'}
              value={values.name}
              onChange={handleChange}
            />
            <span
              className={`auth-form__legend auth-form__legend_${formPurpose}`}
            >
              Имя
            </span>
            <span className='auth-form__tips'>{}</span>
          </label>
        )}
        <label className='auth-form__field-input'>
          <input
            className={`auth-form__input auth-form__input_${formPurpose} auth-form__input_${formPurpose}_mail`}
            type='text'
            id='second-auth-field'
            name='email'
            minLength='5'
            maxLength='60'
            required
            autoComplete='off'
            // defaultValue={'1111111111@jhhjjhjhj.kk'}
            value={values.email}
            onChange={handleChange}
          />
          <span
            className={`auth-form__legend auth-form__legend_${formPurpose}`}
          >
            {formPurpose === 'profile' ? 'Почта' : 'E-mail'}
          </span>
          <span className='auth-form__tips'>{}</span>
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
              // defaultValue={'1111111111'}
              value={values.password}
              onChange={handleChange}
            />
            <span className='auth-form__legend'>Пароль</span>
            <span className='auth-form__tips'>{}</span>
          </label>
        )}
      </fieldset>
      <p className='auth-form__error-message'>{errorMsg}</p>
      <button
        type='submit'
        className={`auth-form__submit-button auth-form__submit-button_${formPurpose}`}
        onSubmit={handleSubmit}
      >
        {submitButtonTitle}
      </button>
    </form>
  );
}

export default AuthForm;
