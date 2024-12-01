const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoute'));
router.use('/board', require('./boardRoute'));

module.exports = router;