/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as routes from '../routes';
import config from './env';
import './database';

dotenv.config();

const app = express();

app.disable('x-powered-by');

app.set('port', config.port || 5000);

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*', (req, res, next) => {
  console.log(
    JSON.stringify({
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      params: req.params,
      body: req.body,
    }),
  );

  return next();
});

Object.keys(routes).forEach((key) => {
  app.use(`/api/${config.version}/${key}`, routes[key]);
});

export default app;
