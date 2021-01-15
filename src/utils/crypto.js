import crypto from 'crypto';

const keys = {
  alg: 'aes256',
  secret: '@l&g&um@ch@v3-s3gur@jjhsjn324çsçç#',
  type: 'hex',
};

const cipher = crypto.createCipher(keys.alg, keys.secret);
const decipher = crypto.createDecipher(keys.alg, keys.secret);

const encrypt = (pass) => {
  cipher.update(pass);

  return cipher.final(keys.type);
};

const decrypt = (pass) => {
  decipher.update(pass, keys.type);

  return decipher.final('utf8');
};

export default {
  encrypt,
  decrypt,
};
