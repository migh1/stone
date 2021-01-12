/* eslint-disable no-console */
import httpStatus from 'http-status-codes';
import { transfersService } from '../services';

export default {
  async list(req, res) {
    try {
      const { body } = req;

      const response = await transfersService.list(body);

      res.status(response.status).send(response.body);
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
