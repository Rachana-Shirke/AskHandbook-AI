from app.services.rag_service import RAGService


class ChatService:

    def __init__(self):
        self.rag = None

        try:
            self.rag = RAGService()
        except Exception as exc:
            print("RAG initialization failed:", exc)

    def ask(self, question):

        if self.rag is None:
            return {
                "answer": "The handbook assistant is currently unavailable. Please try again later.",
                "sources": []
            }

        try:

            answer, docs = self.rag.ask(question)

            sources = []

            for doc in docs:
                sources.append(
                    {
                        "page": doc.metadata.get("page", 0),
                        "source": doc.metadata.get("source", "Unknown")
                    }
                )

            return {
                "answer": answer,
                "sources": sources
            }

        except Exception as e:

            print("ERROR:", e)

            return {
                "answer": f"Error: {str(e)}",
                "sources": []
            }