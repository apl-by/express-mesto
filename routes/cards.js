const router = require('express').Router();
const controller = require('../controllers/cards');

router.get('/', controller.getCards);

module.exports = router;
