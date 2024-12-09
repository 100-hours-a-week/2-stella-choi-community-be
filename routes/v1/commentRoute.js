const express = require('express');

const postComment = require('../../controllers/comment/postComment');
const patchComment = require('../../controllers/comment/patchComment');
const deleteComment = require('../../controllers/comment/deleteComment');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, postComment);
router.patch('/:commentId', authMiddleware, patchComment);
router.delete('/:commentId', authMiddleware, deleteComment);

module.exports = router;
