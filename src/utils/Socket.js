const socketIo = require("socket.io");
// const crypto = require("crypto");
// const getSecretRoomId = () => {
//   // crypto.createHash('sha256').update()
// };
const initializingSocket = ({ server }) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  // io.on("connection", (socket) => {
  //   // event handlere
  //   socket.on("joinChat", ({ firstName, userId, targetUserId, text }) => {
  //     const room = [firstName, userId, targetUserId, text].sort().join("_");

  //     socket.join(room);
  //   });
  //   socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
  //     const roomId = [firstName, userId, targetUserId, text].sort().join("_");
  //     io.to(roomId).emit("messageReceivd", { firstName, text });
  //   });
  //   socket.on("disconnect", () => {});
  // });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId }) => {
      // Create a unique room for both users
      const room = [userId, targetUserId].sort().join("_");
      socket.join(room);
    });

    socket.on("sendMessage", ({ userId, targetUserId, firstName, text }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      io.to(roomId).emit("messageReceivd", { firstName, text });
    });

    socket.on("disconnect", () => {});
  });
  // io.on("connection", (socket) => {
  //   socket.on("joinChat", ({ userId }) => {
  //     socket.join(userId); // Join room with userId
  //   });

  //   socket.on("sendMessage", ({ targetUserId, firstName, text }) => {
  //     io.to(targetUserId).emit("messageReceivd", { firstName, text });
  //   });
  // });
};

module.exports = initializingSocket;
