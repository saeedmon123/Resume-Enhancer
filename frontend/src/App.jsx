import { useState } from "react";
import { uploadResume, analyzeResume } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [resumeId, setResumeId] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const uploadResult = await uploadResume(file);
      setResumeId(uploadResult.id); // ✅ save it to state
      const analyzeResult = await analyzeResume(uploadResult.id);
      setAnalysis(analyzeResult.analysis);
    } catch (error) {
      console.error("Error analyzing resume:", error);
    }
    setLoading(false);
  };


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">AI Resume Enhancer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
      />

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed
                   text-white px-6 py-2 rounded-md shadow-md transition-all"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {loading && (
        <div className="mt-4 text-blue-500 animate-pulse text-sm">Please wait, analyzing your resume...</div>
      )}

      {analysis && !loading && (
  <div className="mt-10 w-full max-w-4xl space-y-6 animate-fadeIn">
  <h2 className="text-2xl font-semibold text-gray-800 text-center">Analysis</h2>

  {["Strengths", "Weaknesses", "Suggestions"].map((section) => {
    const sectionRegex = new RegExp(`${section}:\\s*([\\s\\S]*?)(?=\\n\\w+:|$)`, "g");
    const sectionMatch = analysis.match(sectionRegex);
    const content = sectionMatch?.[0]?.replace(`${section}:`, "").trim() || "";

    const itemRegex = /\d+\.\s+([\s\S]*?)(?=\n\d+\.|\n*$)/g;
    const items = [...content.matchAll(itemRegex)].map((m) => m[1].trim().replace(/\n/g, " "));

    const iconMap = {
      Strengths: "✅",
      Weaknesses: "⚠️",
      Suggestions: "💡",
    };
    const colorMap = {
      Strengths: "green",
      Weaknesses: "yellow",
      Suggestions: "blue",
    };

    // Highlight tech keywords
    const highlightKeywords = (text) => {
      const keywords = ["Python", "Django", "JavaScript", "React", "Excel", "PowerPoint", "Google Drive", "API", "backend", "frontend"];
      const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
      return text.replace(regex, (match) => `<span class="text-${colorMap[section]}-600 font-semibold">${match}</span>`);
    };

    return (
      <div key={section} className="bg-white border border-gray-200 rounded-xl p-5 shadow transition-all duration-300">
        <h3 className={`text-lg font-bold flex items-center gap-2 text-${colorMap[section]}-700`}>
          <span>{iconMap[section]}</span>
          {section}
        </h3>
        <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: highlightKeywords(item) }} />
          ))}
        </ul>
      </div>
    );
  })}
</div>
   
      )}

   
    </div>
  );
}

export default App;
