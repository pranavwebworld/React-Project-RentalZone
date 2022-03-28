const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (userId && socketId) {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  }
  console.log({ users });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  io.emit("getUsers", users);
};

const getUser = (receiverId) => {
  
  return users.find((user) => user.userId === receiverId);
};

io.on("connection", (socket) => {
  //When connected
  console.log("a user connected");

  io.emit("welcome", "helloooooooooooo");

  //take userId and SocketId from user
  socket.on("addUser", (userId) => {

    console.log({userId});
    console.log({ user_added: userId });

    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });

  //send and get msg


  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log({ senderId, receiverId, text });

    console.log("sendmessage called");
    const user = getUser(receiverId);

    console.log({ Receiving_user: user });

    io.to(user?.socketId).emit("VideoCall", {
      senderId,
      text,
    });
  });

  

  socket.on("CallAccepted", ({ callerId, vendorId }) => {

    console.log({ callerId,vendorId });

    console.log("CallAccepted called");

    const user = getUser(callerId);

    console.log({ VideoCall_CALLING_user: user });

    io.to(user?.socketId).emit("CallAccepted", {

      callerId
    
    });
  });





  socket.on("VideoCall", async ({ senderId, receiverId, text }) => {
    console.log({ senderId, receiverId, text });

    console.log(text,"Video call called");

    const user = await getUser(receiverId);

    console.log({ Receiving_user: user });

    io.to(user?.socketId).emit("getVideoCall", {
      senderId,
      text,
    });
  });



  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });





  //When disconnected
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);



    console.log({ users });
    io.emit("getUsers", users);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});
