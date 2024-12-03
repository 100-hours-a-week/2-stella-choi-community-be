const express = require('express');

const getAllBoard = require('../../controllers/board/getAllBoard');
const postBoard = require('../../controllers/board/postBoard');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllBoard);
router.post('/', authMiddleware, postBoard);
module.exports = router;
