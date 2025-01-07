const express = require('express');

const { authMiddleware } = require('../../middlewares/auth');
const postLike = require('../../controllers/like/postLike');
const getLike = require('../../controllers/like/getLike');
const deleteLike = require('../../controllers/like/deleteLike');
const morganLikeAPILogger = require('../../utils/morganLogger/morganLikeAPILogger');

const router = express.Router();

router.use(morganLikeAPILogger);
router.post('/', authMiddleware, postLike);
router.get('/:boardId', authMiddleware, getLike);
router.delete('/:boardId', authMiddleware, deleteLike);

module.exports = router;
