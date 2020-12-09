const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Comment = require('../lib/models/comments/Comments');

const comment = {
  eventId: '1',
  username: 'ben',
  department: 'big pappa',
  comment: 'wow nice project'
};

describe('comment route', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a comment via POST', async() => {
    return request(app)
      .post('/api/v1/comments')
      .send(comment)
      .then(res => expect(res.body).toEqual({ ...comment, id: expect.any(String) }));
  });

  // it('should return all comments via POST');
  
});
