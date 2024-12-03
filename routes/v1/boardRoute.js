const express = require('express');

const getAllBoard = require('../../controllers/board/getAllBoard');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllBoard);

module.exports = router;
