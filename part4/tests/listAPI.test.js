const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogSchema');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

test('a valid blog with token can be added', async () => {
  const userForToken = {
    username: 'mlukai',
    id: '5fdb4b539c836f354c86d702',
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  const newBlog = {
    title: 'React patterns 2',
    author: 'Michael Chan',
    blogs: 2,
    url: 'https://reactpatterns.com/',
    likes: 0,
    user: ['5fdb4b539c836f354c86d702']
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map(n => n.title);
  expect(title).toContain('React patterns 2');
});

test.only('a blog with no token can not be added', async () => {

  const newBlog = {
    title: 'React patterns 2',
    author: 'Michael Chan',
    blogs: 2,
    url: 'https://reactpatterns.com/',
    likes: 0,
    user: ['5fdb4b539c836f354c86d702']
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401);
});

test('if likes property is missing from the request, then it will default to the value 0', async () => {
  const newBlog = {
    title: 'React patterns 2',
    author: 'Michael Chan',
    blogs: 2,
    url: 'https://reactpatterns.com/',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog).expect(201);

  expect(response.body).toMatchObject({ likes: 0 });
});

test('400 Bad Request if title and url are missing', async () => {
  const newBlog = {
    author: 'Michael Chan',
    blogs: 2,
    likes: 12
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    );

    const contents = blogsAtEnd.map(r => r.id);

    expect(contents).not.toContain(blogToDelete.id);
  });
});

describe('updating of a blog', () => {
  test('succeeds with status code 204 if id is not in DB', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .expect(204);
  });

  test('successful with valid blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({...blogToUpdate, likes: 100})
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const contents = blogsAtEnd[0];

    expect(contents).toMatchObject({ likes: 100 });
  });

});

afterAll(() => {
  mongoose.connection.close();
});
