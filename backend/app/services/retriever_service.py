import os
from pathlib import Path

from langchain_community.vectorstores import FAISS
from pypdf import PdfReader

try:
    from langchain_huggingface import HuggingFaceEmbeddings
except Exception as exc:  # pragma: no cover - environment-dependent
    HuggingFaceEmbeddings = None
    EMBEDDINGS_IMPORT_ERROR = exc
else:
    EMBEDDINGS_IMPORT_ERROR = None


class RetrieverService:

    def __init__(self):
        self.embeddings = None
        self.load_error = None
        self._init_embeddings()

    def _init_embeddings(self):
        if HuggingFaceEmbeddings is None:
            self.load_error = EMBEDDINGS_IMPORT_ERROR or RuntimeError("Embeddings package is unavailable")
            print("Embeddings unavailable; semantic search is disabled.")
            return

        try:
            self.embeddings = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )
        except Exception as exc:
            self.load_error = exc
            self.embeddings = None
            print("Embeddings initialization failed:", exc)

    def _fallback_search(self, question):
        search_roots = [Path("uploads"), Path("backend/uploads"), Path(".")]
        candidates = []

        for root in search_roots:
            if not root.exists():
                continue
            for path in root.rglob("*.pdf"):
                candidates.append(path)

        docs = []
        for pdf_path in candidates:
            try:
                reader = PdfReader(str(pdf_path))
                text_parts = []
                for page in reader.pages:
                    text = page.extract_text() or ""
                    if text:
                        text_parts.append(text)
                combined = "\n".join(text_parts)
                if combined and question.lower() in combined.lower():
                    docs.append(type("Document", (), {"page_content": combined, "metadata": {"source": pdf_path.name, "page": 1}})())
            except Exception:
                continue

        if docs:
            return docs

        for pdf_path in candidates:
            try:
                reader = PdfReader(str(pdf_path))
                text_parts = []
                for page in reader.pages:
                    text = page.extract_text() or ""
                    if text:
                        text_parts.append(text)
                combined = "\n".join(text_parts)
                if combined:
                    docs.append(type("Document", (), {"page_content": combined, "metadata": {"source": pdf_path.name, "page": 1}})())
            except Exception:
                continue

        return docs

    def search(self, question):
        if self.embeddings is None:
            return self._fallback_search(question)

        if not os.path.exists("vector_store/index.faiss"):
            raise FileNotFoundError(
                "No handbook has been indexed yet. Please upload a handbook first."
            )

        db = FAISS.load_local(
            "vector_store",
            self.embeddings,
            allow_dangerous_deserialization=True
        )

        docs = db.similarity_search(
            question,
            k=3
        )

        return docs