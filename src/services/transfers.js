import httpStatus from 'http-status-codes';
import { accountsRepository, transfersRepository } from '../repositories';

export default {
  async list(email) {
    const response = transfersRepository.list(email);

    return {
      status: httpStatus.OK,
      body: response,
    };
  },
  async transfers(originAccount, targetAccount, amount) {
    const isSuitableForTransfer = originAccount.amount >= amount;

    if (isSuitableForTransfer) {
      accountsRepository.updateAccountsAmount(originAccount.email, targetAccount.email, amount);

      const createTransfer = transfersRepository.transfers(originAccount.email, targetAccount.email, amount);

      return {
        status: httpStatus.OK,
        body: createTransfer,
      };
    }

    return {
      status: httpStatus.PRECONDITION_FAILED,
      body: 'Insufficient amount to proceed',
    };
  },
};
