from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "Healthy",
        "application": "HandbookIQ",
        "version": "1.0.0",
        "time": datetime.now()
    }