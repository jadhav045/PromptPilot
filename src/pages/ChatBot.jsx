import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function ChatBot() {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('Enter a question to get started.');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer('⏳ Thinking...');
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (err) {
      setAnswer('❌ Something went wrong!');
      console.error(err);
    }
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8 text-white space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400">🧠 AI ChatBot</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Ask me anything..."
            className="w-full p-4 text-white bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold text-lg"
          >
            🔍 Get Response
          </button>
        </form>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-400 mb-2">AI Response</label>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
