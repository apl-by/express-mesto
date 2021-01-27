// const fsPromise = require('fs').promises;
// const path = require('path');
const Card = require('../models/card');
const { handleError } = require('../utils/utils');

const getCards = (req, res) => {
  // const filePath = path.join(__dirname, '..', 'data', 'cards.json');
  // fsPromise.readFile(filePath, { encoding: 'utf8' })
  //   .then((data) => res.send(JSON.parse(data)))
  //   .catch((err) => res.status(500).send({ message: err.message }));
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send(card))
    .catch((err) => handleError(err, res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports = {
  getCards, createCard, deleteCard,
};
