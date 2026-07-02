from app.services.retriever_service import RetrieverService
from app.services.llm_service import LLMService


class RAGService:

    def __init__(self):
        self.retriever = None
        self.llm = LLMService()

        try:
            self.retriever = RetrieverService()
        except Exception as exc:
            print("Retriever initialization failed:", exc)

    def ask(self, question):
        if self.retriever is None:
            return (
                "The handbook assistant is currently unavailable.",
                []
            )

        docs = self.retriever.search(question)

        if len(docs) == 0:
            return (
                "No relevant information found.",
                []
            )

        context = "\n\n".join(
            [doc.page_content for doc in docs]
        )

        answer = self.llm.generate(
            context,
            question
        )

        if not answer or answer.startswith("I couldn't find"):
            if context:
                answer = context[:1200]

        return answer, docs