import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "backend"))

from app.api import documents as documents_api


def test_delete_document_removes_file_and_returns_updated_list(tmp_path, monkeypatch):
    upload_dir = tmp_path / "uploads"
    upload_dir.mkdir()
    sample_file = upload_dir / "sample.pdf"
    sample_file.write_bytes(b"%PDF-1.4")

    monkeypatch.setattr(documents_api, "UPLOAD_FOLDER", str(upload_dir))
    monkeypatch.setattr(documents_api, "rebuild_vector_store", lambda folder: None)

    result = documents_api.delete_document("sample.pdf")

    assert not sample_file.exists()
    assert result["status"] == "success"
    assert result["documents"] == []
