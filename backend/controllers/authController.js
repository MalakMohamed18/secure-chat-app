const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
const cors = require("cors");
app.use(cors());
exports.register = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body); 

    const { username, password, publicKey } = req.body;

    if (!username || !password || !publicKey) {
      console.log("Validation Failed: Missing fields");
      return res.status(400).json({ error: "Missing fields" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username taken" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashed,
      publicKey: publicKey
    });

    await user.save();
    console.log("User saved successfully!");

    res.status(201).json({ message: "User Created" });
  } catch (error) {
    console.log("!!! SERVER CRASHED !!!");
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};