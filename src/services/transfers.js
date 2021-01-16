import httpStatus from 'http-status-codes';
import { transfersRepository } from '../repositories';

export default {
  async list(email) {
    const response = transfersRepository.list(email);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
  async transfers(originEmail, targetEmail, amount) {
    const createTransfer = transfersRepository.transfers(originEmail, targetEmail, amount);

    return {
      status: httpStatus.OK,
      body: createTransfer,
    };
  },
};
