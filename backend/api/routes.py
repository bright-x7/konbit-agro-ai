from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Dict, Generator

# Imports des fichiers locaux
from .database import SessionLocal, User
from .auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api") # Ajout du préfixe pour correspondre au frontend

# --- SCHÉMAS DE DONNÉES ---

class UserSchema(BaseModel):
    email: EmailStr # Utilise EmailStr pour une validation automatique du format
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ChatRequest(BaseModel):
    message: str

# --- DÉPENDANCES ---

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ROUTES D'AUTHENTIFICATION ---

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserSchema, db: Session = Depends(get_db)):
    # Vérification si l'utilisateur existe déjà
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Cet email est déjà utilisé"
        )
    
    # Création du nouvel utilisateur
    new_user = User(
        email=user.email, 
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Utilisateur créé avec succès !"}

@router.post("/login", response_model=Token)
def login(user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Identifiants invalides",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Génération du Token JWT pour le frontend
    token = create_access_token(data={"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}

# --- ROUTE IA (ASSISTANCE VOCALE/TEXTE) ---

@router.post("/chat")
async def chat_with_ai(
    request: ChatRequest, 
    current_user: User = Depends(get_current_user) 
):
    """
    Route sécurisée pour l'IA. 
    L'utilisateur doit être connecté pour recevoir une réponse.
    """
    user_text = request.message
    
    # Ici, ton futur "Cerveau IA" traitera 'user_text'
    ai_text = (
        f"Bonjour {current_user.email}, je suis l'assistant Konbit Agro AI. "
        f"J'ai bien reçu votre message : '{user_text}'. "
        "Comment puis-je aider votre exploitation aujourd'hui ?"
    )
    
    return {
        "user_email": current_user.email,
        "reply": ai_text 
    }