const express = require('express');

const { authMiddleware } = require('../../middlewares/auth');
const postLike = require('../../controllers/like/postLike');
const getLike = require('../../controllers/like/getLike');

const router = express.Router();

router.post('/', authMiddleware, postLike);
router.get('/:boardId', authMiddleware, getLike);
module.exports = router;
