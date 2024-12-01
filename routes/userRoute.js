const express = require('express');

const {authenticate, authorize} = require('../middlewares/auth');
const { getAllUser, createUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUser);
router.post('/join',createUser);
router.post('/login',loginUser);
router.get('/protected', authenticate, (req, res) => {
    res.json({message: '인증된 사용자입니다. '});
})
router.get('/admin', authenticate, authorize, (req, res) => {
    res.json({message: '관리자 전용 페이지입니다.'});
})

module.exports = router;