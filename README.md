# AI Resume Enhancer

An AI-powered web application that analyzes PDF resumes and returns structured, actionable feedback: **strengths**, **weaknesses** and **suggestions for improvement**.

Upload a CV, and within seconds the app extracts its text, sends it to a large language model, and displays a clear, sectioned analysis to help job seekers improve the quality and impact of their resume.

---

## Features

- **PDF upload**: upload any resume in PDF format
- **Automatic text extraction** with PyMuPDF
- **AI analysis** via GPT-3.5 (through OpenRouter) that identifies:
  - ✅ Strengths: the strongest parts of the resume
  - ⚠️ Weaknesses: areas that could hurt hiring potential
  - 💡 Suggestions: concrete improvements for impact and clarity
- **Clean, responsive UI** built with React and Tailwind CSS
- **REST API** with automatic interactive documentation (Swagger UI)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS |
| Backend | Python, Django, Django Ninja |
| AI | OpenAI SDK + OpenRouter (GPT-3.5 Turbo) |
| PDF processing | PyMuPDF (fitz), ReportLab |
| Database | SQLite (development) |

---

## How It Works

```
PDF upload ──► Django Ninja API ──► Text extraction (PyMuPDF)
                                            │
                                            ▼
React UI  ◄── Structured feedback ◄── LLM analysis (GPT-3.5 via OpenRouter)
```

1. The user uploads a PDF from the React frontend.
2. The backend parses the PDF, extracts its text and stores it.
3. The text is sent to the language model with a prompt asking for strengths, weaknesses and suggestions.
4. The structured result is returned to the frontend and displayed by section.

---

## Project Structure

```
Resume-Enhancer/
├── frontend/                 # React + Vite + Tailwind CSS client
│   └── src/
│       ├── App.jsx           # Main UI
│       └── api.js            # Calls to the backend API
└── resume_ai/                # Django backend
    ├── core/
    │   ├── api.py            # API endpoints (Django Ninja)
    │   ├── models.py         # Resume model
    │   └── services/llm.py   # LLM integration (OpenRouter)
    ├── resume_ai/            # Project settings and URLs
    └── manage.py
```

---

## API Endpoints

Base URL: `http://localhost:8000/api/v1/resumes`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload/` | Upload a PDF resume and extract its text |
| `GET` | `/resume/{resume_id}/analyze/` | Run the AI analysis on an uploaded resume |

Interactive docs: http://localhost:8000/api/docs

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- An [OpenRouter](https://openrouter.ai/) API key

### 1. Clone the repository

```bash
git clone https://github.com/saeedmon123/Resume-Enhancer.git
cd Resume-Enhancer
```

### 2. Backend setup

```bash
cd resume_ai
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install django django-ninja django-cors-headers python-dotenv openai pymupdf reportlab
```

Create a `.env` file inside `resume_ai/`:

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Run the server:

```bash
python manage.py migrate
python manage.py runserver
```

### 3. Frontend setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

---

## Future Improvements

- Interactive, in-place edit suggestions
- Resume scoring
- Job-specific optimization (compare a resume against a job description)

---

## Author

**Mohamad Said Monawar**
[GitHub](https://github.com/saeedmon123) · [LinkedIn](https://www.linkedin.com/in/mohamad-said-monawar-7a1145292/)
