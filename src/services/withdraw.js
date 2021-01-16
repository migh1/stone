import httpStatus from 'http-status-codes';
import { accountsRepository } from '../repositories';

export default {
  async withdraw(account, amount) {
    const isSuitableForTransfer = account.amount >= amount;

    if (isSuitableForTransfer) {
      accountsRepository.updateAccountsAmount(account.email, null, amount);

      return {
        status: httpStatus.OK,
        body: 'Withdraw successfully',
      };
    }

    return {
      status: httpStatus.PRECONDITION_FAILED,
      body: 'Insufficient amount to proceed',
    };
  },
};
