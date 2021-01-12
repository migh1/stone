import httpStatus from 'http-status-codes';
import { withdrawRepository } from '../repositories';

export default {
  async withdraw(body) {
    // TODO

    const response = withdrawRepository.withdraw(body);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
};
