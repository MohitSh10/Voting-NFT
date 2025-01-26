import React, { useState, useEffect } from "react";
import { Clock, BarChart2, Vote } from "lucide-react";

const PollDetailsPage = ({ poll, onClose, onVote, viewMode = false }) => {
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
        setTimeRemaining("Ended");
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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BarChart2 className="mr-3 text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">{poll.title}</h1>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">{poll.description}</p>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Clock className="mr-2 text-gray-500" size={20} />
              <span
                className={`font-semibold ${
                  pollStatus === "Active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {pollStatus} • {timeRemaining}
              </span>
            </div>
            <div className="text-gray-600">Total Votes: {totalVotes}</div>
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
                className={`border rounded-lg p-4 flex items-center ${
                  !viewMode && selectedOption === option && !hasVoted
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
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
                    className="mr-3"
                  />
                )}
                <div className="flex-grow">
                  <span className="font-semibold">{option}</span>
                </div>
                <div className="text-right flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
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
            className={`w-full py-3 rounded-lg flex items-center justify-center ${
              selectedOption
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Vote className="mr-2" /> Submit Vote
          </button>
        )}
      </div>
    </div>
  );
};

export default PollDetailsPage;
