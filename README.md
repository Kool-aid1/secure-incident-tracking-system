# 🛡️ Secure Incident Tracking System (SITS)

A full-stack application that allows secure submission and tracking of security incidents across an organization. Built with Flask (backend), PostgreSQL (database), and React (frontend).

---

## 📦 Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Frontend  | React, TypeScript, Vite, MUI     |
| Backend   | Flask, Flask-SQLAlchemy, psycopg |
| Database  | PostgreSQL                       |
| Auth      | JWT, password hashing (Werkzeug) |
| API Comm. | REST (JSON)                      |
| Dev Tools | Docker (optional), Vite, npm     |

---

## 📁 Project Structure

```
sits-project/
├── backend/ # Flask API
│ ├── app.py # Main server file with routes
│ ├── models.py # SQLAlchemy models
│ ├── requirements.txt
│ └── ...
├── frontend/ # React UI
│ ├── src/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── components/
│ │ ├── SubmitIncidentForm.tsx
│ │ ├── IncidentTable.tsx
│ │ ├── LoginForm.tsx
│ │ ├── RegisterForm.tsx
│ │ ├── LogoutButton.tsx
│ │ └── Header.tsx
│ └── index.html
└── README.md
```

---

## 🚀 Setup Guide

### 1. Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
createdb sitsdb
python app.py  # runs at http://localhost:5001
```

```
Make sure PostgreSQL is running locally with user/password setup: postgres/password.
```

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev  # runs at http://localhost:5173
```

---

## 🔑 Features

- 🔐 Login/Registration with secure password hashing
- 🧾 Submit and track incidents with severity/classification
- 🔒 Protected routes using JWT stored in localStorage
- 🧠 Searchable & sortable incident table
- 🚪 Logout button to clear session and redirect
- 🌐 CORS support for frontend/backend interaction

---

## 🔒 Security Notes

- Passwords hashed with generate_password_hash (Werkzeug)
- JWTs signed using SECRET_KEY, valid for 1 hour
- Backend protects /incidents with @token_required decorator

Example DB URI:
postgresql+psycopg://postgres:password@localhost:5432/sitsdb

---

## ✅ Next Steps

- Add role-based access control (admin, analyst, auditor)
- Implement user dashboard views
- Add email verification or 2FA
- Dockerize app for consistent deployment

---

## 👤 Author

**Kenny Ly**  
Built for secure IT support and internal incident management with modern web tech.
