/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { transfersService, accountsService } from '../services';

export default {
  async list(req, res) {
    try {
      const { user } = req;

      const accountResponse = await accountsService.getIdByEmail(user.email);

      if (accountResponse.status === httpStatus.OK) {
        const response = await transfersService.list(accountResponse.body.$loki);

        return res.status(response.status).send(response.body);
      }

      return res.status(accountResponse.status).send(accountResponse.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },

  async transfers(req, res) {
    try {
      const { body } = req;

      const response = await transfersService.transfers(body);

      res.status(response.status).send(response.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
