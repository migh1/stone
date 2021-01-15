import Loki from 'lokijs';

const db = new Loki('src/database/db.json', {
  autoload: true,
  autoupdate: true,
  autosave: true,
  autosaveInterval: 5000,
});

db.addCollection('accounts').insert({
  name: 'teste',
  email: 'teste@sss.com',
  password: 'ji32hj3uh43843',
  amount: 1000,
  created_at: 1111111,
});
db.addCollection('signin');
db.addCollection('transfers');
db.addCollection('withdraw');

db.saveDatabase();
