const path = require('path');
const fsPromise = require('fs').promises;

const filePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  fsPromise.readFile(filePath, { encoding: 'utf8' })
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  fsPromise.readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      const user = JSON.parse(data).find((item) => item._id === id);
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getUsers, getUser,
};
