from langchain_text_splitters import RecursiveCharacterTextSplitter

class TextSplitterService:

    def split(self, documents):

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150
        )

        chunks = splitter.split_documents(documents)

        return chunks