import { db } from '../utils';

const find = (email) => {
  const data = db.getCollection('accounts').findObject({ email });

  return data;
};

const create = (accountObject) => {
  const data = db.getCollection('accounts').insert({ ...accountObject, created_at: Date.now() });
  db.saveDatabase();

  return data;
};

export default { find, create };
