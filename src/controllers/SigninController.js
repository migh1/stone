/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { accountsService, signinService } from '../services';

export default {
  async signin(req, res) {
    try {
      const { body } = req;

      const accountResponse = await accountsService.find(body);

      if (accountResponse.status === httpStatus.OK) {
        const response = await signinService.signin(accountResponse);

        return res.status(response.status).send(response.body);
      }

      return res.status(accountResponse.status).send(accountResponse.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
