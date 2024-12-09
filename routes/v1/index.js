const express = require('express');

const router = express.Router();

router.use('/users', require('./userRoute'));
router.use('/boards', require('./boardRoute'));
router.use('/comments', require('./commentRoute'));

module.exports = router;
