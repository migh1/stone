import crypto from 'crypto';

const keys = {
  alg: 'aes256',
  secret: '@l&g&um@ch@v3-s3gur@jjhsjn324çsçç#',
  type: 'hex',
};

const encrypt = (pass) => {
  const cipher = crypto.createCipher(keys.alg, keys.secret);

  cipher.update(pass);

  return cipher.final(keys.type);
};

const decrypt = (pass) => {
  const decipher = crypto.createDecipher(keys.alg, keys.secret);

  decipher.update(pass, keys.type);

  return decipher.final('utf8');
};

export default {
  encrypt,
  decrypt,
};
