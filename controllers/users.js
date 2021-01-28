const User = require('../models/user');
const { handleValidationError, handleSearchError } = require('../utils/utils');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id).orFail()
    .then((user) => res.send(user))
    .catch((err) => handleSearchError(err, res, { message: 'Нет пользователя с таким id' }));
};

const createUser = (req, res) => {
  const { body } = req;
  User.create(body)
    .then((user) => res.send(user))
    .catch((err) => handleValidationError(err, res));
};

const updateUser = (req, res) => {
  const ownerId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(ownerId, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => handleValidationError(err, res));
};

const updateUserAvatar = (req, res) => {
  const ownerId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(ownerId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => handleValidationError(err, res));
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateUserAvatar,
};
