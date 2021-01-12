/* eslint-disable no-console */
import httpStaus from 'http-status-codes';

const validate = (schema) => async (req, res, next) => {
  const requestObject = {};
  Object.entries(req)
    .filter(([key, value]) => ['query', 'params', 'body'].includes(key) && Object.keys(value).length > 0)
    .forEach(([key, value]) => {
      Object.assign(requestObject, { [key]: value });
    });

  try {
    const value = await schema.validate(requestObject, { stripUnknown: true, abortEarly: false });

    Object.assign(req, value);
    return next();
  } catch (error) {
    console.error(error.name, error.message, error.errors);
    return res.status(httpStaus.BAD_REQUEST).send(`${error.name}: ${error.message}, errors: ${error.errors}`);
  }
};

export default validate;
