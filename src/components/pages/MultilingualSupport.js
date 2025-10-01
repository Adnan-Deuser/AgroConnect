import React from "react";
import { FaLanguage, FaMicrophone, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MultilingualSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaLanguage className="mx-auto text-indigo-600 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Multilingual Support
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Chat, speak, or snap a photo in multiple Indian languages — our AI understands them all.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaMicrophone className="text-purple-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Voice Support</h2>
          <p className="text-gray-600">
            Speak in your preferred language and get instant translations or AI assistance.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCamera className="text-green-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Image Recognition</h2>
          <p className="text-gray-600">
            Snap pictures of labels, signs, or crops, and receive multilingual AI guidance.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaLanguage className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Text Chat</h2>
          <p className="text-gray-600">
            Type in your language and interact seamlessly with our AI assistant.
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center mt-16">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default MultilingualSupport;
