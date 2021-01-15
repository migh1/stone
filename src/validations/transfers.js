import * as yup from 'yup';
import { ERRORS } from '../utils';

const transfers = yup.object().shape({
  body: yup
    .object()
    .shape({
      target_email: yup.string().email().required(ERRORS.isMissing('target_email')),
      amount: yup.number().required(ERRORS.isMissing('amount')),
    })
    .required(ERRORS.isMissing('body')),
});

export default { transfers };
