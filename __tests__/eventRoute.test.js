const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Event = require('../lib/models/Event');

describe('event route', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  it('should insert an event via POST', async() => {
    const event = {
      name: 'walk',
      description: 'walk around the park',
      image: 'hi@test.com',
      date: 'YYYY-MM-DD'
    };

    return request(app)
      .post('/api/v1/events')
      .send(event)
      .then(res => expect(res.body).toEqual({ ...event, id: expect.any(String) }));
  });

  it('should return an event by id via GET', async() => {
    const event = {
      name: 'walk',
      description: 'walk around the park',
      image: 'hi@test.com',
      date: 'YYYY-MM-DD'
    };

    const insertedEvent = await Event.insert(event);

    return request(app)
      .get(`/api/v1/events/${insertedEvent.id}`)
      .then(res => expect(res.body).toEqual({ ...event, id: expect.any(String) }));
  });
});

