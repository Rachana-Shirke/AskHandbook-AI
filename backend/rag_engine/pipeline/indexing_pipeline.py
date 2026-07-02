from rag_engine.document_loader.pdf_loader import PDFLoaderService
from rag_engine.preprocessing.text_splitter import TextSplitterService
from rag_engine.embeddings.embedding_service import EmbeddingService
from rag_engine.vector_store.faiss_service import FAISSService


class IndexingPipeline:

    def run(self, pdf_path):

        loader = PDFLoaderService()
        splitter = TextSplitterService()
        embedding = EmbeddingService()
        faiss = FAISSService()

        documents = loader.load(pdf_path)

        chunks = splitter.split(documents)

        model = embedding.load_model()

        faiss.create_index(chunks, model)

        return len(chunks)