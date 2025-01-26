import React, { useState } from "react";
import { History } from "lucide-react";

const VotingHistoryPage = ({ onClose, votingHistory, setVotingHistory }) => {
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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <History className="mr-3 text-blue-600" size={32} />
          <div className="flex justify-between w-full items-center">
            <h1 className="text-3xl font-bold text-gray-800">Voting History</h1>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>

        {votingHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No voting history found.
          </div>
        ) : (
          <div className="space-y-4">
            {votingHistory.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{entry.pollTitle}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      entry.pollStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {entry.pollStatus}
                  </span>
                </div>
                <div className="text-gray-600 mb-2">
                  <strong>Your Vote:</strong> {entry.votedOption}
                </div>
                <div className="text-sm text-gray-500">
                  Voted on: {formatDate(entry.votedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingHistoryPage;
