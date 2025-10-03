import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";

// Data Definitions
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// The core function component
function Equipments() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState("");

  const handleProceed = (e) => {
    e.preventDefault();

    if (!selectedState) {
      setError("Please select a State to proceed.");
      return;
    }

    setError("");
    navigate(`/equipments/districts/${encodeURIComponent(selectedState)}`);
  };
     return (
    <div className="min-h-screen bg-green-50 py-12 px-6 flex flex-col items-center">
      <FaTools className="text-green-600 text-6xl mb-4" />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Select a State for Equipment</h2>

      <form onSubmit={handleProceed} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="state-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State / UT
          </label>

          <select
            id="state-select"
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

          {error && (
            <p className="text-red-600 text-sm mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={!selectedState}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 disabled:bg-gray-400"
          >
            Proceed to Districts
          </button>
           </div>
      </form>

      {selectedState && (
        <div className="mt-6 text-xl text-green-700 font-medium p-3 bg-white rounded shadow">
          Equipment data scope set to: <span className="font-bold">{selectedState}</span>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-8 text-blue-600 hover:text-blue-800 text-sm"
      >
        ← Back
      </button>
    </div>
  );
}

// Export the function as the default export
export default Equipments;

