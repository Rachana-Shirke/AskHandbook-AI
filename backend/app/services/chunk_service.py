from langchain_text_splitters import RecursiveCharacterTextSplitter


class ChunkService:

    def __init__(self):

        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150,
            separators=["\n\n", "\n", ".", " ", ""]
        )

    def split(self, documents):

        chunks = self.splitter.split_documents(documents)

        return chunks