import httpStatus from 'http-status-codes';
import { jwt } from '../utils';

export default {
  async signin(email) {
    const token = jwt.sign(email);

    return {
      status: httpStatus.OK,
      body: {
        token,
      },
    };
  },
};
