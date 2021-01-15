import httpStatus from 'http-status-codes';
import { jwt } from '../utils';
// import { signinRepository } from '../repositories';

export default {
  async sign(account) {
    const token = jwt.sign(account);

    return {
      status: httpStatus.OK,
      body: token,
    };
  },
};
