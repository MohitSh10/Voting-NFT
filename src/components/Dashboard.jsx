import React, { useState } from "react";
import {
  PieChart,
  Home,
  Vote,
  Clock,
  CheckCircle,
  PlusCircle,
  Wallet,
  History,
} from "lucide-react";
import PollCreationPage from "./PollCreationPage";
import VotingHistoryPage from "./VotingHistoryPage";
import PollDetailsPage from "./PollDetailsPage";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [showVotingHistory, setShowVotingHistory] = useState(false);
  const [showPollDetails, setShowPollDetails] = useState(false);
  const [pollViewMode, setPollViewMode] = useState(false);

  const [votingHistory, setVotingHistory] = useState([
    {
      id: 1,
      pollTitle: "Best Blockchain Technology",
      votedOption: "Ethereum",
      votedAt: "2024-01-15T10:30:00Z",
      pollStatus: "Completed",
    },
    {
      id: 2,
      pollTitle: "Future of Decentralized Voting",
      votedOption: "Security",
      votedAt: "2024-01-20T14:45:00Z",
      pollStatus: "Completed",
    },
    {
      id: 3,
      pollTitle: "Crypto Investment Preferences",
      votedOption: "Long-term Hold",
      votedAt: "2024-02-01T09:15:00Z",
      pollStatus: "Completed",
    },
  ]);

  const [activePolls, setActivePolls] = useState([
    {
      id: 1,
      title: "Best Blockchain Technology",
      description: "Which blockchain platform do you prefer?",
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      options: ["Ethereum", "Solana", "Cardano", "Polkadot"],
      votes: {},
    },
    {
      id: 2,
      title: "Future of Decentralized Voting",
      description: "What's the most important feature for voting platforms?",
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      options: ["Security", "Transparency", "Accessibility", "Ease of Use"],
      votes: {},
    },
  ]);

  const [pastPolls, setPastPolls] = useState([
    {
      id: 3,
      title: "Crypto Investment Preferences",
      description: "Preferred crypto investment strategy",
      options: ["Long-term Hold", "Active Trading", "Staking", "Day Trading"],
      votes: {
        "Long-term Hold": 45,
        "Active Trading": 30,
        Staking: 15,
        "Day Trading": 10,
      },
    },
  ]);

  const addNewPoll = (newPoll) => {
    const pollWithId = {
      ...newPoll,
      id: activePolls.length + pastPolls.length + 1,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      votes: {},
    };
    setActivePolls([...activePolls, pollWithId]);
    setShowCreatePoll(false);
  };

  const handleVote = (pollId, selectedOption) => {
    const votedPoll = activePolls.find((poll) => poll.id === pollId);

    const newVotingHistoryEntry = {
      id: votingHistory.length + 1,
      pollTitle: votedPoll.title,
      votedOption: selectedOption,
      votedAt: new Date().toISOString(),
      pollStatus: "Completed",
    };

    setVotingHistory([...votingHistory, newVotingHistoryEntry]);

    setActivePolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === pollId) {
          const updatedVotes = {
            ...poll.votes,
            [selectedOption]: (poll.votes[selectedOption] || 0) + 1,
          };
          return { ...poll, votes: updatedVotes };
        }
        return poll;
      })
    );

    setShowPollDetails(false);
    setSelectedPoll(null);
  };

  const handleViewPollDetails = (poll) => {
    setSelectedPoll(poll);
    setShowPollDetails(true);
    setPollViewMode(true);
  };

  const handleVotePoll = (poll) => {
    setSelectedPoll(poll);
    setShowPollDetails(true);
    setPollViewMode(false);
  };

  if (showVotingHistory) {
    return (
      <VotingHistoryPage
        onClose={() => setShowVotingHistory(false)}
        votingHistory={votingHistory}
        setVotingHistory={setVotingHistory}
      />
    );
  }

  if (showCreatePoll) {
    return (
      <PollCreationPage
        onClose={() => setShowCreatePoll(false)}
        onSubmit={addNewPoll}
      />
    );
  }

  if (showPollDetails && selectedPoll) {
    return (
      <PollDetailsPage
        poll={selectedPoll}
        onClose={() => {
          setShowPollDetails(false);
          setSelectedPoll(null);
          setPollViewMode(false);
        }}
        onVote={handleVote}
        viewMode={pollViewMode}
      />
    );
  }

  const UserStats = () => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        {
          icon: <Wallet className="text-[#0096A0]" />,
          count: activePolls.length + pastPolls.length,
          title: "Polls Created",
          bgClass:
            "bg-gradient-to-br from-[#0c0c20] to-[#0096A0]/20 hover:bg-[#0096A0]/10",
        },
        {
          icon: <CheckCircle className="text-[#00ffff]" />,
          count: activePolls.reduce(
            (total, poll) =>
              total +
              Object.values(poll.votes || {}).reduce((a, b) => a + b, 0),
            0
          ),
          title: "Total Votes",
          bgClass:
            "bg-gradient-to-br from-[#0c0c20] to-[#00ffff]/20 hover:bg-[#00ffff]/10",
        },
        {
          icon: <Clock className="text-[#00ff00]" />,
          count: activePolls.length,
          title: "Active Polls",
          bgClass:
            "bg-gradient-to-br from-[#0c0c20] to-[#00ff00]/20 hover:bg-[#00ff00]/10",
        },
      ].map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgClass} p-4 rounded-lg shadow-md text-center hover:scale-105 transition-transform border border-[#8a2be2]/30`}
        >
          {stat.icon}
          <h3 className="font-bold text-xl mt-2 text-[#e0e0ff]">
            {stat.count}
          </h3>
          <p className="text-sm text-[#e0e0ff]/70">{stat.title}</p>
        </div>
      ))}
    </div>
  );

  const PollList = ({ polls, type, onViewDetails, onVote }) => (
    <div className="space-y-4">
      {polls.map((poll) => (
        <div
          key={poll.id}
          className="bg-[#0c0c20] rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow border border-[#0096A0]/30"
        >
          <h3 className="font-bold text-lg mb-2 text-[#00ffff]">
            {poll.title}
          </h3>
          <p className="text-[#e0e0ff]/70 mb-2">{poll.description}</p>

          {type === "active" && (
            <>
              <div className="text-sm text-[#e0e0ff]/50 mb-2">
                Ends: {poll.endDate}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewDetails(poll)}
                  className="w-full bg-[#C154C1] text-[#0c0c20] py-2 rounded-md hover:bg-[#0096A0]/80 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => onVote(poll)}
                  className="w-full bg-[#00ffff] text-[#0c0c20] py-2 rounded-md hover:bg-[#00ffff]/80 transition-colors"
                >
                  Vote
                </button>
              </div>
            </>
          )}

          {type === "past" && (
            <div className="mt-2">
              <h4 className="font-semibold mb-2 text-[#e0e0ff]">Results:</h4>
              {Object.entries(poll.votes || {}).map(([option, votes]) => {
                const totalVotes = Object.values(poll.votes || {}).reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage =
                  totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                return (
                  <div key={option} className="flex items-center mb-1">
                    <div className="w-full bg-[#06060f] rounded-full h-2.5 mr-2">
                      <div
                        className="bg-[#00ffff] h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#e0e0ff]/70">
                      {option}: {percentage}% ({votes} votes)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#06060f] text-[#e0e0ff] flex flex-col">
      <header className="bg-[#0c0c20] shadow-md border-b border-[#00ffff]/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <PieChart className="text-[#00ffff] animate-pulse" />
            <h1 className="text-2xl font-bold text-[#00ffff]">Dashboard</h1>
          </div>
          <nav className="space-x-4">
            <a
              href="/"
              className="hover:text-[#00ffff] flex items-center text-[#e0e0ff]"
            >
              <Home className="mr-2" size={20} /> Home
            </a>

            <button
              onClick={() => setShowVotingHistory(true)}
              className="hover:text-[#00ffff] flex items-center text-[#e0e0ff]"
            >
              <History className="mr-2" size={20} /> Voting History
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowCreatePoll(true)}
            className="bg-[#0096A0] text-[#0c0c20] px-4 py-2 rounded-md hover:bg-[#0096A0]/80 flex items-center"
          >
            <PlusCircle className="mr-2" /> Create New Poll
          </button>
        </div>

        <UserStats />

        <div className="mb-4 border-b border-[#8a2be2]/30 flex">
          {["active", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? "border-b-2 border-[#00ffff] text-[#00ffff]"
                  : "text-[#e0e0ff]/70"
              }`}
            >
              {tab === "active" ? "Active Polls" : "Past Polls"}
            </button>
          ))}
        </div>

        <PollList
          polls={activeTab === "active" ? activePolls : pastPolls}
          type={activeTab}
          onViewDetails={handleViewPollDetails}
          onVote={handleVotePoll}
        />
      </main>

      <footer className="bg-[#0c0c20] py-4 border-t border-[#00ffff]/20">
        <div className="container mx-auto px-4 text-center text-[#e0e0ff]/70">
          © 2024 Decentralized Polling Platform
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
