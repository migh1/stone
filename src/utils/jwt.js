import jwt from 'jsonwebtoken';

const secret = '9=uh321ojp3i21j3bn6#$#*(HN4#@N$#';

const expirationDate = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return parseInt(expirationDate.getTime() / 1000, 10);
};

const jwtSign = (email) => jwt.sign({ email }, secret, { expiresIn: expirationDate() });

const jwtVerify = (token) => jwt.verify(token, secret);

export default {
  sign: jwtSign,
  validate: jwtVerify,
};
