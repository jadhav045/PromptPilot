import { useState } from 'react';
import axios from 'axios';

const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl('');
    setError('');

    try {
      const response = await axios.post(
        'https://router.huggingface.co/nebius/v1/images/generations',
        {
          model: 'black-forest-labs/flux-dev',
          response_format: 'b64_json',
          prompt: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const imageBase64 = response.data.data[0].b64_json;
      setImageUrl(`data:image/png;base64,${imageBase64}`);
    } catch (err) {
      console.error(err);
      setError('❌ Image generation failed.');
    }

    setLoading(false);
  };

  // ✅ Download function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8 text-white space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-400">🎨 AI Image Generator</h1>
        <form onSubmit={handleGenerate} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Describe your image idea in detail..."
            className="w-full p-4 text-white bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold text-lg disabled:opacity-50"
          >
            {loading ? '✨ Generating...' : 'Generate Image'}
          </button>
        </form>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {imageUrl && (
          <div className="mt-6 space-y-4">
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full rounded-lg shadow-xl border border-gray-700"
            />
            <button
              onClick={handleDownload}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
            >
              ⬇️ Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;
