import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from typing import List, Dict


class FAISSVectorStore:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)
        self.index = None
        self.documents = []

    def create_embeddings(self, texts: List[str]) -> np.ndarray:
        return self.model.encode(texts, show_progress_bar=True)

    def build_index(self, chunked_docs: List[Dict]):
        texts = [doc["text"] for doc in chunked_docs]
        embeddings = self.create_embeddings(texts)

        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings)

        self.documents = chunked_docs

    def search(self, query: str, top_k: int = 3):
        query_embedding = self.model.encode([query])
        distances, indices = self.index.search(query_embedding, top_k)

        results = []
        for idx in indices[0]:
            results.append(self.documents[idx])

        return results
