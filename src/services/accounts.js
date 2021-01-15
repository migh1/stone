import httpStatus from 'http-status-codes';
import { accountsRepository } from '../repositories';

export default {
  async create(body) {
    const { name, email, password } = body;

    const accountObject = {
      name,
      email,
      password,
    };

    const response = accountsRepository.create(accountObject);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
};
