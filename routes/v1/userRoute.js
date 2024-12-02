const express = require('express');

const postUser = require('../../controllers/user/postUser');
const loginUser = require('../../controllers/user/loginUser');
const getUser = require('../../controllers/user/getUser');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.post('/', postUser);
router.get('/', authMiddleware, getUser);
router.post('/login', loginUser);
// router.patch('/',patchUser);
// router.patch('/', deleteUser);
// router.post('/login',loginUser);
// router.patch('/password',changePassword);

module.exports = router;
