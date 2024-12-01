const express = require('express');
const { authenticate } = require('../middlewares/auth');
const { createBoard,getBoards } = require('../controllers/boardController');
const router = express.Router();

router.post('/', authenticate, createBoard)
router.get('/all', authenticate, getBoards)
module.exports = router;