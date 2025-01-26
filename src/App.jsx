import React, { useState } from "react";
import {
  Home,
  PieChart,
  Wallet,
  Shield,
  Lock,
  Globe,
  Cpu,
  ChevronDown,
  ChevronUp,
  Rocket,
  MessageCircle,
  Send,
  X
} from "lucide-react";
import Dashboard from "./components/Dashboard";

const HomePage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [expandedFAQs, setExpandedFAQs] = useState({});
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const platformFeatures = [
    {
      icon: <Shield className="text-[#00ffff]" size={40} />,
      title: "Unparalleled Security",
      description: "Blockchain technology ensures absolute vote integrity",
      bgClass: "bg-gradient-to-br from-[#0c0c20] to-[#00ffff]/20 hover:bg-[#00ffff]/10"
    },
    {
      icon: <Lock className="text-[#ff00ff]" size={40} />,
      title: "Complete Privacy",
      description: "Anonymous voting with cryptographic proofs",
      bgClass: "bg-gradient-to-br from-[#0c0c20] to-[#ff00ff]/20 hover:bg-[#ff00ff]/10"
    },
    {
      icon: <Globe className="text-[#00ff00]" size={40} />,
      title: "Transparent Governance",
      description: "Every vote is publicly verifiable",
      bgClass: "bg-gradient-to-br from-[#0c0c20] to-[#00ff00]/20 hover:bg-[#00ff00]/10"
    },
    {
      icon: <Cpu className="text-[#8a2be2]" size={40} />,
      title: "Decentralized Infrastructure",
      description: "Distributed across multiple blockchain nodes",
      bgClass: "bg-gradient-to-br from-[#0c0c20] to-[#8a2be2]/20 hover:bg-[#8a2be2]/10"
    },
  ];

  const faqs = [
    {
      question: "How does blockchain ensure voting security?",
      answer: "Blockchain creates an immutable, transparent record of votes. Each vote is cryptographically signed, preventing tampering or duplicate voting.",
    },
    {
      question: "What are the costs involved?",
      answer: "Minimal gas fees are required for vote submission. These fees cover blockchain transaction processing and are typically very low.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Absolute privacy is our priority. Votes are anonymized using advanced cryptographic techniques, ensuring your identity remains completely confidential.",
    },
    {
      question: "How are votes verified?",
      answer: "Each vote is validated through a consensus mechanism across multiple blockchain nodes, ensuring 100% transparency and eliminating the possibility of fraudulent votes.",
    },
    {
      question: "Can I trust the voting results?",
      answer: "Our platform provides end-to-end verifiability. Every voter can independently verify their vote was counted correctly without compromising anonymity.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSupportFormChange = (e) => {
    const { name, value } = e.target;
    setSupportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    console.log('Support form submitted:', supportForm);
    alert('Message sent successfully!');
    setSupportForm({ name: '', email: '', message: '' });
    setShowSupportModal(false);
  };

  const handleConnectWallet = async () => {
    try {
      setWalletConnected(true);
    } catch (error) {
      console.error("Wallet connection failed", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  if (walletConnected) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-[#06060f] text-[#e0e0ff] font-mono">
      {/* Header */}
      <header className="bg-[#0c0c20] shadow-lg border-b border-[#00ffff]/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PieChart className="text-[#00ffff] animate-pulse" />
            <h1 className="text-2xl font-bold text-[#00ffff]">
              Decentralized Polling Platform
            </h1>
          </div>
          <nav className="space-x-4">
            <button
              onClick={() => setActiveSection("about")}
              className={`hover:text-[#00ffff] flex items-center transition-all duration-300 ${
                activeSection === "about" ? "text-[#00ffff]" : "text-[#e0e0ff]"
              }`}
            >
              <Home className="mr-2" size={20} /> About
            </button>
            <button
              onClick={() => setActiveSection("home")}
              className="group relative inline-flex items-center px-4 py-2 overflow-hidden rounded-lg bg-[#ff00ff] text-[#0c0c20] hover:bg-[#ff00ff]/80 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Rocket className="mr-2 transition-transform group-hover:rotate-45" />
              <span className="relative z-10">Get Started</span>
            </button>
          </nav>
        </div>
      </header>

      {/* About Section */}
      {activeSection === "about" ? (
        <div className="min-h-screen bg-[#06060f] py-12 px-4 relative overflow-hidden">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#00ffff]/30 via-[#ff00ff]/30 to-[#8a2be2]/30 text-[#e0e0ff] rounded-2xl p-10 mb-16 shadow-lg">
            <h1 className="text-4xl font-extrabold text-center mb-4 text-[#00ffff]">
              Decentralized Polling Platform
            </h1>
            <p className="text-xl text-center opacity-80">
              Revolutionizing democratic participation through blockchain technology
            </p>
          </div>

          {/* Platform Features */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgClass} rounded-2xl p-6 transform transition hover:scale-105 border border-[#00ffff]/20`}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="ml-4 text-xl font-semibold text-[#e0e0ff]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[#e0e0ff]/80">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-2xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-[#00ffff]">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#0c0c20] rounded-2xl shadow-lg mb-4 overflow-hidden border border-[#8a2be2]/30"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-[#06060f] transition"
                >
                  <span className="font-semibold text-[#e0e0ff]">
                    {faq.question}
                  </span>
                  {expandedFAQs[index] ? 
                    <ChevronUp className="text-[#00ffff]" /> : 
                    <ChevronDown className="text-[#00ffff]" />
                  }
                </button>
                {expandedFAQs[index] && (
                  <div className="p-4 bg-[#06060f] text-[#e0e0ff]/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 py-8 flex-grow bg-[#06060f]">
          {/* Home Section Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#0c0c20] rounded-lg p-6 border border-[#ff00ff]/30">
              <h2 className="text-xl font-semibold mb-4 text-[#00ffff]">
                Welcome to Decentralized Polling
              </h2>
              <p className="text-[#e0e0ff]/70 mb-4">
                Our platform enables transparent and secure voting through blockchain technology.
              </p>
              <button
                onClick={handleConnectWallet}
                className={`w-full py-2 rounded-lg transition-colors duration-300 ${
                  walletConnected
                    ? "bg-[#00ff00] text-[#0c0c20]"
                    : "bg-[#ff00ff] text-[#0c0c20] hover:bg-[#ff00ff]/80"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Wallet className="mr-2" />
                  {walletConnected ? "Wallet Connected" : "Connect Wallet"}
                </div>
              </button>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-[#0c0c20] py-4 border-t border-[#00ffff]/20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-[#e0e0ff]/70">
            © 2024 Decentralized Polling Platform
          </div>
          <button 
            onClick={() => setShowSupportModal(true)}
            className="bg-[#ff00ff] text-[#0c0c20] px-4 py-2 rounded-lg hover:bg-[#ff00ff]/80 flex items-center"
          >
            <MessageCircle className="mr-2" /> Contact Support
          </button>
        </div>
      </footer>

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-[#0c0c20] rounded-lg p-6 w-full max-w-md mx-4 border border-[#00ffff]/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center text-[#00ffff]">
                <MessageCircle className="mr-3 text-[#00ffff]" /> Contact Support
              </h2>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="text-[#e0e0ff] hover:text-[#00ffff]"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label className="block text-[#e0e0ff]/70 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={supportForm.name}
                  onChange={handleSupportFormChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-3 py-2 bg-[#06060f] border border-[#ff00ff]/30 rounded-lg focus:border-[#ff00ff] text-[#e0e0ff]"
                />
              </div>

              <div>
                <label className="block text-[#e0e0ff]/70 font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={supportForm.email}
                  onChange={handleSupportFormChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-3 py-2 bg-[#06060f] border border-[#ff00ff]/30 rounded-lg focus:border-[#ff00ff] text-[#e0e0ff]"
                />
              </div>

              <div>
                <label className="block text-[#e0e0ff]/70 font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={supportForm.message}
                  onChange={handleSupportFormChange}
                  placeholder="Your message or support request"
                  required
                  rows="4"
                  className="w-full px-3 py-2 bg-[#06060f] border border-[#ff00ff]/30 rounded-lg focus:border-[#ff00ff] text-[#e0e0ff]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff00ff] text-[#0c0c20] py-3 rounded-lg hover:bg-[#ff00ff]/80 transition-colors flex items-center justify-center"
              >
                <Send className="mr-2" /> Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;