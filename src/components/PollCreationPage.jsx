import React, { useState } from "react";
import { Plus, Trash2, Send } from "lucide-react";

const CyberpunkPollCreationPage = ({ onClose, onSubmit }) => {
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pollData = {
      title: pollTitle,
      description: pollDescription,
      options: options.filter((option) => option.trim() !== ""),
    };

    onSubmit(pollData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-black text-green-400 font-mono p-8 border-2 border-green-600 rounded-lg shadow-neon">
        <h2 className="text-2xl font-bold text-green-300 mb-4 glitch-text">
          Poll Uploaded to Blockchain
        </h2>
        <p className="text-green-500 mb-6 opacity-80">
          Data transmission complete. Poll synchronized across decentralized networks.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-green-600 text-black px-6 py-2 rounded-lg hover:bg-green-400 transition-all duration-300 cyber-button"
          >
            Create Another Poll
          </button>
          <button
            onClick={onClose}
            className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition-all duration-300 cyber-button"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8 text-green-400 font-mono">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg border-2 border-green-600 shadow-neon">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-300 glitch-text">
            Create New Poll
          </h1>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 cyber-button"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pollTitle" className="block mb-2 text-green-500">
              Poll Title
            </label>
            <input
              id="pollTitle"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              required
              className="w-full px-3 py-2 bg-black text-green-400 border-2 border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cyber-input"
              placeholder="Enter poll title"
            />
          </div>

          <div>
            <label
              htmlFor="pollDescription"
              className="block mb-2 text-green-500"
            >
              Poll Description
            </label>
            <textarea
              id="pollDescription"
              value={pollDescription}
              onChange={(e) => setPollDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 bg-black text-green-400 border-2 border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cyber-input"
              placeholder="Provide context for your poll"
            />
          </div>

          <div>
            <label className="block mb-2 text-green-500">
              Poll Options (2-5 options)
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  required
                  className="flex-grow px-3 py-2 bg-black text-green-400 border-2 border-green-600 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-green-400 cyber-input"
                  placeholder={`Option ${index + 1}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:bg-red-900 p-2 rounded-full cyber-button"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
            {options.length < 5 && (
              <button
                type="button"
                onClick={addOption}
                className="flex items-center text-green-500 hover:bg-green-900 px-3 py-2 rounded-lg cyber-button"
              >
                <Plus className="mr-2" /> Add Option
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-500 transition-all duration-300 flex items-center justify-center cyber-button"
          >
            <Send className="mr-2" /> Create Poll
          </button>
        </form>
      </div>

      <style jsx global>{`
        body {
          background-color: black;
        }
        .shadow-neon {
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 
                      0 0 20px rgba(0, 255, 0, 0.3), 
                      0 0 40px rgba(0, 255, 0, 0.2);
        }
        .cyber-input {
          transition: all 0.3s ease;
        }
        .cyber-input:focus {
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        .cyber-button {
          transition: all 0.3s ease;
        }
        .cyber-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        .glitch-text {
          position: relative;
          text-shadow: 
            0 0 10px rgba(0, 255, 0, 0.5),
            2px 2px rgba(0, 255, 0, 0.5),
            -2px -2px rgba(255, 0, 0, 0.5);
          animation: glitch 0.3s infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </div>
  );
};

export default CyberpunkPollCreationPage;