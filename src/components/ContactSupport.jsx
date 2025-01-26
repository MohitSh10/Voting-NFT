import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageCircle
} from 'lucide-react';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <MessageCircle className="mr-3 text-blue-600" />
          Contact & Support
        </h1>

        <div className="bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message or support request"
                required
                rows="4"
                className="w-full px-3 py-2 border rounded-lg focus:outline-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Send className="mr-2" /> Send Message
            </button>
          </form>

          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Alternative Support Channels</h2>
            <div className="flex justify-center space-x-4">
              <a 
                href="mailto:pulkity712@gmail.com" 
                className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                <Mail className="mr-2 text-red-500" /> Email
              </a>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;