const express = require('express');

const postUser = require('../../controllers/user/postUser');
const loginUser = require('../../controllers/user/loginUser');
const getUser = require('../../controllers/user/getUser');
const patchUser = require('../../controllers/user/patchUser');
const { authMiddleware } = require('../../middlewares/auth');
const patchUserPassword = require('../../controllers/user/patchUserPassword');

const router = express.Router();

router.post('/', postUser);
router.get('/', authMiddleware, getUser);
router.patch('/', authMiddleware, patchUser);
router.post('/login', loginUser);
router.patch('/password', authMiddleware, patchUserPassword);
// router.patch('/',patchUser);
// router.patch('/', deleteUser);
// router.post('/login',loginUser);
// router.patch('/password',changePassword);

module.exports = router;
