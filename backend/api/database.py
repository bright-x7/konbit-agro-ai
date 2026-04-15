from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Import des réglages pour utiliser l'URL définie dans config.py
from .config import Settings

settings = Settings()

# Utilisation de l'URL centralisée (par défaut sqlite:///./konbit_agro.db)
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

# Configuration du moteur SQLAlchemy
# 'check_same_thread': False est nécessaire uniquement pour SQLite
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Création d'une fabrique de sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe de base pour nos modèles
Base = declarative_base()

# --- MODÈLE UTILISATEUR ---
class User(Base):
    """Table des utilisateurs de Konbit Agro AI."""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

# --- INITIALISATION ---
def init_db():
    """Crée les tables dans la base de données si elles n'existent pas."""
    Base.metadata.create_all(bind=engine)

# On lance la création des tables au démarrage
if __name__ == "__main__":
    init_db()
else:
    # Assure que les tables sont créées même quand importé
    init_db()