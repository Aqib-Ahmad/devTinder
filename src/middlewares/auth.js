const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  //  read tokens from cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Not found token");
    }
    // const decodedMessage = jwt.verify(token, "DEV@TINDER11");
    // const { _id } = decodedMessage;
    // const user = await User.findById(_id); //alreaddy checked in middleware

    const decodedObj = jwt.verify(token, "DEV@TINDER11");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    // console.log(user);

    req.user = user; // sending user from here
    next();
  } catch (error) {
    res.status(400).send("Error " + error);
  }
  // validate the token

  // find the user
};

module.exports = { userAuth };
