import jwt from 'jsonwebtoken';

const secret = '9=uh321ojp3i21j3bn6#$#*(HN4#@N$#';

const jwtSign = (email) => jwt.sign({ email }, secret, { expiresIn: '30 min' });

const jwtVerify = (token) => jwt.verify(token, secret);

export default {
  sign: jwtSign,
  validate: jwtVerify,
};
