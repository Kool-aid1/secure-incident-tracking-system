from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import datetime
import os
from models import db, Incident, User
from functools import wraps

app = Flask(__name__)
CORS(app)

# Load DB config
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql+psycopg://postgres:password@localhost:5432/sitsdb'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

SECRET_KEY = os.getenv("SECRET_KEY", "devsecret")

# ---------------------------
# ✅ /incidents route here
# ---------------------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Look for token in headers
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]  # Bearer <token>

        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
            if not current_user:
                return jsonify({"error": "User not found"}), 404
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(current_user, *args, **kwargs)

    return decorated

@app.route("/incidents", methods=["GET"])
@token_required
def get_incidents(current_user):
    # Use `current_user` if needed
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
@token_required
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

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([
        {"id": user.id, "name": user.name, "email": user.email}
        for user in users
    ])

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "analyst")  # default role if not provided

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 409

    hashed_pw = generate_password_hash(password)
    user = User(name=name, email=email, password_hash=hashed_pw, role=role)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    print("User found:", user)
    if user:
        print("Stored hash:", user.password_hash)
        print("Password match:", check_password_hash(user.password_hash, password))

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm="HS256")

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "role": user.role
        }
    }), 200

# Root test route
@app.route("/")
def home():
    return jsonify({"message": "Secure Incident Tracking System Backend is running."})

# ---------------------------
# ✅ Run app
# ---------------------------
if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG", "true") == "true", host="0.0.0.0", port=5001)

