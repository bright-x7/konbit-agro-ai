from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatMessage(BaseModel):
    message: str

@router.post("/")
async def chat_with_ai(data: ChatMessage):
    # C'est ici qu'on connectera l'IA plus tard
    user_text = data.message
    return {"reply": f"L'IA a bien reçu : {user_text}"}
