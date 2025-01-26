import React, { useState } from "react";
import { Shield, Lock, Globe, Cpu, ChevronDown, ChevronUp } from "lucide-react";

const AboutPage = () => {
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
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      {/* Hero Section with Gradient */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-10 mb-16 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-4">
          Decentralized Polling Platform
        </h1>
        <p className="text-xl text-center opacity-80">
          Revolutionizing democratic participation through blockchain technology
        </p>
      </div>

      {/* Platform Features with Gradient Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {platformFeatures.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 transform transition hover:scale-105 hover:shadow-2xl`}
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
  );
};

export default AboutPage;
