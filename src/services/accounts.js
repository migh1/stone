import httpStatus from 'http-status-codes';
import { crypto } from '../utils';
import { accountsRepository } from '../repositories';

export default {
  async find(body) {
    const { email, password } = body;

    const account = await accountsRepository.find(email);

    if (!account) {
      return {
        status: httpStatus.NOT_FOUND,
        body: `Account not found for email ${email}`,
      };
    }

    if (password !== crypto.decrypt(account.password)) {
      return {
        status: httpStatus.UNAUTHORIZED,
        body: `Invalid Password`,
      };
    }

    return {
      status: httpStatus.OK,
      body: account,
    };
  },

  async create(body) {
    const { name, email, password } = body;

    const account = await accountsRepository.find(email);

    if (account) {
      return {
        status: httpStatus.CONFLICT,
        body: 'This account already exists',
      };
    }

    const accountObject = {
      name,
      email,
      password: crypto.encrypt(password),
      amount: 1000,
    };

    const response = await accountsRepository.create(accountObject);

    return {
      status: httpStatus.CREATED,
      body: response,
    };
  },

  async findByEmail(email) {
    const account = await accountsRepository.find(email);

    if (!account) {
      return {
        status: httpStatus.NOT_FOUND,
        body: `Account for email: ${email} not found`,
      };
    }

    return {
      status: httpStatus.OK,
      body: account,
    };
  },
};
