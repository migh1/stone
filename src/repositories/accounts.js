import { db } from '../utils';

const create = (accountObject) => {
  const data = db.getCollection('accounts').insert(accountObject);
  db.saveDatabase();

  return data;
};

export default { create };
