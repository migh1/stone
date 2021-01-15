import Loki from 'lokijs';

const db = new Loki('src/database/db.json', {
  autoload: true,
  autoupdate: true,
  autosave: true,
  autosaveInterval: 5000,
});

db.addCollection('accounts');
db.addCollection('signin');
db.addCollection('transfers');
db.addCollection('withdraw');

db.saveDatabase();
