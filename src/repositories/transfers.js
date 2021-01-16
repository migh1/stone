import { db } from '../utils';

const list = (accountId) => {
  const data = db.getCollection('transfers').findObjects({ account_id: accountId });

  return !data ? [] : data;
};

const transfers = (body) => {
  // TODO
};

export default { list, transfers };
