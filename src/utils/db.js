import Loki from 'lokijs';

const db = new Loki('src/database/db.json');

db.loadDatabase();

export default db;
