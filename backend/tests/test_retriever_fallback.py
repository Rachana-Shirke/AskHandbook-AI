from app.services.retriever_service import RetrieverService


def test_retriever_falls_back_to_pdf_text_when_embeddings_are_unavailable(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)

    uploads_dir = tmp_path / "uploads"
    uploads_dir.mkdir()

    pdf_path = uploads_dir / "handbook.pdf"
    pdf_bytes = b"""%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 53 >>
stream
BT /F1 12 Tf 50 100 Td (Employee handbook: remote work policy allows flexible scheduling.) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000062 00000 n 
0000000119 00000 n 
0000000207 00000 n 
0000000305 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF
"""
    pdf_path.write_bytes(pdf_bytes)

    service = RetrieverService()
    docs = service.search("remote work policy")

    assert docs
    assert any("remote work" in doc.page_content.lower() for doc in docs)
