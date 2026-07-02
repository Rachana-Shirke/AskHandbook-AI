from langchain_community.vectorstores import FAISS


class VectorService:

    def create_vector_db(
        self,
        chunks,
        embedding
    ):

        db = FAISS.from_documents(
            chunks,
            embedding
        )

        db.save_local("vector_store")

        return db

    def load_vector_db(
        self,
        embedding
    ):

        db = FAISS.load_local(
            "vector_store",
            embedding,
            allow_dangerous_deserialization=True
        )

        return db