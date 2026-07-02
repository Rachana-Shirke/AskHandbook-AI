from fastapi import APIRouter
from app.models.request_models import ChatRequest
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

service = ChatService()

@router.post("/")
async def chat(request: ChatRequest):

    result = service.ask(request.question)

    return result