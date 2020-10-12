const express = require('express');
const router = express.Router();

const {welcome} = require('../app/controllers')

/* GET home page. */
router.get('/', welcome.hello);

module.exports = router;
