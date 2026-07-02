try:
    from langchain_huggingface import HuggingFaceEmbeddings
except Exception:  # pragma: no cover - environment-dependent
    HuggingFaceEmbeddings = None


class EmbeddingService:

    def __init__(self):
        self.embedding = None
        if HuggingFaceEmbeddings is not None:
            try:
                self.embedding = HuggingFaceEmbeddings(
                    model_name="sentence-transformers/all-MiniLM-L6-v2"
                )
            except Exception:
                self.embedding = None

    def get_embedding(self):
        return self.embedding