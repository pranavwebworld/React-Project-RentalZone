

const io = require("socket.io")(8900,{  

  cors: {
        origin:"http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {

    if(userId && socketId){

        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });

    }
 
};



const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  io.emit("getUsers", users);
};

const getUser = (userId) => {
  return users.find((user) => {
    user.userId === userId;
  });
};
 


io.on("connection", (socket) => {
  //When connected
  console.log("a user connected");

io.emit('welcome','helloooooooooooo')

  //take userId and SocketId from user
    socket.on("addUser", (userId) => {
        
    console.log({user_added:userId});

    addUser(userId, socket.id);   
      
    io.emit("getUsers", users);
  });


  //send and get msg

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {


    console.log("sendmessage called");
    const user = getUser(receiverId);

      console.log({Receiving_user:user});


    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });


  //When disconnected
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
      io.emit("getUsers", users);
  });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);})

});
