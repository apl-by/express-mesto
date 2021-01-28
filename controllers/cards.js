const Card = require('../models/card');
const { handleValidationError, handleSearchError } = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.send(card))
    .catch((err) => handleValidationError(err, res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId).orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => handleSearchError(err, res, { message: 'Карточка не найдена в базе данных' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => handleSearchError(err, res, { message: 'Карточка не найдена в базе данных' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => handleSearchError(err, res, { message: 'Карточка не найдена в базе данных' }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
