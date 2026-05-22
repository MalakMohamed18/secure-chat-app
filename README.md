# 🔐 Secure End-to-End Encrypted Messaging App

A modern, real-time full-stack messaging platform implementing **True End-to-End Encryption (E2EE)** using Hybrid RSA Cryptography. The architecture ensures that private keys never leave the client device — meaning no server, database administrator, or third party can decrypt user conversations.

---

## ✨ Features

- 🔒 True End-to-End Encryption (E2EE)
- ⚡ Real-time Messaging with Socket.io
- 🧠 Hybrid RSA Encryption Architecture
- 👤 Secure Authentication with JWT
- 💬 Persistent Chat History
- 🎨 Smooth Modern UI with CSS Animations
- 📱 Responsive Design
- 🛡️ Client-Side Private Key Storage
- 🔄 Live User Presence & Messaging
- 🌙 Clean and Scalable Full-Stack Architecture

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 15+ (App Router) | Frontend Framework |
| CSS Modules / Global CSS | Styling & Animations |
| Framer Motion | UI Animations |
| Socket.io-client | Real-Time Communication |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server Runtime & API |
| MongoDB + Mongoose | Database & ODM |
| Socket.io | Real-Time Engine |
| JWT (JSON Web Tokens) | Authentication & Authorization |

---

## 🛡️ Encryption Architecture

This application uses a **Dual Client-Side RSA Encryption Strategy** to ensure both sender and receiver can safely access message history while maintaining complete server-side privacy.

### 🔑 1. Client-Side RSA Key Generation

Upon registration or secure login, a unique RSA Key Pair is generated:

- `publicKey` → stored on the server
- `privateKey` → **never leaves the browser**, stored securely in `localStorage`

This ensures **zero server-side access** to sensitive decryption credentials.

---

### ✉️ 2. Dual Message Encryption

When a user sends a message:

**Step A — Fetch Public Keys**

The frontend retrieves:
- Recipient's public key
- Sender's public key

**Step B — Encrypt Message Twice**

| Encryption Target | Stored Field |
|---|---|
| Recipient Public Key | `message` |
| Sender Public Key | `messageForSender` |

---

### 📦 3. Database Storage Strategy

Example MongoDB Document:

```json
{
  "sender": "userA",
  "receiver": "userB",
  "message": "EncryptedWithReceiverPublicKey",
  "messageForSender": "EncryptedWithSenderPublicKey"
}
```

**Why This Matters:**
- ✅ Receiver can decrypt incoming messages
- ✅ Sender can still read old sent messages
- ✅ Database contents remain unreadable to administrators

---

### 🔓 4. Local Decryption

All decryption occurs **exclusively on the client side** using the locally stored private key.

> Even if the server is compromised, MongoDB is leaked, or network traffic is intercepted — **the attacker still cannot decrypt conversations.**

---

## 📁 Project Structure

```
secure-messaging-app/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── app/
│   │   ├── chat/
│   │   │   └── page.js
│   │   ├── login/
│   │   ├── register/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── component/
│   ├── services/
│   │   ├── encrypt.js
│   │   └── decrypt.js
│   ├── styles/
│   ├── public/
│   ├── globals.css
│   ├── next.config.ts
│   ├── package.json
│   └── postcss.config.mjs
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

---

### ⚙️ Installation

**1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/secure-messaging-app.git
cd secure-messaging-app
```

**2️⃣ Backend Environment Variables**

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**3️⃣ Install Dependencies**

```bash
# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

---

### 🔄 Concurrent Development Setup

This project uses `concurrently` to run both servers from one terminal.

```bash
npm install concurrently --save-dev
```

Root `package.json`:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix frontend\" \"node backend/server.js\""
}
```

---

### ▶️ Run The Application

```bash
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Socket Server | http://localhost:5000 |

---

## 🔐 Authentication

This app uses **JWT (JSON Web Tokens)** for secure authentication:

- On login/register, the server issues a signed JWT
- The token is stored client-side and sent with each request via `Authorization` headers
- The server validates the token on protected routes

---

## 🔐 Security Notes

Since private keys are stored locally:

- Clearing browser storage removes access to old encrypted chats
- Switching devices without exporting keys prevents old message recovery

> This behavior mirrors security principles used in **Signal** and **WhatsApp's** local encrypted backups.

---

## 🧠 Future Improvements

- [ ] Group Chats with Shared Session Keys
- [ ] File & Media Encryption
- [ ] Voice/Video Calls with WebRTC
- [ ] Multi-Device Secure Sync
- [ ] IndexedDB Secure Key Vault
- [ ] Message Self-Destruction
- [ ] Typing Indicators & Online Presence

---

## 🤝 Contributing

Pull requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

Developed with ❤️ by **Malak Mohamed**
