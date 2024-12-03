const express = require('express');

const getAllBoard = require('../../controllers/board/getAllBoard');
const getBoard = require('../../controllers/board/getBoard');
const postBoard = require('../../controllers/board/postBoard');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllBoard);
router.post('/', authMiddleware, postBoard);
router.get('/:boardId', authMiddleware, getBoard);
module.exports = router;
