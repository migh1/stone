import httpStatus from 'http-status-codes';
import { transfersRepository } from '../repositories';

export default {
  async list(accountId) {
    const response = transfersRepository.list(accountId);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
  async transfers(body) {
    // TODO

    const response = transfersRepository.transfers(body);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
};
