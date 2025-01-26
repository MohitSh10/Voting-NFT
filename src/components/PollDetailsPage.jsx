import React, { useState, useEffect } from "react";
import { Clock, BarChart2, Vote } from "lucide-react";

const CyberpunkPollDetailsPage = ({ poll, onClose, onVote, viewMode = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [pollStatus, setPollStatus] = useState("Active");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const endDate = new Date(poll.endDate);
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setTimeRemaining(`${days}d ${hours}h`);
        setPollStatus("Active");
      } else {
        setTimeRemaining("Terminated");
        setPollStatus("Closed");
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000);

    return () => clearInterval(timer);
  }, [poll]);

  const handleVote = () => {
    if (selectedOption && !hasVoted && pollStatus === "Active" && !viewMode) {
      onVote(poll.id, selectedOption);
      setHasVoted(true);
    }
  };

  const calculateTotalVotes = () => {
    return poll.votes
      ? Object.values(poll.votes).reduce((a, b) => a + b, 0)
      : 0;
  };

  const totalVotes = calculateTotalVotes();

  return (
    <div className="bg-black min-h-screen p-8 text-green-400 font-mono">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-lg border-2 border-green-600 shadow-neon p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BarChart2 className="mr-3 text-green-400 glitch-icon" size={32} />
            <h1 className="text-3xl font-bold text-green-300 glitch-text">{poll.title}</h1>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 cyber-button"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          <p className="text-green-500 mb-4 opacity-80">{poll.description}</p>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Clock className="mr-2 text-green-500" size={20} />
              <span
                className={`font-semibold ${
                  pollStatus === "Active" ? "text-green-400" : "text-red-500"
                }`}
              >
                {pollStatus} • {timeRemaining}
              </span>
            </div>
            <div className="text-green-500">Total Votes: {totalVotes}</div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {poll.options.map((option) => {
            const votes = poll.votes?.[option] || 0;
            const percentage =
              totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

            return (
              <div
                key={option}
                className={`border-2 rounded-lg p-4 flex items-center transition-all duration-300 cyber-option ${
                  !viewMode && selectedOption === option && !hasVoted
                    ? "border-green-500 bg-green-900/30"
                    : "border-green-800 hover:bg-green-900/20"
                }`}
                onClick={() => {
                  if (!viewMode && !hasVoted) {
                    setSelectedOption(option);
                  }
                }}
              >
                {!viewMode && !hasVoted && (
                  <input
                    type="radio"
                    name="poll-option"
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="mr-3 cyber-radio"
                  />
                )}
                <div className="flex-grow">
                  <span className="font-semibold text-green-300">{option}</span>
                </div>
                <div className="text-right flex items-center space-x-4">
                  <div className="w-32 bg-green-900 rounded-full h-2.5">
                    <div
                      className="bg-green-400 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-green-500">
                    {votes} votes ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {!viewMode && !hasVoted && pollStatus === "Active" && (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className={`w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 cyber-button ${
              selectedOption
                ? "bg-purple-700 text-white hover:bg-purple-500"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Vote className="mr-2" /> Submit Vote
          </button>
        )}
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
        .cyber-option {
          transition: all 0.3s ease;
        }
        .cyber-option:hover {
          transform: scale(1.02);
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
        .glitch-icon {
          animation: glitch 0.3s infinite;
        }
        .cyber-radio {
          accent-color: #10b981;
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

export default CyberpunkPollDetailsPage;