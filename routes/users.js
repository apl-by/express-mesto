const router = require('express').Router();
const controller = require('../controllers/users');

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.post('/', controller.postUser);

module.exports = router;
