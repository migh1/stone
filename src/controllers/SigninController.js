/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { accountsService, signinService } from '../services';

export default {
  async authenticate(req, res) {
    try {
      const { body } = req;

      const account = await accountsService.find(body);

      const response = await signinService.sign(account);

      res.status(response.status).send(response.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
