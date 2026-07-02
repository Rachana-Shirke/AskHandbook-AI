from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.upload import router as upload_router
from app.api.chat import router as chat_router
from app.api.documents import router as documents_router
from app.api.summary import router as summary_router

app = FastAPI(
    title="HandbookIQ API",
    description="AI Employee Handbook Knowledge Assistant",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(documents_router)
app.include_router(summary_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to HandbookIQ API"
    }