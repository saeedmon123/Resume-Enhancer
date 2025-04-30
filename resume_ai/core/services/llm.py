# core/services/llm.py

import os
import openai
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),  # store this in your .env
    base_url="https://openrouter.ai/api/v1",  # ✅ required for OpenRouter
)
def analyze_resume(text: str) -> str:
    prompt = f"Analyze the following resume:\n\n{text}\n\nReturn strengths, weaknesses, and suggestions."

    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",  # ✅ Corrected model name
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )

    return response.choices[0].message.content
