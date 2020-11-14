const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  passwordHash;
  avatarUrl
  userRole;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.passwordHash = row.password_hash;
    this.avatarUrl = row.avatar_url;
    this.userRole = row.user_role;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (username, password_hash, avatar_url, user_role) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.username, user.passwordHash, user.avatarUrl, user.userRole]
    );

    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  static async findByUserName(username) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username=$1',
      [username]
    );
  }

  toJSON() {
    const obj = { ...this };
    delete obj.passwordHash;

    return obj;
  }
};
