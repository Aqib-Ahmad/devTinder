const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const chatRouter = express.Router();
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const targetUserId = req.params.targetUserId;
  const userId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate("messages.senderId");

    if (!chat) {
      char = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
      return res.json(chat);
    }

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat data:", error);
    res.status(500).json({ message: "Error fetching chat data " });
  }
});
module.exports = chatRouter;
