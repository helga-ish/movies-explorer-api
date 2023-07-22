const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create(
        {
          email: req.body.email,
          password: hash,
          name: req.body.name,
        },
      )
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
        }))
        .catch(next);
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const updateFunction = (req, res, next, updateData) => {
  const currentUser = req.user._id;
  User.findByIdAndUpdate(
    currentUser,
    updateData,
    {
      new: true,
      unValidators: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  updateFunction(req, res, next, { email, name });
};

module.exports = {
  login,
  getMe,
  updateProfile,
  createUser,
};
