import { db } from '../utils';

const findIfNotExists = (email) => {
  const data = db.getCollection('accounts').find({ email });

  return data.length;
};

const create = (accountObject) => {
  const data = db.getCollection('accounts').insert(accountObject);
  db.saveDatabase();

  return data;
};

export default { findIfNotExists, create };
