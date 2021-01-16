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
      const { user, body } = req;

      const originAccountResponse = await accountsService.getIdByEmail(user.email);
      if (originAccountResponse.status > 400) {
        return res.status(originAccountResponse.status).send(originAccountResponse.body);
      }

      const targetAccountResponse = await accountsService.getIdByEmail(body.target_email);
      if (targetAccountResponse.status > 400) {
        return res.status(targetAccountResponse.status).send(targetAccountResponse.body);
      }

      const response = await transfersService.transfers(
        originAccountResponse,
        targetAccountResponse,
        body.amount,
      );
      return res.status(response.status).send(response.body);
    } catch (error) {
      console.error(error);
      return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
