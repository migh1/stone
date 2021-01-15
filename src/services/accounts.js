import httpStatus from 'http-status-codes';
import { accountsRepository } from '../repositories';

export default {
  async create(body) {
    const { name, email, password } = body;

    const exists = accountsRepository.findIfNotExists(email);

    if (exists) {
      return {
        status: httpStatus.CONFLICT,
        body: 'This account already exists',
      };
    }

    const accountObject = {
      name,
      email,
      password,
      ammount: 1000,
    };

    const response = accountsRepository.create(accountObject);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
};
