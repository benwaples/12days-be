const fs = require('fs');
const pool = require('./lib/utils/pool');

function seedDB() {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
}

seedDB();
