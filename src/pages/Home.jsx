
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-gray-100 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900">
      {/* Hero Section */}
      {console.log('Jai Maharashtra')}
      <section className="pt-20 pb-15 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-indigo-400">AI Toolbox</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
          Your all-in-one platform for AI-powered tools: chat, text summarization, image generation, 
          and more—to supercharge your creativity.
        </p>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 pb-20">
        {[
          {
            title: 'Summarizer',
            desc: 'Paste any long text and get a concise summary in seconds.',
            to: '/summarizer',
          },
          {
            title: 'Image Generator',
            desc: 'Describe your idea and watch AI transform it into a unique image.',
            to: '/image-generator',
          },
          {
            title: 'Chat Bot',
            desc: 'An AI companion to answer questions, help code, or brainstorm.',
            to: '/chatbot',
          },
        ].map((feature) => (
          <Link
            key={feature.title}
            to={feature.to}
            className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl p-6 flex flex-col gap-4"
          >
            <h3 className="text-2xl font-semibold text-indigo-300">{feature.title}</h3>
            <p className="text-gray-400 flex-grow">{feature.desc}</p>
            <span className="self-start bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-4 rounded-lg text-sm">
              Try it now
            </span>
          </Link>
        ))}
      </section>

      {/* About Section */}
      <section className="bg-gray-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-400 mb-4">Why AI Toolbox?</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Designed to bring powerful AI features under one roof. Whether you need to summarize text,
            generate creative images, or get intelligent answers, AI Toolbox makes it simple and fast.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to start?</h2>
        <Link
          to="/chatbot"
          className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-lg font-medium rounded-lg transition"
        >
          Explore the Chat Bot
        </Link>
      </section>
    </div>
  );
}
