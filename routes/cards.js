const router = require('express').Router();
const controller = require('../controllers/cards');

router.get('/', controller.getCards);
router.post('/', controller.createCard);
router.delete('/:cardId', controller.deleteCard);

module.exports = router;
