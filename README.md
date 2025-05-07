# 🛡️ Secure Incident Tracking System (SITS)

A full-stack application that allows secure submission and tracking of security incidents across an organization. Built with Flask (backend), PostgreSQL (database), and React (frontend).

---

## 📦 Tech Stack

| Layer     | Technology                       |
| --------- | -------------------------------- |
| Frontend  | React, TypeScript, Vite          |
| Backend   | Flask, Flask-SQLAlchemy, psycopg |
| Database  | PostgreSQL                       |
| API Comm. | REST (JSON)                      |
| Dev Tools | Docker (optional), Vite, npm     |

---

## 📁 Project Structure

```
sits-project/
├── backend/          # Flask API
│   ├── app.py
│   ├── models.py
│   └── ...
├── frontend/         # React UI
│   ├── src/
│   │   ├── App.tsx
│   │   └── components/SubmitIncidentForm.tsx
│   └── index.html
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
python app.py  # runs at http://localhost:5000
```

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev  # runs at http://localhost:5173
```

---

## 🔑 Features

- Submit and track incidents with severity and classification
- Backend validation and DB integrity checks
- `/incidents` GET + POST endpoints
- CORS enabled for frontend/backend communication

---

## 🔒 Security Notes

- Uses `psycopg[binary]` for Python 3.13 support
- Default DB: `postgresql+psycopg://postgres:password@localhost:5432/sitsdb`

---

## ✅ Next Steps

- Add login/registration with password hashing
- Role-based access (admin, analyst, auditor)
- UI improvements (styling, validation)

---

## 👤 Author

**Kenny Ly**  
This project was built for secure IT support and internal incident management.
