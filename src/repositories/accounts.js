import { db } from '../utils';

const find = (email) => {
  const data = db.getCollection('accounts').findObject({ email });

  return data;
};

const create = (accountObject) => {
  const data = db.getCollection('accounts').insert(accountObject);
  db.saveDatabase();

  return data;
};

const getIdByEmail = (email) => {
  const data = db.getCollection('accounts').findObject({ email });

  return data;
};

export default { find, create, getIdByEmail };
