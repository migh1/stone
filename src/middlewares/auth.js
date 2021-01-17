import httpStatus from 'http-status-codes';
import { jwt } from '../utils';

export default (req, res, next) => {
  const authorization = req.headers['authorization'];
  const token = authorization?.split(' ').pop();

  if (!token) return res.status(httpStatus.UNAUTHORIZED).send('No token provided');

  try {
    const decoded = jwt.validate(token);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(httpStatus.UNAUTHORIZED).send('Invalid token');
  }
};
