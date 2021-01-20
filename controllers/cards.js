const fsPromise = require('fs').promises;
const path = require('path');

const getCards = (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'cards.json');
  fsPromise.readFile(filePath, { encoding: 'utf8' })
    .then((data) => res.send(JSON.parse(data)))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getCards,
};
