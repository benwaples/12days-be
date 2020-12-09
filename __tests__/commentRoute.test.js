const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Comment = require('../lib/models/comments/Comments');

const testComment = {
  eventId: '1',
  username: 'ben',
  department: 'big pappa',
  comment: 'wow nice project'
};
const testComment2 = {
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
      .send(testComment)
      .then(res => expect(res.body).toEqual({ ...testComment, id: expect.any(String) }));
  });

  it('should return all comments for an event via GET', async() => {
    const comment1 = await Comment.insert(testComment);
    await Comment.insert(testComment2);

    return request(app)
      .get(`/api/v1/comments/${comment1.eventId}`)
      .then(res => expect(res.body.length).toEqual(2));
  });

  it('should delete a comment given an id via DELETE', async() => {
    const comment1 = await Comment.insert(testComment);

    return request(app)
      .delete(`/api/v1/comments/${comment1.eventId}`)
      .then(res => expect(res.body).toEqual(comment1));
  });
  
});
