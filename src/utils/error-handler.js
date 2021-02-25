const handleError = (errStatus, setErrorMsg) => {
  if (errStatus === 400) {
    setErrorMsg('Неправильный формат данных');
  } else if (errStatus === 403) {
    setErrorMsg('Нет прав на эту операцию');
  } else if (errStatus === 409) {
    setErrorMsg('Зритель с таким e-mail уже зарегистрирован');
  } else if (errStatus === 429) {
    setErrorMsg('Данная операция временно недоступна');
  } else if (errStatus === 401) {
    setErrorMsg('Ошибка авторизации');
  } else if (errStatus === 404) {
    setErrorMsg('Данных, за которыми вы обратились, не существует');
  } else {
    setErrorMsg('Произошла ошибка');
  }
};

export default handleError;