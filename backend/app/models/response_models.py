from pydantic import BaseModel
from typing import List

class Source(BaseModel):
    page: int
    source: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]