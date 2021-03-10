import { useState, useEffect } from 'react';

function useValidation({ values, isDisplayError, setIsDisplayError }) {
  const [isSubmitBtnActive, setIsSubmitBtnActive] = useState(false);
  const [inputElements, setInputElements] = useState([]);
  const [errorElements, setErrorElements] = useState({});

  function handleDisplayErrorMsg(e) {
    const name = e.target.name;
    setIsDisplayError({ ...isDisplayError, [name]: true });
  }

  useEffect(() => {
    const openFormElement = document.querySelector('.auth-form');
    openFormElement &&
      setInputElements(
        Array.prototype.slice.call(
          openFormElement.getElementsByTagName('input')
        )
      );
  }, []);

  useEffect(() => {
    if (inputElements.length > 0) {
      for (let key in errorElements) {
        if (isDisplayError.hasOwnProperty(key)) {
          setErrorElements((prevState) => {
            return { ...prevState, [key]: '' };
          });
        }
      }

      for (let key in isDisplayError) {
        if (isDisplayError.hasOwnProperty(key)) {
          setIsDisplayError((prevState) => {
            return { ...prevState, [key]: false };
          });
        }
      }
    }
  }, [inputElements]);

  useEffect(() => {
    const isValid = inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
    setIsSubmitBtnActive(isValid);
  }, [values, inputElements]);

  useEffect(() => {
    inputElements.forEach((inputElement) => {
      setErrorElements((prevState) => {
        return {
          ...prevState,
          [inputElement.name]: inputElement.validationMessage,
        };
      });
    });
  }, [isSubmitBtnActive, inputElements, values]);

  return {
    isSubmitBtnActive,
    errorElements,
    setErrorElements,
    handleDisplayErrorMsg,
  };
}

export default useValidation;
