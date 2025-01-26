import React, { useState } from "react";
import { History } from "lucide-react";

const CyberpunkVotingHistoryPage = ({ onClose, votingHistory, setVotingHistory }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-black min-h-screen p-8 text-green-400 font-mono">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg border-2 border-green-600 shadow-neon p-6">
        <div className="flex items-center mb-6">
          <History className="mr-3 text-green-400 glitch-icon" size={32} />
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-bold text-green-300 glitch-text">Voting Blockchain</h1>
            <button
              onClick={onClose}
              className="text-red-400 hover:text-red-600 cyber-button"
            >
              Close
            </button>
          </div>
        </div>

        {votingHistory.length === 0 ? (
          <div className="text-center text-green-500 py-8 opacity-70">
            No voting data synchronization found in network.
          </div>
        ) : (
          <div className="space-y-4">
            {votingHistory.map((entry) => (
              <div
                key={entry.id}
                className="bg-black p-4 rounded-lg border-2 border-green-800 hover:border-green-500 transition-all duration-300 cyber-option"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-green-300">{entry.pollTitle}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                      entry.pollStatus === "Completed"
                        ? "bg-green-900 text-green-400"
                        : "bg-yellow-900 text-yellow-400"
                    }`}
                  >
                    {entry.pollStatus}
                  </span>
                </div>
                <div className="text-green-500 mb-2">
                  <strong>Network Response:</strong> {entry.votedOption}
                </div>
                <div className="text-sm text-green-600">
                  Synchronized: {formatDate(entry.votedAt)}
                </div>
              </div>
            ))}
          </div>
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

export default CyberpunkVotingHistoryPage;