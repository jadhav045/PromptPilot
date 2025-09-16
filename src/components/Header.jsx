import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400"><Link to="/">AI Toolbox</Link></h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <Link to="https://github.com/atharvviit26/PromptPilot/tree/main" className="hover:text-indigo-400">Get Code</Link>
          {/* <Link to="/image-generator" className="hover:text-indigo-400">Image Generator</Link> */}
          {/* <Link to="/chatbot" className="hover:text-indigo-400">Chat Bot</Link> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
