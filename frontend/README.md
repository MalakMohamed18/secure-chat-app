# 🛡️ SecureSphere | End-to-End Encrypted Chat Platform

> A modern real-time messaging platform built with privacy and security at its core.

**SecureSphere** is a fully encrypted chat application that uses **End-to-End Encryption (E2EE)** powered by **RSA cryptography**, ensuring that only the sender and recipient can read the messages — not even the server has access to the plaintext content.

---

# ✨ Key Features

### 🔐 End-to-End Encryption

All messages are encrypted directly on the client side using RSA encryption via `node-forge`.

### ⚡ Real-Time Messaging

Instant communication powered by **Socket.io** for seamless live chatting.

### 🗝️ Secure Key Management

Automatic generation of:

* Public Key
* Private Key

during registration or when logging in from a new device.

### ⌨️ Typing Indicators

Live typing events for a modern chat experience.

### 🎨 Modern UI/UX

Smooth and responsive interface built using:

* Next.js
* Framer Motion
* Responsive Design Principles

### 🛡️ Decryption Safety

Protection system that prevents displaying corrupted or mismatched encrypted messages.

---

# 🚀 Tech Stack

# 🎨 Frontend

| Technology               | Purpose                  |
| ------------------------ | ------------------------ |
| **Next.js (App Router)** | Frontend Framework       |
| **Socket.io-client**     | Real-time communication  |
| **Framer Motion**        | Animations & transitions |
| **Node-forge**           | RSA cryptography         |

---

# ⚙️ Backend

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| **Node.js**    | Runtime Environment               |
| **Express.js** | API Server                        |
| **Socket.io**  | Real-time socket communication    |
| **JWT**        | Authentication & route protection |

---

# 🔐 Encryption Architecture

SecureSphere uses **Asymmetric Encryption (RSA)** to guarantee message confidentiality.

---

## 🗝️ 1. Key Generation

When a user registers:

* A **Public Key** is generated and stored on the server.
* A **Private Key** is generated and stored locally inside the user's browser only.

```text id="4xx3d6"
Public Key  → Shared with server
Private Key → Never leaves the client
```

---

## 🔒 2. Message Encryption

Before sending a message:

* The sender fetches the recipient's public key.
* The message is encrypted locally inside the browser.

```text id="e6d3u9"
Plain Message
      ↓
Encrypted using Recipient Public Key
      ↓
Ciphertext Sent to Server
```

---

## 📡 3. Secure Transmission

Messages travel through:

* Socket.io
* REST APIs

in fully encrypted format.

The backend only handles encrypted ciphertext.

---

## 🔓 4. Message Decryption

When the message reaches the recipient:

* The private key stored locally decrypts the message.
* The plaintext is never exposed to the server.

```text id="q2f1g7"
Ciphertext
      ↓
Decrypted using Recipient Private Key
      ↓
Readable Message
```

---

# 📂 Project Structure

```bash id="x5g7m2"
frontend/
│
├── app/              # Main application pages
│   ├── chat/
│   ├── login/
│   └── register/
│
├── components/       # Reusable UI components
│   └── Navbar/
│
├── services/         # Encryption & API logic
│
├── public/           # Static assets
│
├── styles/           # Global styles
│
├── utils/            # Helper functions
│
└── package.json
```

---

# ⚙️ Getting Started

# 📋 Prerequisites

Before running the project, make sure you have:

* Node.js `v18+`
* npm or yarn

---

# 📥 Installation

## 1️⃣ Clone The Repository

```bash id="w2pr0d"
git clone https://github.com/MalakMohamed18/frontend.git

cd frontend
```

---

## 2️⃣ Install Dependencies

```bash id="djv9fh"
npm install
```

---

## 3️⃣ Run Development Server

```bash id="1mg9pb"
npm run dev
```

---

# 🌐 Application Flow

```text id="tv7m4a"
User Authentication
        ↓
Generate RSA Keys
        ↓
Store Public Key on Server
        ↓
Encrypt Messages Client-side
        ↓
Send Encrypted Data via Socket.io
        ↓
Decrypt Locally on Receiver Device
```

---

# 🔒 Security Principles

* End-to-End Encryption (E2EE)
* RSA-Based Cryptography
* Local Private Key Storage
* JWT Authentication
* Protected APIs
* Zero-Knowledge Architecture
* Encrypted Real-Time Messaging

---

# 📱 User Experience Features

* Smooth animations with Framer Motion
* Responsive mobile-friendly interface
* Real-time online interactions
* Modern chat UI
* Secure session handling

---

# 🧪 Future Improvements

* Group Chats
* Voice & Video Calls
* File Encryption
* Message Self-Destruction
* Multi-Device Sync
* Push Notifications
* Biometric Authentication
* AES Hybrid Encryption Support

---

# 👨‍💻 Development Notes

This project was built with scalability and security in mind and can evolve into:

* Enterprise secure communication apps
* Military-grade messaging systems
* Privacy-focused collaboration tools
* Secure mobile chat platforms

---

# 📄 License

This project is licensed under the MIT License.

---
