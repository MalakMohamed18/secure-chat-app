const Message = require("../models/Message");
const User = require("../models/User");

// 1. دالة حفظ وإرسال الرسالة
exports.sendMessage = async (req, res) => {
  try {
    // التعديل: استقبلنا الخانة الجديدة messageForSender من الـ body
    const { sender, receiver, message, messageForSender } = req.body;

    if (!sender || !receiver || !message || !messageForSender) {
      return res.status(400).json({ error: "Missing required message fields" });
    }

    const msg = new Message({
      sender,
      receiver,
      message,            // النسخة المشفرة بمفتاح المستلم
      messageForSender    // النسخة المشفرة بمفتاح المرسل
    });

    await msg.save();
    res.json({ message: "Message stored securely (Dual-Encrypted)" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
};

// 2. دالة جلب تاريخ المحادثة بين شخصين
exports.getMessages = async (req, res) => {
  try {
    const { username, targetUser } = req.params; // التعديل: بنجيب الشات اللي بين الاتنين دول بس لترتيب المحادثة
    
    const messages = await Message.find({
      $or: [
        { sender: username, receiver: targetUser },
        { sender: targetUser, receiver: username }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages); 
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};