import * as yup from 'yup';
import ERRORS from '../utils';

const withdraw = yup.object().shape({
  body: yup
    .object()
    .shape({
      amount: yup.number().required(ERRORS.isMissing('amount')),
    })
    .required(ERRORS.isMissing('body')),
});

export default { withdraw };
