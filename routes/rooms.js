

const { Router} = require('express');
const { getUserRooms, getMyRoom } = require('../controllers/rooms');
const { createRoom } = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:roomId', validateJwt, getUserRooms);
router.get('/my/:roomId', validateJwt, getMyRoom);
router.post('/new', createRoom);

module.exports = router;