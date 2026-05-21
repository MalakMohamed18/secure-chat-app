const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true }, // دي النسخة المشفرة للمستلم
  messageForSender: { type: String, required: true }, // التعديل: دي النسخة المشفرة للمرسل
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);