const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // refrence to user collection OR link 2 collections
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "UserModel",
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

// compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// sending connection request to yourself
connectionRequestSchema.pre("save", function (next) {
  const connectionrequest = this;
  if (connectionrequest.fromUserId.equals(connectionrequest.toUserId)) {
    throw new Error(" can not snd request to yourself");
  }
  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequest;
