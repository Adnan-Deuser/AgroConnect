import React from "react";
import { FaCloudSun, FaWater, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WeatherForecasting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaCloudSun className="mx-auto text-yellow-500 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Weather Forecasting
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Get hyper-local weather predictions to optimize planting schedules, irrigation, and crop management.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaWater className="text-blue-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Rainfall Prediction</h2>
          <p className="text-gray-600">
            Plan irrigation and protect crops by knowing upcoming rainfall patterns.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaSun className="text-yellow-400 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Temperature Forecast</h2>
          <p className="text-gray-600">
            Track temperature trends to manage heat stress and frost protection for your crops.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <FaCloudSun className="text-purple-500 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Weather Alerts</h2>
          <p className="text-gray-600">
            Receive early warnings for storms, extreme weather, or other climatic events.
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

export default WeatherForecasting;
