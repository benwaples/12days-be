const pool = require('../../utils/pool');

module.exports = class Comment {
  id;
  eventId
  username;
  department;
  comment;

  constructor(row) {
    this.id = row.id;
    this.eventId = row.event_id;
    this.username = row.username;
    this.department = row.department;
    this.comment = row.comment;
  }

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO comments (event_id, username, department, comment) VALUES($1, $2,$3, $4) RETURNING *',
      [comment.eventId, comment.username, comment.department, comment.comment]
    );
    if(!rows[0]) return null;
    return new Comment(rows[0]);
  }

  static async findByEventId(id) {
    const { rows } = await pool.query(
      'SELECT * FROM comments where event_id=$1', [id]
    );

    if(!rows[0]) return null;
    return rows.map(comment => new Comment(comment));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM comments WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    return new Comment(rows[0]);
  }
};
