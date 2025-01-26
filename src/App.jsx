import React, { useState } from "react";
import {
  Home,
  PieChart,
  Vote,
  Wallet,
  Shield,
  Lock,
  Globe,
  Cpu,
  ChevronDown,
  ChevronUp,
  Rocket,
} from "lucide-react";
import Dashboard from "./components/Dashboard";

const HomePage = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [expandedFAQs, setExpandedFAQs] = useState({});

  const platformFeatures = [
    {
      icon: <Shield className="text-blue-600" size={40} />,
      title: "Unparalleled Security",
      description: "Blockchain technology ensures absolute vote integrity",
      gradient: "from-blue-100 to-blue-300",
    },
    {
      icon: <Lock className="text-green-600" size={40} />,
      title: "Complete Privacy",
      description: "Anonymous voting with cryptographic proofs",
      gradient: "from-green-100 to-green-300",
    },
    {
      icon: <Globe className="text-purple-600" size={40} />,
      title: "Transparent Governance",
      description: "Every vote is publicly verifiable",
      gradient: "from-purple-100 to-purple-300",
    },
    {
      icon: <Cpu className="text-red-600" size={40} />,
      title: "Decentralized Infrastructure",
      description: "Distributed across multiple blockchain nodes",
      gradient: "from-red-100 to-red-300",
    },
  ];

  const faqs = [
    {
      question: "How does blockchain ensure voting security?",
      answer:
        "Blockchain creates an immutable, transparent record of votes. Each vote is cryptographically signed, preventing tampering or duplicate voting.",
    },
    {
      question: "What are the costs involved?",
      answer:
        "Minimal gas fees are required for vote submission. These fees cover blockchain transaction processing and are typically very low.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolute privacy is our priority. Votes are anonymized using advanced cryptographic techniques, ensuring your identity remains completely confidential.",
    },
    {
      question: "How are votes verified?",
      answer:
        "Each vote is validated through a consensus mechanism across multiple blockchain nodes, ensuring 100% transparency and eliminating the possibility of fraudulent votes.",
    },
    {
      question: "Can I trust the voting results?",
      answer:
        "Our platform provides end-to-end verifiability. Every voter can independently verify their vote was counted correctly without compromising anonymity.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PieChart className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Decentralized Polling Platform
            </h1>
          </div>
          <nav className="space-x-4">
            <button
              onClick={() => setActiveSection("about")}
              className={`hover:text-blue-600 flex items-center ${
                activeSection === "about" ? "text-blue-600" : ""
              }`}
            >
              <Home className="mr-2" size={20} /> About
            </button>
            <button
              onClick={() => setActiveSection("home")}
              className="group relative inline-flex items-center px-4 py-2 overflow-hidden rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              <Rocket className="mr-2 transition-transform group-hover:rotate-45" />
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Conditional Rendering for Sections */}
      {activeSection === "about" ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
          {/* Hero Section with Gradient */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-10 mb-16 shadow-2xl">
            <h1 className="text-4xl font-extrabold text-center mb-4">
              Decentralized Polling Platform
            </h1>
            <p className="text-xl text-center opacity-80">
              Revolutionizing democratic participation through blockchain
              technology
            </p>
          </div>

          {/* Platform Features with Gradient Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br h-1 ${feature.gradient} rounded-2xl p-6 transform transition hover:scale-105 hover:shadow-2xl`}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="ml-4 text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section with Soft Gradients */}
          <div className="max-w-2xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-md mb-4 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  {expandedFAQs[index] ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedFAQs[index] && (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Introduction Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Welcome to Decentralized Polling
              </h2>
              <p className="text-gray-600 mb-4">
                Our platform enables transparent and secure voting through
                blockchain technology. Every vote is immutable, verifiable, and
                completely tamper-proof.
              </p>
              <button
                onClick={handleConnectWallet}
                className={`w-full py-2 rounded-lg transition-colors duration-300 ${
                  walletConnected
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Wallet className="mr-2" />
                  {walletConnected ? "Wallet Connected" : "Connect Wallet"}
                </div>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">🔒 Secure Voting</h2>
                <p className="text-gray-600">
                  Blockchain ensures each vote is encrypted, anonymous, and
                  cannot be altered.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  📊 Transparent Results
                </h2>
                <p className="text-gray-600">
                  Real-time, verifiable poll results that anyone can audit.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 Decentralized Polling Platform
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
