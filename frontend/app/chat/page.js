"use client";

import Navbar from "../component/Navbar";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { encryptMessage, decryptMessage } from "../../services/crypto";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [online, setOnline] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. جلب وتفكيك تشفير تاريخ الشات بالكامل (History)
  const fetchChatHistory = async (targetUser) => {
    try {
      const myKey = localStorage.getItem("privateKey");
      if (!myKey) return;

      const res = await fetch(
        `http://localhost:5000/api/messages/${username}/${targetUser}`
      );
      const data = await res.json();

      const decryptedHistory = data.map((msg) => {
        try {
          return {
            sender: msg.sender,
            message:
              msg.sender === username
                ? decryptMessage(myKey, msg.messageForSender) // فك تشفير رسالتي أنا
                : decryptMessage(myKey, msg.message),         // فك تشفير رسالة الطرف التاني
          };
        } catch (err) {
          console.error("History decryption error:", err);
          return { sender: msg.sender, message: "[Decryption error: Incompatible key]" };
        }
      });

      setMessages(decryptedHistory);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"]
    });

    if (storedUsername) {
      socketRef.current.on("connect", () => {
        socketRef.current.emit("join", storedUsername);
      });
    }

    // 2. استقبال الرسائل اللحظية وفك تشفيرها فوراً بصيغة صحيحة
    socketRef.current.on("receiveMessage", (data) => {
      const myKey = localStorage.getItem("privateKey");
      try {
        const decryptedText = decryptMessage(myKey, data.message);
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            message: decryptedText,
          },
        ]);
      } catch (err) {
        console.error("Decryption error:", err);
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender,
            message: "[Decryption error: Incompatible key]",
          },
        ]);
      }
    });

    socketRef.current.on("onlineUsers", (users) => {
      setOnline(users);
    });

    socketRef.current.on("typing", (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(""), 2000);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [username]); 

  useEffect(() => {
    if (selectedUser) {
      fetchChatHistory(selectedUser);
    }
  }, [selectedUser]);

  // 3. دالة إرسال الرسائل بالتشفير المزدوج (للمرسل والمستقبل)
  const sendMessage = async () => {
    if (!selectedUser || !text.trim()) return;

    try {
      // جلب مفتاح المستلم من السيرفر
      const res = await fetch(`http://localhost:5000/api/users/${selectedUser}`);
      const data = await res.json();
      if (!data.publicKey) return alert("Target user public key not found!");
      
      // جلب مفتاح المرسل (أنا)
      let myPublicKey = localStorage.getItem("publicKey");
    
      if (!myPublicKey) {
        console.log("Public key missing from localStorage, fetching from server...");
        const myRes = await fetch(`http://localhost:5000/api/users/${username}`);
        const myData = await myRes.json();
        if (myData.publicKey) {
          myPublicKey = myData.publicKey;
          localStorage.setItem("publicKey", myPublicKey);
        } else {
          return alert("Your public key was not found on the server. Please re-login.");
        }
      }

      // التشفير الثنائي الآمن
      const encryptedForReceiver = encryptMessage(data.publicKey, text);
      const encryptedForSender = encryptMessage(myPublicKey, text);

      if (socketRef.current) {
        socketRef.current.emit("sendMessage", {
          sender: username,
          receiver: selectedUser,
          message: encryptedForReceiver,       
          messageForSender: encryptedForSender 
        });
      }

      // تحديث الشاشة فوراً بالنص الواضح عندي
      setMessages((prev) => [...prev, { sender: username, message: text }]);
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="chat-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="chat-container"
        >
          <div className="sidebar">
            <div className="sidebar-header">
              <h3>Online Contacts</h3>
            </div>
            <div className="user-list">
              {online.map((u, i) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={i}
                  className={`user-item ${selectedUser === u ? "active" : ""} ${u === username ? "is-me" : ""}`}
                  onClick={() => u !== username && setSelectedUser(u)}
                >
                  <span
                    className={`status-dot ${u === username ? "me" : ""}`}
                  ></span>
                  <div className="user-info">
                    <p className="user-name">
                      {u} {u === username && "(You)"}
                    </p>
                    <small className="user-status">
                      {u === username ? "Online" : "Available"}
                    </small>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="chat-box">
            <div className="chat-header">
              {selectedUser ? (
                <h2>
                  Chatting with <span>{selectedUser}</span>
                </h2>
              ) : (
                <h2>
                  Welcome, <span>{username}</span>! 👋
                </h2>
              )}
            </div>

            <div className="messages">
              <AnimatePresence>
                {messages.length === 0 && !selectedUser && (
                  <p className="empty-chat">
                    Select a contact to start a secure conversation.
                  </p>
                )}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: msg.sender === username ? 20 : -20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`message-wrapper ${msg.sender === username ? "sent" : "received"}`}
                  >
                    <div className="message-content">
                      <small className="sender-name">{msg.sender}</small>
                      <p className="text">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {typingUser && (
                <p className="typing-indicator">{typingUser} is typing...</p>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (selectedUser && socketRef.current) {
                    socketRef.current.emit("typing", {
                      sender: username,
                      receiver: selectedUser,
                    });
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Write an encrypted message..."
              />
              <button onClick={sendMessage} className="send-btn">
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}