import os

try:
    from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
except Exception as exc:  # pragma: no cover - environment-dependent
    AutoTokenizer = None
    AutoModelForSeq2SeqLM = None
    TRANSFORMERS_IMPORT_ERROR = exc
else:
    TRANSFORMERS_IMPORT_ERROR = None


class LLMService:

    def __init__(self):
        self.model_name = "google/flan-t5-base"
        self.tokenizer = None
        self.model = None
        self.load_error = None
        self._load_model()

    def _load_model(self):
        if AutoTokenizer is None or AutoModelForSeq2SeqLM is None:
            self.load_error = TRANSFORMERS_IMPORT_ERROR or RuntimeError("Transformers is unavailable")
            print("Transformers unavailable; using fallback response generation.")
            return

        try:
            print("Loading Local LLM...")
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
            self.model = AutoModelForSeq2SeqLM.from_pretrained(self.model_name)
            print("LLM Loaded Successfully")
        except Exception as exc:  # pragma: no cover - environment-dependent
            self.load_error = exc
            self.tokenizer = None
            self.model = None
            print(f"LLM load failed, using fallback response generation: {exc}")

    def _fallback_generate(self, context, question):
        context_text = (context or "").strip()
        question_text = (question or "").strip()

        if not context_text:
            return "I couldn't find this information in the handbook."

        if question_text and question_text.lower() in context_text.lower():
            return context_text[:280]

        sentences = [segment.strip() for segment in context_text.replace("\n", " ").split(".") if segment.strip()]
        if sentences:
            return sentences[0][:280]

        return "I couldn't find this information in the handbook."

    def generate(self, context, question):
        if self.model is None or self.tokenizer is None:
            return self._fallback_generate(context, question)

        prompt = f"""
You are a concise employee handbook assistant.

Use ONLY the information provided in the context.
Answer the question briefly in 1-3 short sentences.
If the answer is not available in the context, reply exactly:
"I couldn't find this information in the handbook."
Do not include unrelated text, tables, or long explanations.

Question:
{question}

Context:
{context}

Answer:
"""

        max_input_length = min(self.tokenizer.model_max_length, 1024)

        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            truncation=True,
            max_length=max_input_length
        )

        outputs = self.model.generate(
            **inputs,
            max_new_tokens=80,
            temperature=0.2,
            num_beams=4,
            do_sample=False
        )

        answer = self.tokenizer.decode(
            outputs[0],
            skip_special_tokens=True
        )

        return answer