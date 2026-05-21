const router = require("express").Router();
const auth = require("../middleware/auth");
const { sendMessage, getMessages } = require("../controllers/messageController");

router.post("/send", auth, sendMessage);
router.get("/:username", auth, getMessages);

module.exports = router;