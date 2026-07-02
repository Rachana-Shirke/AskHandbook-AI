from langchain_community.embeddings import HuggingFaceEmbeddings

class EmbeddingService:

    def load_model(self):

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        return embeddings