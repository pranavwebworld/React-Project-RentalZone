const Chat = require("../models/chatModel");
const User = require("../models/user.model");
const Conversation = require("../models/ConversatioModel");
const Message = require("../models/MsgModel");
const asyncHandler = require("express-async-handler");
const { NotExtended } = require("http-errors");

module.exports = {
  accessChat: asyncHandler(async (req, res) => {
    // console.log(req.payload)
    console.log("here.................");
    const { userId } = req.body;
    console.log(userId);

    if (!userId) {
      console.log("userId not found");

      return res.sendStatus(400);
    }
    console.log("here.................");

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.payload.aud } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    console.log("here.................");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name propic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.payload.aud, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).send(fullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  }),

  fetchChats: asyncHandler(async (req, res) => {
    try {
      console.log("inside fetch chat");
      console.log(req.payload.aud);
      const userId = req.payload.aud;
      Chat.find({ users: { $elemMatch: { $eq: userId } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email ",
          });

          res.status(200).send(results);
        });
    } catch (err) {
      console.log(err);
      res.status(400);
      throw new Error(error.message);
    }
  }),

  accessConvo: asyncHandler(async (req, res) => {
    const { userId } = req.body;

    const currentUser = req.payload.aud;

    const newConversation = new Conversation({
      members: [userId, currentUser],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      console.log(err);
    }
  }),


  getConvo: asyncHandler(async (req, res) => {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversation);
  }),



  addMsg: asyncHandler(async (req, res) => {
    console.log("Reached here");
    console.log(req.body);
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage)

  }),



  getMsg: asyncHandler(async (req, res) => {


    console.log(req.params.conversationId);

    const message = await Message.find({

    conversationId:req.params.conversationId,

    })




      res.status(200).json(message)

  })


};
