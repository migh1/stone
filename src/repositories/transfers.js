import { db } from '../utils';

const list = (accountId) => {
  const data = db.getCollection('transfers').findObjects({ account_id: accountId });

  return !data ? [] : data;
};

const transfers = (originEmail, targetEmail, amount) => {
  const data = db.getCollection('transfers').insert({
    origin_email: originEmail,
    target_email: targetEmail,
    amount,
    created_at: Date.now(),
  });

  return data;
};

export default { list, transfers };
