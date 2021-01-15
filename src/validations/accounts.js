import * as yup from 'yup';
import { ERRORS } from '../utils';

const create = yup.object().shape({
  body: yup
    .object()
    .shape({
      name: yup.string().min(8).required(ERRORS.isMissing('name')),
      email: yup.string().email().required(ERRORS.isMissing('email')),
      password: yup.string().required(ERRORS.isMissing('password')),
    })
    .required(ERRORS.isMissing('body')),
});

export default { create };
