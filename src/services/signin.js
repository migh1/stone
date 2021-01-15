import httpStatus from 'http-status-codes';
import { jwt } from '../utils';
// import { signinRepository } from '../repositories';

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
