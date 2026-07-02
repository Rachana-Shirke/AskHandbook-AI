from langchain_community.document_loaders import PyPDFLoader


class DocumentService:

    def load_document(self, pdf_path):

        loader = PyPDFLoader(pdf_path)

        documents = loader.load()

        return documents