const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/userSchema');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0, likes: 0 });
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  if (body.password === undefined ) {
    response.status(400).json({ error: 'password is required' });
  }

  if (body.password.length <4) {
    return response.status(400).json({ error: 'password should be more than 3 symbols' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
