from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.ingestion_service import IngestionService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../.."
    )
)

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "uploads"
)

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/")
async def upload_handbook(
    file: UploadFile = File(...)
):

    if not file.filename.endswith(".pdf"):

        return {
            "status": "error",
            "message": "Only PDF allowed."
        }

    save_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(save_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    ingestion = IngestionService()

    pages, chunks = ingestion.build_vector_store(
        UPLOAD_FOLDER
    )

    return {

        "status": "success",

        "message": f"{file.filename} uploaded successfully.",

        "documents": len(
            [
                f
                for f in os.listdir(UPLOAD_FOLDER)
                if f.endswith(".pdf")
            ]
        ),

        "pages": pages,

        "chunks": chunks

    }