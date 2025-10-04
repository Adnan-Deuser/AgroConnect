import React, { useState } from "react";
import { FaTools } from "react-icons/fa";

// Data Definitions
const INDIAN_STATES = [
  "Andhra Pradesh", "Karnataka", "Maharashtra", "Tamil Nadu"
];

// Sample equipments per state
const STATE_EQUIPMENTS = {
  "Andhra Pradesh": [
    { name: "Tractor", type: "Vehicle" },
    { name: "Plough", type: "Tool" },
    { name: "Irrigation Pump", type: "Machinery" },
  ],
  "Karnataka": [
    { name: "Harvester", type: "Vehicle" },
    { name: "Seed Drill", type: "Tool" },
    { name: "Sprayer", type: "Machinery" },
  ],
  "Maharashtra": [
    { name: "Tractor", type: "Vehicle" },
    { name: "Combine Harvester", type: "Vehicle" },
    { name: "Rotavator", type: "Machinery" },
  ],
  "Tamil Nadu": [
    { name: "Plough", type: "Tool" },
    { name: "Irrigation System", type: "Machinery" },
    { name: "Tractor", type: "Vehicle" },
  ],
};

function Equipments() {
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6 flex flex-col items-center">
      <FaTools className="text-green-600 text-6xl mb-4" />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Select a State for Equipment</h2>

      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State / UT
        </label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border border-gray-400 px-4 py-2 rounded-md shadow-sm w-full p-3 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">-- Select State --</option>
          {INDIAN_STATES.sort().map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected State and Equipments */}
      {selectedState && (
        <div className="mt-8 max-w-md w-full bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Equipments Available in {selectedState}
          </h3>

          <ul className="space-y-3">
            {STATE_EQUIPMENTS[selectedState]?.map((eq, idx) => (
              <li
                key={idx}
                className="border-l-4 border-green-600 bg-green-50 p-3 rounded flex justify-between"
              >
                <span className="font-semibold text-green-700">{eq.name}</span>
                <span className="text-green-600 italic">{eq.type}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Equipments;
