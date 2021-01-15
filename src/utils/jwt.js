import jwt from 'jsonwebtoken';

const keys = {
  secret: '9=uh321ojp3i21j3bn6#$#*(HN4#@N$#',
  expirationTime: 60 * 60,
};

const jwtSign = (data) =>
  jwt.sign(
    {
      data,
    },
    keys.secret,
    { expiresIn: keys.expirationTime },
  );

export default {
  sign: jwtSign,
};
