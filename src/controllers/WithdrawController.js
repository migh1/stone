/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { withdrawService, accountsService } from '../services';

export default {
  async withdraw(req, res) {
    try {
      const { user, body } = req;

      const account = await accountsService.findByEmail(user.email);
      if (account.status === httpStatus.OK) {
        const response = await withdrawService.withdraw(account.body, body.amount);

        return res.status(response.status).send(response.body);
      }

      res.status(account.status).send(account.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
