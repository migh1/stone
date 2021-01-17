import db from '../config/database';

const find = (email) => {
  const data = db.getCollection('accounts').findObject({ email });

  return data;
};

const create = (accountObject) => {
  const data = db.getCollection('accounts').insert({ ...accountObject, created_at: Date.now() });
  db.saveDatabase();

  return data;
};

const updateAccountsAmount = (originEmail, targetEmail, amount) => {
  const filterFun = (record) => [originEmail, targetEmail].includes(record.email);
  const updateFun = (obj) => {
    if (obj.email === originEmail) {
      return { ...obj, amount: obj.amount - amount };
    }
    if (obj.email === targetEmail) {
      return { ...obj, amount: obj.amount + amount };
    }
  };

  const data = db.getCollection('accounts').updateWhere(filterFun, updateFun);

  db.saveDatabase();

  return data;
};

export default { find, create, updateAccountsAmount };
