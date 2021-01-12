/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { withdrawService } from '../services';

export default {
  async withdraw(req, res) {
    try {
      const { body } = req;

      const response = await withdrawService.withdraw(body);

      res.status(response.status).send(response.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
