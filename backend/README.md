# 🔐 SecureSphere Backend | Encrypted Core

> The secure backend engine powering **SecureSphere** — responsible for encrypted communication, authentication, real-time messaging, and public key distribution.

---

## 📌 Overview

**SecureSphere Backend** is a secure server-side architecture built to handle encrypted messaging between users while maintaining a **Zero-Knowledge** approach.

The server acts only as a secure transport layer, meaning:

* Messages are encrypted client-side using RSA.
* The backend never has access to plaintext message content.
* Even if the database is compromised, stored messages remain unreadable.

---

# 🚀 Tech Stack

| Technology                | Purpose                        |
| ------------------------- | ------------------------------ |
| **Node.js**               | Runtime environment            |
| **Express.js**            | REST API framework             |
| **MongoDB**               | Database storage               |
| **Mongoose**              | MongoDB object modeling        |
| **Socket.io**             | Real-time communication        |
| **JWT (JSON Web Tokens)** | Authentication & authorization |
| **Bcrypt**                | Password hashing               |
| **Node-forge**            | RSA encryption utilities       |

---

# 🔒 Security Architecture

SecureSphere Backend was designed with security-first principles.

### ✅ Password Hashing

User passwords are never stored in plain text.
Passwords are securely hashed using **Bcrypt** with salting.

### ✅ Zero-Knowledge Storage

All messages are stored already encrypted using **RSA encryption**.
The server cannot decrypt or read message contents.

### ✅ Protected API Routes

Sensitive endpoints are protected using **JWT Authentication Middleware**.

### ✅ Environment Variable Protection

Secrets and configuration values are stored securely inside `.env` files.

### ✅ Real-Time Secure Communication

Socket.io handles real-time events while maintaining authenticated sessions.

---

# 📂 Project Structure

```bash
secure-chat-backend/
│
├── controllers/      # Business logic
├── middleware/       # JWT authentication & security middlewares
├── models/           # MongoDB schemas
├── routes/           # API endpoints
├── utils/            # Encryption & helper utilities
├── sockets/          # Socket.io handlers
├── config/           # Database & environment configs
├── .env              # Environment variables
├── server.js         # Application entry point
└── package.json
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone The Repository

```bash
git clone https://github.com/yourusername/secure-chat-backend.git

cd secure-chat-backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_super_secret_key
```

---

## 4️⃣ Start The Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

# 🔑 Authentication Flow

```text
User Login/Register
        ↓
Server Validates Credentials
        ↓
JWT Token Generated
        ↓
Client Stores Token
        ↓
Protected Requests Use Authorization Header
```

---

# 📡 API Endpoints

# 🔐 Auth Routes

### Register User

```http
POST /api/auth/register
```

Registers a new user and stores their public RSA key.

---

### Login User

```http
POST /api/auth/login
```

Authenticates the user and returns a JWT token.

---

# 💬 Message Routes

### Send Encrypted Message

```http
POST /api/messages/send
```

* Requires Authentication
* Stores RSA encrypted message

---

### Get Encrypted Chat History

```http
GET /api/messages/:username
```

* Requires Authentication
* Returns encrypted conversation history

---

# 👤 User Routes

### Get User Public Key

```http
GET /api/users/:username
```

Used to retrieve a user's RSA public key before encrypting messages.

---

# 🔄 Real-Time Communication

SecureSphere uses **Socket.io** to provide:

* Instant messaging
* Live user status
* Real-time encrypted communication
* Fast event-based architecture

---

# 🛡️ Security Best Practices

* Password Hashing with Bcrypt
* JWT Protected APIs
* RSA Encrypted Messages
* Environment Variable Isolation
* Zero-Knowledge Data Storage
* Secure Middleware Architecture

---

# 📦 Example Request Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🧪 Future Improvements

* End-to-End Encryption Enhancements
* Refresh Tokens
* Rate Limiting
* Email Verification
* 2FA Authentication
* Message Expiration
* Group Chats
* File Encryption Support

---

# 👨‍💻 Developer Notes

This backend is designed for scalable and secure encrypted communication systems and can be integrated with:

* React / Next.js
* React Native
* Flutter
* Electron Apps

---

# 📄 License

This project is licensed under the MIT License.

---

