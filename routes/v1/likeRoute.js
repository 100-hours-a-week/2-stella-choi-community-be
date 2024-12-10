const express = require('express');

const { authMiddleware } = require('../../middlewares/auth');
const postLike = require('../../controllers/like/postLike');

const router = express.Router();

router.post('/', authMiddleware, postLike);

module.exports = router;
