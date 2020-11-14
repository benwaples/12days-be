const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('Auth Routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a user via POST', async() => {
    const user = {
      username: 'benwa',
      password: '1234',
      avatarUrl: 'hi@url.com',
      userRole: 'Director of Elf Technologies',
    };

    return request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), username: 'benwa', avatarUrl: 'hi@url.com', userRole: 'Director of Elf Technologies' }));
  });
});
