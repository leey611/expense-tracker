const express = require('express');
const router = express.Router();
const { authenticator } = require('../middleware/auth');

router.use('/users', require('./modules/users'));
router.use('/records', authenticator, require('./modules/records'));
router.use('/', authenticator, require('./modules/home'));

module.exports = router;
