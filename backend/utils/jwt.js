const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};