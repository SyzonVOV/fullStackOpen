const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/userSchema');

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map(user => new User(user));
  const promiseArray = userObjects.map(user => user.save());
  await Promise.all(promiseArray);
});

describe('new user', () => {
  test.only('succeeds with status code 200 if Ok', async () => {
    const newUser = {
      'blogs': [],
      'username': 'mlukai',
      'name': 'Matti Lukainen',
      'password': 'stelth'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

    const contents = usersAtEnd.map(n => n.username);
    expect(contents).toContain('mlukai');
  });

  test('error if username is less than 3 characters long', async () => {
    const newUser = {
      'blogs': [],
      'username': 'ml',
      'name': 'Matti Lukainen',
      'password': 'stelth'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('error if password is less than 3 characters long', async () => {
    const newUser = {
      'blogs': [],
      'username': 'mluukkies',
      'name': 'Matti Lukainen',
      'password': 'st'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('error if username is not unique', async () => {
    const newUser = {
      'blogs': [],
      'username': 'mluukkai',
      'name': 'Matti Luukkainen',
      'password': 'stelth1'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
