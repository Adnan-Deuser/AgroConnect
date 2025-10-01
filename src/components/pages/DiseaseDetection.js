import React from "react";
import { FaVirus, FaCamera, FaMicroscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DiseaseDetection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaVirus className="mx-auto text-red-600 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Disease Detection
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Identify crop diseases early using AI-powered image analysis directly from your camera.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCamera className="text-green-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Camera Detection</h2>
          <p className="text-gray-600">
            Take pictures of your crops and instantly detect early signs of disease.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaMicroscope className="text-purple-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">AI Analysis</h2>
          <p className="text-gray-600">
            Our AI algorithms analyze leaf patterns and color changes to detect potential infections.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaVirus className="text-red-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Preventive Tips</h2>
          <p className="text-gray-600">
            Get actionable recommendations to prevent disease spread and protect your crops.
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

export default DiseaseDetection;
