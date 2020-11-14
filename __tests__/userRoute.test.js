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

  //user cant reuse a username
  it('should fail to signup a user with an already used username via POST', async() => {
    const user = {
      username: 'benwa',
      password: '1234',
      avatarUrl: 'hi@url.com',
      userRole: 'Director of Elf Technologies',
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), username: 'benwa', avatarUrl: 'hi@url.com', userRole: 'Director of Elf Technologies' }));

    return request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ message: 'duplicate key value violates unique constraint \"users_username_key\"', status: 500 }));
  });

  it('should authorize a user on login via POST', async() => {
    const user = {
      username: 'benwa',
      password: '1234',
      avatarUrl: 'hi@url.com',
      userRole: 'Director of Elf Technologies',
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), username: 'benwa', avatarUrl: 'hi@url.com', userRole: 'Director of Elf Technologies' }));

    return request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), username: 'benwa', avatarUrl: 'hi@url.com', userRole: 'Director of Elf Technologies' }));
  });

  //bad login credentials
  it('should not log in a user with bad credentials via POST', async() => {
    const user = {
      username: 'benwa',
      password: '1234',
      avatarUrl: 'hi@url.com',
      userRole: 'Director of Elf Technologies',
    };

    await request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .then(res => expect(res.body).toEqual({ id: expect.any(String), username: 'benwa', avatarUrl: 'hi@url.com', userRole: 'Director of Elf Technologies' }));

    return request(app)
      .post('/api/v1/auth/login')
      .send({ ...user, username: 'ben' })
      .then(res => expect(res.body).toEqual({ message: 'Invalid username/password', status: 500 }));
  });
});
