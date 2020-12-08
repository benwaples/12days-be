const pool = require('../../utils/pool');

module.exports = class Comment {
  id;
  username;
  department;
  comment;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.department = row.department;
    this.comment = row.comment;
  }

  static async insert(comment) {
    const { rows } = await pool.query(
      'INSERT INTO comments (username, department, comment) VALUES($1, $2,$3) RETURNING *',
      [comment.username, comment.department, comment.comment]
    );

    if(!rows[0]) return null;
    return new Comment(rows[0]);
  }
};
