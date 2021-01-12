import httpStatus from 'http-status-codes';
import { accountsRepository } from '../repositories';

export default {
  async create(body) {
    // TODO

    const response = accountsRepository.create(body);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
};
