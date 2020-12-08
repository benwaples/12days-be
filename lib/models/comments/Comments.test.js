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

    const expectedReturn = Comment.insert(comment);

    const result = pool.query('SELECT * FROM comments WHERE id=$1', [expect.id]);

    expect(expectedReturn).toEqual(result);
  });
});
