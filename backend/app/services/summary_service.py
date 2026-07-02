class SummaryService:
    def __init__(self):
        self.default_summary = "Upload handbook documents to generate a summary."

    def summarize(self, text: str | None = None) -> str:
        if not text:
            return self.default_summary
        return text[:500].strip() if len(text) > 500 else text.strip()
