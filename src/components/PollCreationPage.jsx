import React, { useState } from "react";
import { Plus, Trash2, Send } from "lucide-react";

const PollCreationPage = ({ onClose, onSubmit }) => {
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
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Poll Created Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Your poll has been created and is now live on the blockchain.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Another Poll
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Create New Poll</h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pollTitle" className="block mb-2 font-semibold">
              Poll Title
            </label>
            <input
              id="pollTitle"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter poll title"
            />
          </div>

          <div>
            <label
              htmlFor="pollDescription"
              className="block mb-2 font-semibold"
            >
              Poll Description
            </label>
            <textarea
              id="pollDescription"
              value={pollDescription}
              onChange={(e) => setPollDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide context for your poll"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Poll Options (2-5 options)
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  required
                  className="flex-grow px-3 py-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Option ${index + 1}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
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
                className="flex items-center text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-lg"
              >
                <Plus className="mr-2" /> Add Option
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <Send className="mr-2" /> Create Poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default PollCreationPage;
