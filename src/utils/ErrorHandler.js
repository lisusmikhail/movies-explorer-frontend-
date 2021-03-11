import { errorMessage } from './ErrorMessage';

export const handleError = (errStatus, setErrorMsg) => {
  switch (errStatus) {
    case 400:
      setErrorMsg(errorMessage.dataError);
      break;
    case 401:
      setErrorMsg(errorMessage.authError);
      break;
    case 403:
      setErrorMsg(errorMessage.forbiddenError);
      break;
    case 404:
      setErrorMsg(errorMessage.notFoundError);
      break;
    case 409:
      setErrorMsg(errorMessage.conflictError);
      break;
    case 429:
      setErrorMsg(errorMessage.tooManyRequestsError);
      break;
    case 500:
      setErrorMsg(errorMessage.serverError);
      break;
    case 503:
      setErrorMsg(errorMessage.fetchError);
      break;
    default:
      setErrorMsg(errorMessage.serverError);
  }
};
