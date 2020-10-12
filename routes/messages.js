var express = require('express');
var router = express.Router();
const {messages} = require('../app/controllers')

/* GET users listing. */
router.post('/', messages.incoming);

module.exports = router;
