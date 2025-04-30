# core/api.py
from ninja import Router, File
from ninja.files import UploadedFile
from .models import *
import fitz  # PyMuPDF
from .services.llm import analyze_resume
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO
from django.http import FileResponse, Http404
router = Router()

@router.post("/upload/")
def upload_resume(request, file: UploadedFile = File(...)):
    # Read the file into memory
    file_bytes = file.read()

    # Parse the PDF using PyMuPDF (fitz)
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = "\n".join([page.get_text() for page in doc])

    # Save file and content to DB
    resume = Resume.objects.create(
        file=file,
        content=text
    )

    return {"id": resume.id, "message": "Resume uploaded and parsed."}


# core/api.py (continued)
@router.get("/resume/{resume_id}/analyze/")
def analyze(request, resume_id: int):
    resume = Resume.objects.get(id=resume_id)
    result = analyze_resume(resume.content)
    return {"analysis": result}



def extract_section(analysis: str, header: str):
    import re
    match = re.search(f"{header}:\\s*(.*?)(\\n\\w+:|$)", analysis, re.DOTALL)
    if match:
        lines = match.group(1).strip().split("\n")
        return [line.strip() for line in lines if line.strip()]
    return []
