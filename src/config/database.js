import Loki from 'lokijs';

const dbPath = process.env.NODE_ENV === 'test' ? 'src/database/db-test.json' : 'src/database/db.json';

const db = new Loki(dbPath, {
  autoload: true,
  autoupdate: true,
  autosave: true,
  autosaveInterval: 500,
});

db.addCollection('accounts');
db.addCollection('signin');
db.addCollection('transfers');
db.addCollection('withdraw');

db.saveDatabase();

export default db;
