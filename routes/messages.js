
const { Router} = require('express');
const { getMessages, getLastMessage } = require('../controllers/messages');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:from', validateJwt, getMessages);
router.get('/last/:from', validateJwt, getLastMessage);

module.exports = router;