// frontend/src/api.js
const API_URL = "http://localhost:8000/api/v1/resumes"; // adjust if needed

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const analyzeResume = async (resumeId) => {
  const response = await fetch(`${API_URL}/resume/${resumeId}/analyze/`);
  return response.json();
};

