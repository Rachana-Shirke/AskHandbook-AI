from langchain_community.vectorstores import FAISS

class FAISSService:

    def create_index(self, chunks, embeddings):

        db = FAISS.from_documents(
            chunks,
            embeddings
        )

        db.save_local("vector_store")

        return db