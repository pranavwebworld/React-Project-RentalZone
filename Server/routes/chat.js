var express = require('express');
const { accessChat, fetchChats, accessConvo, getConvo,addMsg,getMsg } = require('../controller/chatController');
const { verifyAccessToken } = require("../helpers/jwt_helpers");
var router = express.Router();


// @start a chat
// @body user Id
// @return chat room
router.post('/', verifyAccessToken, accessChat)


router.get('/', verifyAccessToken, fetchChats)



// @start a chat
// @body user Id
// @return new conversation
router.post('/conversation', verifyAccessToken, accessConvo)


// @get a chat
// @body user Id
// @return all conversation
router.get('/getconvo/:userId', getConvo)


// @Add a msg
// @body conversationId, msg content
// @return  status
router.post('/msg',  addMsg)


// @get messages
// @param conversationId
// @return  messages
router.get('/getMsg/:conversationId', getMsg)

module.exports = router;
