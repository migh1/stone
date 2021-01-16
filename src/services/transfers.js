import httpStatus from 'http-status-codes';
import { db } from '../utils';
import { transfersRepository } from '../repositories';

export default {
  async list(accountId) {
    const response = transfersRepository.list(accountId);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
  async transfers(originAccount, targetAccount, amount) {
    const createTransfer = transfersRepository.transfers(originAccount.email, targetAccount.email, amount);
    db.saveDatabase();

    return {
      status: httpStatus.OK,
      body: createTransfer,
    };
  },
};
