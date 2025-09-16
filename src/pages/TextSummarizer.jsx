import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export function TextSummarizer() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async (e) => {
    e.preventDefault();
    setSummary('');
    setError('');
    setLoading(true);
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        method: 'post',
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following text:\n\n${inputText}`
                }
              ]
            }
          ]
        }
      });

      const result = response.data.candidates[0].content.parts[0].text;
      setSummary(result);
      setInputText('');
    } catch (error) {
      console.error('Error:', error);
      setError('❌ Something went wrong while summarizing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400">📚 AI Text Summarizer</h1>
        <form onSubmit={handleSummarize} className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your long article, paragraph, or notes here..."
            rows={8}
            className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Summarize'}
          </button>
        </form>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {summary && (
          <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <h2 className="text-lg font-bold text-indigo-300 mb-2">🔍 Summary</h2>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-100">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
