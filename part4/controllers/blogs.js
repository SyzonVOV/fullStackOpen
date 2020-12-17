const blogsRouter = require('express').Router();
const Blog = require('../models/blogSchema');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
// const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  let blog = request.body;

  let decodedToken;
  if (request.token) {
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  }

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!('user' in blog)) {
    blog = {...blog, user: user._id};
  }

  if (!('likes' in blog)) {
    blog =  new Blog({...blog, likes: 0});
  } else blog =  new Blog(blog);

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDel = await Blog.findById(request.params.id);

  if (blogToDel.user.toString() !== decodedToken.id) {
    let err = new Error('only for user who created');
    err.name = 'NotAuthorized';
    throw err;
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes });

  if (!updatedBlog) {
    response.status(204).end();
  }
  response.json(updatedBlog);
});

module.exports = blogsRouter;
