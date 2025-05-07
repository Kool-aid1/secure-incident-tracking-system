from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from models import db, Incident, User

app = Flask(__name__)
CORS(app)

# Load DB config
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql+psycopg://postgres:password@localhost:5432/sitsdb'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# ---------------------------
# ✅ /incidents route here
# ---------------------------
@app.route("/incidents", methods=["GET"])
def get_incidents():
    incidents = Incident.query.all()
    result = []
    for i in incidents:
        result.append({
            "id": i.id,
            "title": i.title,
            "description": i.description,
            "severity": i.severity,
            "classification": i.classification,
            "status": i.status,
            "submitted_by": User.query.get(i.submitted_by).email,
            "timestamp": i.timestamp.isoformat()
        })
    return jsonify(result), 200

@app.route("/incidents", methods=["POST"])
def create_incident():
    data = request.get_json()

    # Validate required fields
    required = ["title", "description", "severity", "classification", "submitted_by"]
    if not all(field in data for field in required):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if user exists
    user = User.query.get(data["submitted_by"])
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Create and insert incident
    incident = Incident(
        title=data["title"],
        description=data["description"],
        severity=data["severity"],
        classification=data["classification"],
        status="Open",
        submitted_by=user.id
    )

    db.session.add(incident)
    db.session.commit()

    return jsonify({"message": "Incident created successfully!"}), 201

# Root test route
@app.route("/")
def home():
    return jsonify({"message": "Secure Incident Tracking System Backend is running."})

# ---------------------------
# ✅ Run app
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
