const pool = require('../../utils/pool');
const fs = require('fs');
const Comment = require('../comments/Comments');

describe('Comment class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a comment', async() => {
    const comment = {
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    };

    const expectedReturn = await Comment.insert(comment);
    console.log(expectedReturn);

    const { rows } = await pool.query('SELECT * FROM comments WHERE id=$1', [expectedReturn.id]);

    expect(expectedReturn).toEqual(rows[0]);
  });

  it('should return all comments', async() => {
    const comment1 = {
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    };
    const comment2 = {
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    };

    await Comment.insert(comment1);
    await Comment.insert(comment2);

    const expectedReturn = await Comment.find();

    expect(expectedReturn.length).toEqual(2);

  });
});
