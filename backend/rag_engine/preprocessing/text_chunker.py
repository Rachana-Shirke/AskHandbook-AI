import pandas as pd
from typing import List, Dict

def create_documents(df: pd.DataFrame) -> List[Dict]:
    """
    Convert structured banking rows into text documents
    suitable for RAG pipelines.
    """

    documents = []

    for _, row in df.iterrows():
        content = f"""
        Question:
        {row.get('question', '')}

        Answer:
        {row.get('answer', '')}

        Regulation Area:
        {row.get('regulation_area', '')}

        Key Topics:
        {row.get('key_topics', '')}
        """

        documents.append({
            "text": content.strip(),
            "metadata": {
                "source": row.get("filename", ""),
                "category": row.get("category", ""),
                "difficulty": row.get("estimated_difficulty", "")
            }
        })

    return documents


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50):
    """
    Split text into overlapping chunks.
    """
    words = text.split()
    chunks = []

    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def chunk_documents(documents: List[Dict]) -> List[Dict]:
    """
    Chunk each document into smaller pieces.
    """
    chunked_docs = []

    for doc in documents:
        chunks = chunk_text(doc["text"])
        for i, chunk in enumerate(chunks):
            chunked_docs.append({
                "text": chunk,
                "metadata": {
                    **doc["metadata"],
                    "chunk_id": i
                }
            })

    return chunked_docs
