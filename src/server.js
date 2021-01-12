/* eslint-disable no-console */
import app from './config/express';

const port = app.get('port');

app
  .listen(port, () => console.info(`Application running on port: ${port} for ${process.env.NODE_ENV}`))
  .on('error', (err) => {
    console.log(err.code, err);
  });
