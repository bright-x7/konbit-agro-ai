from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# --- CONFIGURATION ---
# Conseil : Remplace "ton_secret_tres_prive" par une longue phrase aléatoire
SECRET_KEY = "ton_secret_tres_prive" 
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# On définit où FastAPI doit chercher le token (Header: Authorization Bearer <token>)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# --- FONCTIONS DE MOT DE PASSE ---

def hash_password(password: str):
    """Hache le mot de passe pour le stockage en base de données."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    """Vérifie si le mot de passe saisi correspond au hachage stocké."""
    return pwd_context.verify(plain_password, hashed_password)

# --- GESTION DES TOKENS ---

def create_access_token(data: dict):
    """Génère un Token JWT valide pour 60 minutes."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- LE VERROU DE SÉCURITÉ (DÉPENDANCE) ---

def get_current_user(token: str = Depends(oauth2_scheme)):
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
        # On décode le token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email # Le token est valide, on renvoie l'email de l'utilisateur
    except JWTError:
        raise credentials_exception
