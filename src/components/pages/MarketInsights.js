import React from "react";
import { FaChartLine, FaCoins, FaBullhorn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MarketInsights = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaChartLine className="mx-auto text-green-600 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Market Insights
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Stay updated with dynamic commodity prices and identify profitable opportunities for your crops.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCoins className="text-yellow-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Commodity Prices</h2>
          <p className="text-gray-600">
            Track current prices of grains, vegetables, and other crops in your region.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaBullhorn className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Market Alerts</h2>
          <p className="text-gray-600">
            Receive notifications about price changes, demand surges, and upcoming market trends.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaChartLine className="text-purple-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profit Analysis</h2>
          <p className="text-gray-600">
            Analyze your crop profitability based on historical data and current market conditions.
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

export default MarketInsights;
