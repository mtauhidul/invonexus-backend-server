# 🧾 InvoNexus Main Server

This is the core backend server for InvoNexus — an AI-powered invoice management system. It handles all API requests, connects to the database, and manages business logic for invoice processing and dashboard operations.

---

## 🔧 What It Does

- Receives structured invoice data from the email server or manual uploads
- Stores and manages invoice records in MongoDB
- Serves data to the frontend dashboard (React)
- Handles authentication and user sessions
- Supports filtering, tagging, and searching invoices

---

## ⚙️ Tech Stack

- **Node.js + Express**  
- **MongoDB**  
- **Mongoose**  
- **CORS, JWT, dotenv, multer**  

---

## 🛠️ Getting Started

```bash
pnpm install
pnpm dev
Create a .env file with:
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

## 📂 Key Endpoints
- POST /api/invoice – Add new invoice
- GET /api/invoices – Get all invoices
- GET /api/invoices/:id – Get single invoice
- POST /api/auth/login – Login user

Crafted with ❤️ by Mir Tauhidul Islam
