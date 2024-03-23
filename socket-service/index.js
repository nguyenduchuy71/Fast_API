require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").Server(app);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡ Someone just connected!`);

  socket.on("addFriend", (data) => {
    console.log(">>> addFriend:", data);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥 A user disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
