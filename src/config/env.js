import dotenv from 'dotenv';

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'test' ? 5001 : process.env.PORT,
  version: '1',
  corsOptions: {
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};
