from fastapi import APIRouter
import os
from datetime import datetime
from pathlib import Path

from app.services.ingestion_service import IngestionService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../.."
    )
)

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")


def _get_documents_list():
    documents = []

    if not os.path.exists(UPLOAD_FOLDER):
        return documents

    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.lower().endswith(".pdf"):
            file_path = os.path.join(UPLOAD_FOLDER, filename)

            file_stat = os.stat(file_path)
            file_size = file_stat.st_size
            upload_date = datetime.fromtimestamp(file_stat.st_mtime).strftime("%Y-%m-%d")
            size_mb = round(file_size / (1024 * 1024), 1)

            try:
                from langchain_community.document_loaders import PyPDFLoader
                loader = PyPDFLoader(file_path)
                pages = loader.load()
                page_count = len(pages)
                chunk_count = page_count * 5
            except Exception:
                page_count = 0
                chunk_count = 0

            documents.append({
                "id": filename,
                "name": filename,
                "size": f"{size_mb} MB",
                "pages": page_count,
                "chunks": chunk_count,
                "status": "indexed",
                "uploadDate": upload_date
            })

    return documents


@router.get("/")
def get_documents():
    return {"documents": _get_documents_list()}


@router.delete("/{filename}")
def delete_document(filename: str):
    safe_name = os.path.basename(filename)
    file_path = os.path.join(UPLOAD_FOLDER, safe_name)

    if os.path.exists(file_path):
        os.remove(file_path)

    ingestion = IngestionService()
    ingestion.build_vector_store(UPLOAD_FOLDER)

    return {
        "status": "success",
        "message": f"{safe_name} deleted successfully.",
        "documents": _get_documents_list()
    }