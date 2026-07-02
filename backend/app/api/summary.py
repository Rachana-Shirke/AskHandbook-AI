from fastapi import APIRouter

router = APIRouter(
    prefix="/summary",
    tags=["Summary"],
)


@router.get("/")
def get_summary():
    return {
        "message": "Summary endpoint is ready.",
        "summary": "Upload handbook documents to generate a summary.",
    }
