const validator = require("validator");
const vailidateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please write frst and last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not correct");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validateEditData = (req) => {
  const allowesEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowesEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { vailidateSignupData, validateEditData };
