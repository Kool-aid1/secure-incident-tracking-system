from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# ---------------------
# 🧑 User Model
# ---------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # e.g., 'admin', 'analyst', 'auditor'

    incidents = db.relationship('Incident', backref='submitter', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

# ---------------------
# 🚨 Incident Model
# ---------------------
class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    severity = db.Column(db.String(20), nullable=False)  # e.g., 'Low', 'Medium', 'High', 'Critical'
    status = db.Column(db.String(20), default='Open')     # e.g., 'Open', 'In Progress', 'Resolved', 'Closed'
    classification = db.Column(db.String(30))             # e.g., 'Confidential', 'Secret', etc.

    submitted_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Incident {self.title} - {self.status}>'
