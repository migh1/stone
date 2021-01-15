import * as yup from 'yup';
import { ERRORS } from '../utils';

const authenticate = yup.object().shape({
  body: yup
    .object()
    .shape({
      name: yup.string().min(8).notRequired(),
      email: yup.string().required(ERRORS.isMissing('email')),
      password: yup.string().required(ERRORS.isMissing('password')),
    })
    .required(ERRORS.isMissing('body')),
});

export default { authenticate };
