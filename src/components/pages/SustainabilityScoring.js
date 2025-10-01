import React from "react";
import { FaRecycle, FaLeaf, FaChartPie, FaLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SustainabilityScoring = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaRecycle className="mx-auto text-green-600 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Sustainability Scoring
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Measure the environmental impact of your farming practices and get actionable tips to farm more sustainably.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaLeaf className="text-green-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Soil Health</h2>
          <p className="text-gray-600">
            Track soil fertility and get suggestions to maintain long-term productivity.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaChartPie className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Resource Usage</h2>
          <p className="text-gray-600">
            Analyze water, fertilizer, and energy consumption to reduce environmental impact.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaLightbulb className="text-yellow-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Actionable Tips</h2>
          <p className="text-gray-600">
            Receive recommendations for eco-friendly farming techniques and sustainability practices.
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

export default SustainabilityScoring;
