import sys
import os

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

from ingestion.parquet_loader import load_parquet_data
from preprocessing.text_chunker import create_documents, chunk_documents
from vector_db.faiss_store import FAISSVectorStore

# Load data
train_path = os.path.join(PROJECT_ROOT, "data", "banking_qa", "train.parquet")
df = load_parquet_data(train_path)

# Prepare documents
documents = create_documents(df[:50])
chunked_docs = chunk_documents(documents)

# Build vector store
vector_store = FAISSVectorStore()
vector_store.build_index(chunked_docs)

# Test query
query = "What RBI relaxations were given during COVID?"
results = vector_store.search(query)

print("\nTop Results:\n")
for r in results:
    print(r["text"][:300])
    print("-" * 80)
