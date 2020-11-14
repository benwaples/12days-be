const pool = require('../utils/pool');

module.exports = class Event {
  id; 
  name;
  description;
  image;
  date;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.description = row.description;
    this.image = row.image;
    this.date = row.date;
  }

  static async insert(event) {
    const { rows } = await pool.query(
      'INSERT INTO events (name, description, image, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [event.name, event.description, event.image, event.date]
    );

    if(!rows[0]) return null;
    return new Event(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM events WHERE id=$1', [id]
    );

    if(!rows[0]) return null;
    return new Event(rows[0]);
  }
};
