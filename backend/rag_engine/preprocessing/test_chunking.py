import sys
import os

# Add project root to path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

from ingestion.parquet_loader import load_parquet_data
from preprocessing.text_chunker import create_documents, chunk_documents

# Load parquet data
train_path = os.path.join(PROJECT_ROOT, "data", "banking_qa", "train.parquet")
df = load_parquet_data(train_path)

# Create documents
documents = create_documents(df[:5])

# Chunk documents
chunked_docs = chunk_documents(documents)

print(f"Original documents: {len(documents)}")
print(f"Chunked documents: {len(chunked_docs)}\n")

print("Sample chunk:\n")
print(chunked_docs[0]["text"])
print("\nMetadata:")
print(chunked_docs[0]["metadata"])
