# 🔐 Secure End-to-End Encrypted Messaging Web Application

A modern, real-time full-stack messaging platform implementing **True End-to-End Encryption (E2EE)** using **Hybrid RSA Cryptography**.
The architecture ensures that **private keys never leave the client device**, meaning no server, database administrator, or third party can decrypt user conversations.

---

## ✨ Features

* 🔒 True End-to-End Encryption (E2EE)
* ⚡ Real-time Messaging with Socket.io
* 🧠 Hybrid RSA Encryption Architecture
* 👤 Secure Authentication System
* 💬 Persistent Chat History
* 🎨 Smooth Modern UI with Animations
* 📱 Responsive Design
* 🛡️ Client-Side Private Key Storage
* 🔄 Live User Presence & Messaging
* 🌙 Clean and Scalable Full-Stack Architecture

---

# 🛠️ Tech Stack

## Frontend

* **Framework:** Next.js 15+ (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Real-Time Communication:** Socket.io-client

## Backend

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB + Mongoose ODM
* **Real-Time Engine:** Socket.io

---

# 🛡️ Encryption Architecture

This application uses a **Dual Client-Side RSA Encryption Strategy** to ensure both sender and receiver can safely access their message history while maintaining complete server-side privacy.

---

## 🔑 1. Client-Side RSA Key Generation

Upon registration or secure login:

* A unique RSA Key Pair is generated:

  * `publicKey`
  * `privateKey`

### Important Security Rule

* ✅ Public key is stored on the server.
* ❌ Private key NEVER leaves the browser.
* 🔒 Private key is securely stored in:

  ```bash
  localStorage
  ```

This ensures zero server-side access to sensitive decryption credentials.

---

## ✉️ 2. Dual Message Encryption

When a user sends a message:

### Step A — Fetch Public Keys

The frontend retrieves:

* Recipient public key
* Sender public key

### Step B — Encrypt Message Twice

The plaintext message is encrypted into two separate ciphertexts:

| Encryption Target    | Stored Field       |
| -------------------- | ------------------ |
| Recipient Public Key | `message`          |
| Sender Public Key    | `messageForSender` |

---

## 📦 3. Database Storage Strategy

Example MongoDB Document:

```json
{
  "sender": "userA",
  "receiver": "userB",
  "message": "EncryptedWithReceiverPublicKey",
  "messageForSender": "EncryptedWithSenderPublicKey"
}
```

### Why This Matters

* Receiver can decrypt incoming messages.
* Sender can still read old sent messages later.
* Database contents remain unreadable to administrators.

---

## 🔓 4. Local Decryption

All decryption occurs exclusively on the client side using the locally stored private key.

### Result

Even if:

* The server is compromised
* MongoDB is leaked
* Network traffic is intercepted

The attacker still cannot decrypt conversations.

---

# 📁 Project Structure

```text
secure-messaging-app/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Message.js
│   │
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   └── chat/
│   │
│   ├── component/
│   ├── services/
│   │   ├── encrypt.js
│   │   └── decrypt.js
│   │
│   ├── package.json
│   └── tailwind.config.js
│
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 📋 Prerequisites

Make sure you have installed:

* Node.js (v18+ recommended)
* MongoDB (Local or MongoDB Atlas)
* npm or yarn

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/secure-messaging-app.git
cd secure-messaging-app
```

---

## 2️⃣ Backend Environment Variables

Create a `.env` file inside:

```bash
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 3️⃣ Install Dependencies

### Root

```bash
npm install
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# 🔄 Concurrent Development Setup

This project uses **concurrently** to run both frontend and backend servers from one terminal.

Install dependency in the root folder:

```bash
npm install concurrently --save-dev
```

---

## Root package.json

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix frontend\" \"node backend/server.js\""
}
```

---

# ▶️ Run The Application

From the root directory:

```bash
npm run dev
```

---

# 🌐 Application URLs

| Service       | URL                                            |
| ------------- | ---------------------------------------------- |
| Frontend      | [http://localhost:3000](http://localhost:3000) |
| Backend API   | [http://localhost:5000](http://localhost:5000) |
| Socket Server | [http://localhost:5000](http://localhost:5000) |

---

# 🔐 Security Notes

## Perfect Forward Secrecy Behavior

Since private keys are stored locally:

* Clearing browser storage removes access to old encrypted chats.
* Switching devices without exporting keys prevents old message recovery.

This behavior mirrors security principles used in applications like:

* Signal
* WhatsApp local encrypted backups

---

# 🧠 Future Improvements

* ✅ Group Chats with Shared Session Keys
* ✅ File & Media Encryption
* ✅ Voice/Video Calls with WebRTC
* ✅ JWT Authentication
* ✅ Multi-Device Secure Sync
* ✅ IndexedDB Secure Key Vault
* ✅ Message Self-Destruction
* ✅ Typing Indicators & Online Presence

---

# 🤝 Contributing

Pull requests are welcome.

For major changes:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed with ❤️ by **Malak Mohamed**

---

# 📌 Git Commands After Updating README

```bash
git add README.md
git commit -m "Docs: Add professional README for Front & Back"
git push origin main
```
