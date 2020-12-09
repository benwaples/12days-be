const pool = require('../../utils/pool');
const fs = require('fs');
const Comment = require('../comments/Comments');

describe('Comment class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a comment', async() => {
    const comment = {
      eventId: '1',
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    };

    const expectedReturn = await Comment.insert(comment);

    expect(expectedReturn).toEqual({ ...comment, id: expect.any(String) });
  });

  it('should return all comments', async() => {
    const comment1 = {
      eventId: '1',
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    };
    const comment2 = {
      eventId: '1',
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    };

    await Comment.insert(comment1);
    await Comment.insert(comment2);

    const expectedReturn = await Comment.findByEventId(1);

    expect(expectedReturn.length).toEqual(2);

  });

  it('should delete a comment by id', async() => {
    const comment1 = await Comment.insert({
      eventId: '1',
      username: 'ben',
      department: 'big pappa',
      comment: 'wow nice project'
    });
   
    const expectedReturn = await Comment.delete(comment1.id);

    expect(expectedReturn).toEqual(comment1);

  });
});
