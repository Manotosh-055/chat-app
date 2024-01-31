const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');
const messageRouter = require('./routes/messageRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });
const DATABASE_URL = process.env.MONGO_URI;
connectDB(DATABASE_URL);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("<h1>API is running Successfully</h1>");
})

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

app.use(notFound);
app.use(errorHandler);


const server = app.listen(5000, console.log(`Server is statrted at PORT ${PORT}`));

const io = require('socket.io')(server, {
    pingTimeout: 60000,   // close the connection to reduce bandwidth
    cors: {
        origin: "https://chat-app-psi-indol.vercel.app"
    }
})

io.on("connection", (socket) => {
    console.log("connected to socket.io");
    socket.on('setup', (userData) => {
        socket.join(userData?._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("user joined " + room);
    });

    socket.on("typing", (room) => {
        socket.in(room).emit("typing");
    })
    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing");
    })

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved?.chat;
        if (!chat.users) return console.log("chat.users not defined");

        chat?.users?.forEach(user => {
            if (user?._id === newMessageRecieved?.sender?._id) return;
            socket.in(user?._id).emit("message received", newMessageRecieved);
        })
    })

    socket.off("setup", () => {
        console.log("User Disconnected");
        socket.leave(userData?._id);
    })


})