import httpStatus from 'http-status-codes';
import { signinRepository } from '../repositories';

export default {
  async authenticate(body) {
    // TODO

    const response = signinRepository.authenticate(body);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
};
