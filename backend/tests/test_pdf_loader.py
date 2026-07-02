import os

from rag_engine.document_loader.pdf_loader import PDFLoader

loader = PDFLoader()

pdf_path = os.path.join(
    "uploads",
    "Employee_Handbook.pdf"
)

text = loader.load_pdf(pdf_path)

print(text[:1000])