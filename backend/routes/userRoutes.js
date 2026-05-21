const router = require("express").Router();
const User = require("../models/User");

router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.json({ publicKey: user.publicKey });
});

module.exports = router;