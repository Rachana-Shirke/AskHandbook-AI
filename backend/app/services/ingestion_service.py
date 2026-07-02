import os

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS

try:
    from langchain_huggingface import HuggingFaceEmbeddings
except Exception as exc:  # pragma: no cover - environment-dependent
    HuggingFaceEmbeddings = None
    EMBEDDINGS_IMPORT_ERROR = exc
else:
    EMBEDDINGS_IMPORT_ERROR = None


class IngestionService:

    def __init__(self):
        self.embeddings = None
        self.load_error = None
        self._init_embeddings()

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

    def _init_embeddings(self):
        if HuggingFaceEmbeddings is None:
            self.load_error = EMBEDDINGS_IMPORT_ERROR or RuntimeError("Embeddings package is unavailable")
            print("Embeddings unavailable; indexing is disabled.")
            return

        try:
            self.embeddings = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )
        except Exception as exc:
            self.load_error = exc
            self.embeddings = None
            print("Embeddings initialization failed:", exc)

    def build_vector_store(self, uploads_folder="uploads"):

        documents = []

        for file in os.listdir(uploads_folder):

            if file.lower().endswith(".pdf"):

                pdf_path = os.path.join(uploads_folder, file)

                loader = PyPDFLoader(pdf_path)

                pages = loader.load()

                for idx, page in enumerate(pages):
                    page.metadata["source"] = file
                    page.metadata["page"] = idx + 1  # 1-indexed page number

                documents.extend(pages)

        if len(documents) == 0:
            raise Exception("No PDF files found.")

        if self.embeddings is None:
            os.makedirs("vector_store", exist_ok=True)
            return len(documents), 0

        chunks = self.splitter.split_documents(documents)

        # Ensure page metadata is preserved in chunks
        for chunk in chunks:
            if "page" not in chunk.metadata:
                chunk.metadata["page"] = chunk.metadata.get("page", 1)

        db = FAISS.from_documents(
            chunks,
            self.embeddings
        )

        os.makedirs("vector_store", exist_ok=True)

        db.save_local("vector_store")

        return len(documents), len(chunks)