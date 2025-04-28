import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin: "https://bug-free-invention-9r4q5p4xjrrh9rrq-5173.app.github.dev"
    },
});

let onlineUser = [];


const addUser = (userId, socketId) => {
    const userExists = onlineUser.find(user => user.userId === userId);
    console.log("New user")
    if(!userExists) {
        onlineUser.push({ userId, socketId })
    }
}

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return onlineUser.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id)
    });
    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        console.log("send message to", receiverId)
        if(receiver){
            io.to(receiver.socketId).emit("getMessage", data);
        }
    })
    socket.on("disconnect", () => {
        removeUser(socket.id);
    })
});

io.listen("4000");