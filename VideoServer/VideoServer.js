const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})



io.on("connection", (socket) => {

    socket.emit("me", socket.id)

    console.log(socket.id, "video socket id");



    socket.on("addUser", (userId) => {


        console.log({ userId });
        console.log({ user_added: userId });

        addUser(userId, socket.id);

        io.emit("getUsers", users);
        
    });



    const addUser = (userId, socketId) => {
        if (userId && socketId) {
            !users.some((user) => user.userId === userId) &&
                users.push({ userId, socketId });
        }
        console.log({ users });
    };




    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    })

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
})

server.listen(5001, () => console.log("server is running on port 5001"))
