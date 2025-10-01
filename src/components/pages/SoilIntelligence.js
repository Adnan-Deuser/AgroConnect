import React from "react";
import { FaSeedling, FaMicroscope, FaFlask, FaChartLine } from "react-icons/fa";

const SoilIntelligence = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaSeedling className="mx-auto text-green-600 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Soil Intelligence
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Get real-time insights into your soil health with AI-powered
          analytics. Improve fertility, predict yield, and make smarter
          farming decisions.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaMicroscope className="text-green-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nutrient Analysis</h2>
          <p className="text-gray-600">
            Detailed reports on nitrogen, phosphorus, and potassium levels
            to optimize fertilizer usage.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaFlask className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">pH & Moisture Tracking</h2>
          <p className="text-gray-600">
            Monitor soil acidity, alkalinity, and moisture balance for
            healthier crops.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaChartLine className="text-purple-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Yield Prediction</h2>
          <p className="text-gray-600">
            AI-driven predictions based on soil health and crop data to
            forecast productivity.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <a
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default SoilIntelligence;
