const express = require('express');

const getAllBoard = require('../../controllers/board/getAllBoard');
const getBoard = require('../../controllers/board/getBoard');
const postBoard = require('../../controllers/board/postBoard');
const putBoard = require('../../controllers/board/putBoard');
const deleteBoard = require('../../controllers/board/deleteBoard');
const postViewCount = require('../../controllers/board/postViewCount');
const { authMiddleware } = require('../../middlewares/auth');
const upload = require('../../middlewares/multer');
const morganBoardAPILogger = require('../../utils/morganLogger/morganBoardAPILogger');

const router = express.Router();

router.use(morganBoardAPILogger);
router.get('/', authMiddleware, getAllBoard);
router.post('/', authMiddleware, upload.single('post_image'), postBoard);
router.get('/:boardId', authMiddleware, getBoard);
router.put('/:boardId', authMiddleware, upload.single('post_image'), putBoard);
router.delete('/:boardId', authMiddleware, deleteBoard);
router.post('/:boardId/view', authMiddleware, postViewCount);
module.exports = router;
