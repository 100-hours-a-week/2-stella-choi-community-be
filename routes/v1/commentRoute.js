const express = require('express');

const postComment = require('../../controllers/comment/postComment');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, postComment);

module.exports = router;
