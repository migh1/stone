/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { accountsService } from '../services';

export default {
  async create(req, res) {
    try {
      const { body } = req;

      const response = await accountsService.create(body);

      res.status(response.status).send(response.body);
    } catch (error) {
      console.error(error);
      res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};
