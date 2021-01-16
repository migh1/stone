import { db } from '../utils';

const list = (email) => {
  const data = db.getCollection('transfers').findObjects({
    $or: [{ origin_email: email }, { target_email: email }],
  });

  return !data ? [] : data;
};

const transfers = (originEmail, targetEmail, amount) => {
  const data = db.getCollection('transfers').insert({
    origin_email: originEmail,
    target_email: targetEmail,
    amount,
    created_at: Date.now(),
  });

  db.saveDatabase();

  return data;
};

export default { list, transfers };
