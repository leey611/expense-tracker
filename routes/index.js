const express = require('express');
const router = express.Router();

router.use('/', require('./modules/home'));
router.use('/records', require('./modules/records'));

module.exports = router;
