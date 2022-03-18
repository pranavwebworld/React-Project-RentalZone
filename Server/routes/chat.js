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
router.post('/getconvo/:userId', verifyAccessToken, getConvo)


// @Add a msg
// @body conversationId
// @return  status
router.post('/msg', verifyAccessToken, addMsg)


// @get messages
// @param conversationId
// @return  messages
router.get('/getMsg/:conversationId', verifyAccessToken, getMsg)

module.exports = router;
