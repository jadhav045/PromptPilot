import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import {TextSummarizer} from './pages/TextSummarizer';
import ImageGenerator from './pages/ImageGenerator';
import ChatBot from './pages/ChatBot';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-950 text-white">
        <Header />
        <main className="flex-grow px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summarizer" element={<TextSummarizer />} />
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/chatbot" element={<ChatBot />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
