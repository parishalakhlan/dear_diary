# 🌸 DayScribe – Your Safe Space to Write & Reflect

A full-stack MERN journaling application that allows users to securely write, manage, and revisit their personal thoughts anytime, anywhere.

> Built with performance, security, and clean UI in mind ✨

---

## 🧠 Overview

DayScribe is a personal journaling web application where users can:

- Create private journal entries
- Edit or delete past entries
- Organize thoughts by date
- Securely authenticate and protect personal data

This project focuses on building a scalable full-stack application using the MERN stack with proper authentication and RESTful architecture.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 📝 Create, Edit & Delete Journal Entries
- 📅 Date-wise Entry Management
- 🔒 Protected Routes
- 📱 Responsive UI
- 🌙 Clean & Minimal Design

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Axios
- CSS / Tailwind (if used)

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication**
- JSON Web Tokens (JWT)
- bcrypt for password hashing

---

## 📂 Project Structure
DayScribe/
│
├── client/ # React Frontend
├── server/ # Express Backend
├── models/ # MongoDB Schemas
├── routes/ # API Routes
├── controllers/ # Business Logic
└── middleware/ # Authentication & Protection


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/dayscribe.git
cd dayscribe

2️⃣ Install dependencies

For backend:
cd server
npm install

For frontend:
cd client
npm install

3️⃣ Environment Variables

Create a .env file inside the server folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


4️⃣ Run the application

Backend:
npm run server

Frontend:

npm start
🔐 Security Considerations

Passwords are hashed using bcrypt.

JWT is used for authentication.

Protected routes ensure only authorized users can access private entries.

Environment variables are secured using .env files.

🎯 Learning Outcomes

Through this project, I strengthened my understanding of:

Full-stack architecture using MERN

RESTful API design

Authentication & middleware logic

MongoDB schema design

Handling async operations effectively

🌱 Future Improvements

🏷 Tag-based entry filtering

🔍 Search functionality

☁ Cloud deployment

🌸 Mood tracking analytics

🤍 Why DayScribe?

In a fast world, we need quiet spaces.

DayScribe is designed to be a gentle digital diary — secure, minimal, and personal.

Made with focus & curiosity 🌷


---

### Now Let’s Upgrade It Slightly (Optional but Powerful)

After pasting:

1. Add a clean banner screenshot at the top.
2. Add a short 1-line description in repository settings.
3. Add topics:

mern-stack
journaling-app
react
nodejs
mongodb
authentication


---

If you want, next we can:
- Make a **slightly more AI-engineer vibe version**
- Or make it more startup-style polished
- Or add GitHub stats + badges
- Or prepare it for deployment section (Render / Vercel)

Tell me how serious you want it to look.
