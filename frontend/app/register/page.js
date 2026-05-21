"use client";

import { useState } from "react";
import Navbar from "../component/Navbar";
import { motion } from "framer-motion";
import { generateKeyPairAsync as generateKeyPair } from "../../services/crypto";
import { useRouter } from "next/navigation"; 
import "../globals.css";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "" 
  });

  const handleSubmit = async () => {
    if (!data.username.trim() || !data.password.trim()) {
      return alert("Please enter both username and password");
    }

    try {
      const { publicKey, privateKey } = await generateKeyPair();

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password, 
          publicKey: publicKey     
        })
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("privateKey", privateKey); 
        
        alert("Registered Successfully! Your keys have been generated on this device. 🛡️");
        
        router.push("/chat");
      } else {
        alert(result.error || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong. Check if server is running.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card"
        >
          <div className="auth-header">
            <h2>Create Account 🛡️</h2>
            <p>Your messages will be end-to-end encrypted</p>
          </div>

          <div className="auth-form">
            <div className="input-group">
              <label>Username</label>
              <input
                placeholder="Choose a unique name"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Choose a strong password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} // تسجيل بالـ Enter
              />
            </div>

            <button className="auth-btn" onClick={handleSubmit}>
              Register & Generate Keys
            </button>

            <p className="auth-footer">
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}