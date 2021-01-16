import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils';

const list = (email) => {
  const data = db.getCollection('transfers').find({
    $or: [{ origin_email: email }, { target_email: email }],
  });

  return !data
    ? []
    : data.map((r) => ({
        id: r.id,
        origin_email: r.origin_email,
        target_email: r.target_email,
        amount: r.amount,
        created_at: r.created_at,
      }));
};

const transfers = (originEmail, targetEmail, amount) => {
  const data = db.getCollection('transfers').insert({
    id: uuidv4(),
    origin_email: originEmail,
    target_email: targetEmail,
    amount,
    created_at: Date.now(),
  });

  db.saveDatabase();

  return {
    id: data.id,
    origin_email: data.origin_email,
    target_email: data.target_email,
    amount: data.amount,
    created_at: data.created_at,
  };
};

export default { list, transfers };
