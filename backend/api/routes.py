from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict

# Imports des fichiers locaux
from .database import SessionLocal, User
from .auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter()

# --- SCHÉMAS DE DONNÉES ---

class UserSchema(BaseModel):
    email: str
    password: str

class ChatRequest(BaseModel):
    message: str

# --- DÉPENDANCES ---

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ROUTES D'AUTHENTIFICATION ---

@router.post("/register")
def register(user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    
    new_user = User(email=user.email, hashed_password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    return {"message": "Utilisateur créé !"}

@router.post("/login")
def login(user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Identifiants invalides")
    
    token = create_access_token(data={"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}

# --- ROUTE IA VERROUILLÉE ---

@router.post("/chat")
async def chat_with_ai(
    request: ChatRequest, 
    current_user_email: str = Depends(get_current_user) # LE VERROU EST ICI
):
    """
    Cette route ne s'exécute que si le header 'Authorization: Bearer <token>' est présent et valide.
    """
    # Ici, tu appelles ton service OpenAI ou Anthropic
    # Exemple de réponse simulée :
    ai_response = f"Bonjour {current_user_email}, j'ai bien reçu ton message : '{request.message}'"
    
    return {
        "user": current_user_email,
        "response": ai_response
    }
