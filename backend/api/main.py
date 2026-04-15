"""Main module for the FastAPI application."""

import logging
from typing import Dict

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api.config import Settings
from api.routes import router as api_router

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize settings
settings = Settings()

# Create the FastAPI app
app = FastAPI(
    title="Konbit Agro AI API", # Mise à jour du nom du projet
    description="Cerveau IA pour l'assistance agricole intelligente",
    version="0.1.0",
)

# Configuration précise du CORS pour ton environnement Next.js
# On autorise spécifiquement localhost:3000 qui est le port par défaut de ton front
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # On remplace "*" par tes origines spécifiques
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router (C'est ici que passent tes requêtes d'auth et d'IA)
app.include_router(api_router)


@app.get("/")
async def root() -> Dict[str, str]:
    """Root endpoint of the API."""
    return {
        "project": "Konbit Agro AI",
        "message": "Le cerveau IA est en ligne et prêt à analyser vos cultures."
    }


@app.get("/healthcheck")
async def healthcheck() -> Dict[str, str]:
    """Vérifie que l'API est active."""
    return {"status": "healthy", "service": "agro-brain-v1"}