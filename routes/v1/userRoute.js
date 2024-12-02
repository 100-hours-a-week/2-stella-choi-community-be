const express = require('express');

const postUser = require('../../controllers/user/postUser');
const loginUser = require('../../controllers/user/loginUser');
const getUser = require('../../controllers/user/getUser');
const patchUser = require('../../controllers/user/patchUser');
const patchUserPassword = require('../../controllers/user/patchUserPassword');
const deleteUser = require('../../controllers/user/deleteUser');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.post('/', postUser);
router.get('/', authMiddleware, getUser);
router.patch('/', authMiddleware, patchUser);
router.delete('/', authMiddleware, deleteUser);
router.post('/login', loginUser);
router.patch('/password', authMiddleware, patchUserPassword);

module.exports = router;
