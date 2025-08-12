// const express = require("express");
// const app = express();
// const PORT = 5000;
// const connectDb = require("./config/database");
// const User = require("./models/user");
// const { valodateSignupData } = require("./utils/validation");
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const { userAuth } = require("./middlewares/auth");
// app.use(express.json()); // it will work for all routes and middleware to convert json into js json object
// app.use(cookieParser()); // getting cookies
// posting data to DB
// app.post("/signup", async (req, res) => {
//   try {
//     // validation of data req.body
//     valodateSignupData(req); // helper function
//     // encrypt password
//     const { firstName, lastName, emailId, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });
//     await user.save();
//     res.send("user added ");
//   } catch (error) {
//     res.status(400).send("Error in signup : " + error.message);
//   }
// });

// login user
// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) {
//       throw new Error("Invalid crendentials  ");
//     }
//     const isPawordValid = await user.validatePassword(password);
//     if (isPawordValid) {
//       // jwt / // all is related os user , i can get from user schema
//       // const token = await jwt.sign({ _id: user._id }, "DEV@TINDER11", {
//       //   expiresIn: "0d",
//       // });
//       const token = await user.getJWT(); // from schema

//       // cookies with jwt token

//       // create a jwt

//       // add the token to cookie and dend the response back to the user
//       res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
//       res.send("User login successfull..");
//     } else {
//       throw new Error("Invalid crendentials");
//     }
//   } catch (error) {
//     res.status(400).send("Login error " + error.message);
//   }
// });

// reading cookies
// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     // const cookies = req.cookies;
//     // const { token } = cookies;
//     // validate my token
//     // if (!token) {
//     //   throw new Error("Invalid token " + error);
//     // }
//     // const decodedMessage = jwt.verify(token, "DEV@TINDER11");
//     // const { _id } = decodedMessage;
//     // const user = await User.findById(_id); //alreaddy checked in middleware
//     const user = req.user;

//     // if (!user) { // alreaddy checked in middleware
//     //   throw new Error("user is nit here " + error);
//     // }
//     // console.log(user);

//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Error " + error.message);
//   }
// });

// getting all  users from DB
// app.get("/getallusers", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(400).send("No user in Db");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("error in getting user from DB", error);
//   }
// });

// getting  user with email from DB
// app.get("/getuser", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(400).send("No user of this email in Db");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("error in getting user from DB", error);
//   }
// });

// deleting  user with email from DB
// app.delete("/deleteuser", async (req, res) => {
//   const userId = req.body._id;

//   try {
//     const deleteUser = await User.findOneAndDelete({ _id: userId });
//     res.send("user deleted", deleteUser);
//   } catch (error) {
//     res.status(400).send("error in deleting user from DB", error);
//   }
// });

// patch/update  user with email from DB
// app.patch("/update/:_id", async (req, res) => {
//   // const updateuserId = req.body._id;
//   const updateuserId = req.params?._id;
//   const data = req.body;
//   // from can't be updated
//   try {
//     const ALLOWED_UPDATE = [
//       "firstName",
//       "lastName",
//       "password",
//       "gender",
//       "photoURL",
//       "skills",
//     ];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATE.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Updated not allowed");
//     }
//     // till can't be updated

//     const updated = await User.findByIdAndUpdate({ _id: updateuserId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("data updated in DB " + updated);
//   } catch (error) {
//     res.status(400).send("Error in updating user data " + error.message);
//   }
// });

// connecting database
// connectDb()
//   .then(() => {
//     console.log("database connecting successfully ");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(() => {
//     console.error("database is not connecting");
//   });

// ===============after routing ===================

const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/Chat");
const http = require("http");

// cors
var cors = require("cors");
const initializingSocket = require("./utils/Socket");
// env
require("dotenv").config();
// connecting with frontend

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://web-o1rq.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// middlewares

app.use(express.json());
app.use(cookieParser());
// routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializingSocket({ server });
connectDb()
  .then(() => {
    console.log("database connecting successfully ");
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.error("database is not connecting");
  });
