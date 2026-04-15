from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

# --- CONFIGURATION ---
# SECRET_KEY devrait idéalement être chargée via tes settings (api/config.py)
SECRET_KEY = "ton_secret_tres_prive_pour_konbit_agro" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# On définit où FastAPI doit chercher le token. 
# "api/login" correspond au préfixe et à la route définis dans tes routes.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# --- FONCTIONS DE MOT DE PASSE ---

def hash_password(password: str) -> str:
    """Hache le mot de passe pour le stockage en base de données."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifie si le mot de passe saisi correspond au hachage stocké."""
    return pwd_context.verify(plain_password, hashed_password)

# --- GESTION DES TOKENS ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Génère un Token JWT sécurisé."""
    to_encode = data.copy()
    
    # Utilisation de timezone.utc car utcnow() est obsolète
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- LE VERROU DE SÉCURITÉ (DÉPENDANCE) ---

def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    """
    Vérifie le token envoyé par le frontend. 
    Si le token est absent, expiré ou faux, renvoie une erreur 401.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Session expirée ou invalide. Veuillez vous reconnecter.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Décodage du token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        
        if email is None:
            raise credentials_exception
            
        return email # Le token est valide, on renvoie l'email de l'utilisateur
        
    except JWTError:
        raise credentials_exception