const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config();

const User = require("./models/User"); 
const Message = require("./models/Message");

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true 
}));

// --- Database Connection ---
mongoose.connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/secure_chat")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(" MongoDB Error:", err));

// --- Auth Routes ---
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, publicKey } = req.body;

    if (!username || !password || !publicKey) {
      return res.status(400).json({ error: "Missing fields: username, password, and publicKey are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
      username, 
      password: hashedPassword, 
      publicKey 
    });

    await newUser.save();
    console.log(`👤 User registered: ${username}`);
    res.status(201).json({ message: "User registered successfully", username: newUser.username });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      res.json({ 
        username: user.username, 
        publicKey: user.publicKey,
        message: "Login successful" 
      });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- User Routes ---
app.get("/api/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json({ publicKey: user.publicKey });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// --- Message Routes ---

app.get("/api/messages/:username/:targetUser", async (req, res) => {
  try {
    const { username, targetUser } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: username, receiver: targetUser },
        { sender: targetUser, receiver: username }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

// --- Socket.io (Real-time Logic) ---
const server = http.createServer(app); 
const io = new Server(server, { 
  cors: { 
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let onlineUsers = {};

io.on("connection", (socket) => {

  socket.on("join", (username) => {
    onlineUsers[username] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
    console.log(`📡 ${username} is online`);
  });

 
  socket.on("sendMessage", async ({ sender, receiver, message, messageForSender }) => {
    try {
      const newMessage = new Message({ 
        sender, 
        receiver, 
        message,           
        messageForSender   
      });
      await newMessage.save();

      const targetId = onlineUsers[receiver];
      if (targetId) {
        io.to(targetId).emit("receiveMessage", { sender, message });
      }
    } catch (err) {
      console.error("Socket Error (Save Message):", err);
    }
  });

  socket.on("disconnect", () => {
    for (let user in onlineUsers) {
      if (onlineUsers[user] === socket.id) {
        delete onlineUsers[user];
        break;
      }
    }
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));