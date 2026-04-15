"""Configuration settings for the FastAPI application."""

from typing import Any, Dict
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Settings for the API.

    Charge les variables d'environnement depuis le fichier .env.development.
    """

    # API settings
    PROJECT_NAME: str = "Konbit Agro AI"
    VERSION: str = "0.1.0"
    
    BACKEND_PORT: int = Field(default=8000, description="Port du serveur Python")
    FRONTEND_PORT: int = Field(default=3000, description="Port du serveur Next.js")

    # Configuration de la sécurité (JWT)
    # Ces valeurs peuvent être surchargées dans ton fichier .env.development
    SECRET_KEY: str = Field(
        default="ton_secret_tres_prive_pour_konbit_agro", 
        description="Clé secrète pour générer les tokens JWT"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Configuration Base de Données
    DATABASE_URL: str = Field(
        default="sqlite:///./konbit_agro.db", 
        description="URL de connexion à la base de données"
    )

    model_config = SettingsConfigDict(
        env_file=".env.development", 
        env_file_encoding="utf-8", 
        case_sensitive=False
    )


def get_fastapi_settings() -> Dict[str, Any]:
    """Get FastAPI application settings.

    Returns
    -------
    Dict[str, Any]
        Dictionnaire avec les paramètres de l'application.
    """
    settings = Settings()
    return {
        "title": settings.PROJECT_NAME,
        "description": "Cerveau IA pour l'assistance agricole intelligente",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "redoc_url": "/redoc",
    }