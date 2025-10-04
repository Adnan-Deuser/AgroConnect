import React, { useState } from "react";
import { FaRecycle, FaLeaf, FaChartPie, FaLightbulb, FaCalculator, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Placeholder data for Indian States
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Punjab",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
];

// Helper Component for the State Dropdown and Action Button
const FeatureCard = ({ icon: Icon, iconColor, title, description, actionText, actionIcon: ActionIcon, onCalculate }) => {
    const [selectedState, setSelectedState] = useState("");

    const handleAction = () => {
        if (!selectedState) {
            alert("Please select a state first.");
            return;
        }
        onCalculate(selectedState);
    };

    return (
        <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition duration-300 border-t-4 border-gray-100 hover:border-green-500">
            <div>
                <Icon className={`${iconColor} text-4xl mb-4`} />
                <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
            </div>

            <div className="mt-4">
                {/* State Selection Dropdown */}
                <div className="relative mb-4">
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="appearance-none w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-green-500 font-medium"
                    >
                        <option value="" disabled>Select Your State</option>
                        {INDIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaChevronDown className="h-4 w-4" />
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleAction}
                    className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg w-full shadow transition transform hover:scale-[1.01]"
                >
                    <ActionIcon className="mr-2" />
                    <span>{actionText}</span>
                </button>
            </div>
        </div>
    );
};


const SustainabilityScoring = () => {
  const navigate = useNavigate();

  const handleCalculation = (feature, state) => {
    // This is where you'd call an API or run calculation logic based on the state.
    alert(`Starting ${feature} calculation for ${state}... (Simulation)`);
    // In a real application, you'd navigate to a results page here.
    // navigate('/results', { state: { feature, state } });
  };

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
      
      {/* --- */}
      
      {/* Info Grid with Feature Cards */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
        
        {/* 1. Soil Health Card */}
        <FeatureCard
            icon={FaLeaf}
            iconColor="text-green-500"
            title="Soil Health"
            description="Calculate soil fertility, nutrient balance, and get suggestions for long-term productivity based on your region."
            actionText="Calculate Soil Score"
            actionIcon={FaCalculator}
            onCalculate={(state) => handleCalculation("Soil Health", state)}
        />

        {/* 2. Resource Usage Card */}
        <FeatureCard
            icon={FaChartPie}
            iconColor="text-blue-500"
            title="Resource Usage"
            description="Analyze water, fertilizer, and energy consumption to identify waste and reduce your environmental footprint."
            actionText="Analyze Resources"
            actionIcon={FaChartPie}
            onCalculate={(state) => handleCalculation("Resource Usage", state)}
        />

        {/* 3. Actionable Tips Card */}
        <FeatureCard
            icon={FaLightbulb}
            iconColor="text-yellow-500"
            title="Actionable Tips"
            description="Receive localized, eco-friendly farming techniques and sustainability recommendations tailored to your state's climate."
            actionText="Get Localized Tips"
            actionIcon={FaCheckCircle}
            onCalculate={(state) => handleCalculation("Actionable Tips", state)}
        />
      </div>

      {/* --- */}
      
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