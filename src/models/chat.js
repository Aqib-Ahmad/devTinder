const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  ],
  messages: [
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
      },
      text: { type: String, required: true },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = { Chat };
