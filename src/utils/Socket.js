const socketIo = require("socket.io");
const initializingSocket = ({ server }) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    // event handlere
    socket.on("joinChat", () => {});
    socket.on("sendChat", () => {});
    socket.on("disconnect", () => {});
  });
};

module.exports = initializingSocket;
