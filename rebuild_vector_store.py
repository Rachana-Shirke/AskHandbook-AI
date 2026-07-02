#!/usr/bin/env python
import os
import sys

# Add the backend to the path
sys.path.insert(0, '/New folder/OneDrive/Desktop/Python Program/AskHandbook AI')

from backend.app.services.ingestion_service import IngestionService

# Rebuild the vector store
print("Rebuilding vector store with updated page metadata...")
try:
    service = IngestionService()
    pages, chunks = service.build_vector_store("uploads")
    print(f"✓ Vector store rebuilt successfully!")
    print(f"  - Total pages: {pages}")
    print(f"  - Total chunks: {chunks}")
except Exception as e:
    print(f"✗ Error rebuilding vector store: {e}")
    sys.exit(1)
