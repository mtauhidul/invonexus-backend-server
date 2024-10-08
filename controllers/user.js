const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = express.Router({ mergeParams: true });

const registerUser = async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  response.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user.userID,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

  response.status(200).json({ token, username: user.username });
};

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;
