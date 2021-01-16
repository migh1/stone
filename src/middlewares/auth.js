import httpStatus from 'http-status-codes';
import { jwt } from '../utils';

const isValidExpiration = (tokenUnix) => {
  const today = new Date();
  const todayUnix = parseInt(today.getTime() / 1000, 10);

  return todayUnix < tokenUnix;
};

export default (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(httpStatus.UNAUTHORIZED).send('No token provided');

  try {
    const decoded = jwt.validate(token);

    if (!isValidExpiration(decoded.exp)) {
      res.status(httpStatus.UNAUTHORIZED).send('Expired token');
    }

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(httpStatus.UNAUTHORIZED).send('Invalid token');
  }
};
