var express = require('express');
const { accessChat } = require('../controller/chatController');
var router = express.Router();



router.get('/', accessChat );

module.exports = router;
