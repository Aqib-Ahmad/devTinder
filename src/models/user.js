const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email adress " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        const options = {
          require_protocol: true, // ensures http/https is present
          allow_fragments: true,
          allow_query_components: true,
        };

        if (!validator.isURL(value, options)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    gender: {
      type: String,
      // this will only work in post not in patch or put we use (runValidators:true)
      validate(value) {
        if (!["male", "female", "others", "Male", "Female"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },

    about: {
      type: String,
      default: "This is default data",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

// -------------------schema methods -----------------------------------
// schema methods  related to user
// only in simple function not in arrow
userSchema.methods.getJWT = async function () {
  const user = this; // current instance
  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER11", {
    expiresIn: "1d", //0d ,1d ,100d, 1h
  });
  return token;
};

//  bcrypt password
userSchema.methods.validatePassword = async function (passwordByInput) {
  // const user = this; // current user
  // const hashingPassword =  user.password
  const hashingPassword = this.password;
  const isPasswordValid = await bcrypt.compare(
    passwordByInput,
    hashingPassword
  );
  return isPasswordValid;
};

// ------------------------------------------------------

const User = mongoose.model("UserModel", userSchema);
module.exports = User;
