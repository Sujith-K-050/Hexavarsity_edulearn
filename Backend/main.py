from fastapi import FastAPI, HTTPException, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel , EmailStr
from typing import Optional
import sqlite3
import uvicorn
import random
import smtplib 
from email.message import EmailMessage


app = FastAPI()

verification_codes = {}
router = APIRouter()

# Allow frontend to call backend (for local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080" , "http://localhost:8080/forgot-password"],  # in prod, use specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite DB connection
def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    return conn

# Create users table if not exists
with get_db() as db:
    db.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        password TEXT
    )
    """)
    db.commit()

# Models
class EmailCheck(BaseModel):
    email: str

class LoginData(BaseModel):
    email: str
    password: str

class SignupData(BaseModel):
    email: str
    name: str
    password: str

class ResetPassword(BaseModel):
    email: str
    new_password: str

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str

class EmailData(BaseModel):
    sender_email: str
    app_password: str
    recipient_email: str
    subject: str
    body: str


from email.message import EmailMessage
import smtplib

def send_email(recipient_email, name, code):
    sender_email = "sujithyadav050@gmail.com"
    subject = "Verification Code for Resetting Password in EduLearn"

    body = f"""Dear {name},

We received a request to reset the password for your EduLearn account. 
For your security, we require you to verify your identity by entering a code.

Your verification code is: {code}

If you didn't request this, please ignore this email.
"""

    try:
        msg = EmailMessage()
        msg["From"] = sender_email
        msg["To"] = recipient_email
        msg["Subject"] = subject
        msg.set_content(body)  # ✅ body is now a string

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(sender_email, "uvmeohxxfjxpagjy")  # Replace with your actual App Password
            smtp.send_message(msg)

        print("✅ Email sent successfully!")
        return True
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False


# Routes

@app.post("/check-email")
async def check_email(data: EmailCheck):
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email = ?", (data.email,)).fetchone()
    print(user)
    if user:
        return {"exists": True}
    return {"exists": False}


@app.post("/login")
async def login(data: LoginData):
    db = get_db()
    user = db.execute(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        (data.email, data.password)
    ).fetchone()
    print(user)
    if user:
        return {"success": True, "name": user["name"]}
    raise HTTPException(status_code=401, detail="Invalid email or password")


@app.post("/signup")
async def signup(data: SignupData):
    db = get_db()
    try:
        db.execute(
            "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
            (data.email, data.name, data.password)
        )
        db.commit()
        print("Add successfully Added to DB")
        return {"success": True}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=409, detail="Email already exists")


@app.post("/reset-password")
async def reset_password(data: ResetPassword):
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email = ?", (data.email,)).fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    
    db.execute(
        "UPDATE users SET password = ? WHERE email = ?",
        (data.new_password, data.email)
    )
    db.commit()
    return {"success": True}

@app.post("/send-verification-code")
async def send_verification_code(data: EmailCheck):
    print("Backend recived API Call for resetting password")
    email = data.email
    code = str(random.randint(100000, 999999))
    verification_codes[email] = code

    db = get_db()
    user_name = db.execute("SELECT name FROM users WHERE email = ?", (data.email,)).fetchone()

    # Simulate email send (replace with actual email logic)
    email_status = send_email(data.email , user_name , code)

    print(f"[DEBUG] Sending code {code} to {email}")

    return {"message": "Verification code status"}

@router.post("/verify-code")
async def verify_code(data: VerifyCodeRequest):
    stored_code = verification_codes.get(data.email)
    if stored_code and stored_code == data.code:
        return {"message": "Code verified"}
    raise HTTPException(status_code=400, detail="Invalid code")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)