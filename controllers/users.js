// const path = require('path');
// const fsPromise = require('fs').promises;
const User = require('../models/user');
const { handleError } = require('../utils/utils');

// const filePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  // fsPromise.readFile(filePath, { encoding: 'utf8' })
  //   .then((data) => res.send(JSON.parse(data)))
  //   .catch((err) => res.status(500).send({ message: err.message }));
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  // fsPromise.readFile(filePath, { encoding: 'utf8' })
  //   .then((data) => {
  //     const user = JSON.parse(data).find((item) => item._id === id);
  //     if (!user) {
  //       return res.status(404).send({ message: 'Нет пользователя с таким id' });
  //     }
  //     return res.send(user);
  //   })
  //   .catch((err) => res.status(500).send({ message: err.message }));
  User.findById(id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const postUser = (req, res) => {
  const { body } = req;

  User.create(body)
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getUsers, getUser, postUser,
};
