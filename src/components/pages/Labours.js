import React, { useState } from "react";
import { FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";

// Mock labour data for each district
const LABOURS_DATA = {
  Pune: [
    { name: "Ramesh Patil", skill: "Ploughing", contact: "9876543210" },
    { name: "Suresh More", skill: "Harvesting", contact: "9876543211" },
    { name: "Mahesh Kulkarni", skill: "Irrigation", contact: "9876543212" },
  ],
  Mumbai: [
    { name: "Amit Sharma", skill: "Planting", contact: "9876543220" },
    { name: "Vikas Jain", skill: "Harvesting", contact: "9876543221" },
    { name: "Rohit Verma", skill: "Fertilizing", contact: "9876543222" },
  ],
  Nagpur: [
    { name: "Sunil Deshmukh", skill: "Ploughing", contact: "9876543230" },
    { name: "Ajay Patil", skill: "Weeding", contact: "9876543231" },
    { name: "Raju More", skill: "Harvesting", contact: "9876543232" },
  ],
  Lucknow: [
    { name: "Rahul Singh", skill: "Irrigation", contact: "9876543240" },
    { name: "Vijay Yadav", skill: "Ploughing", contact: "9876543241" },
    { name: "Sanjay Kumar", skill: "Harvesting", contact: "9876543242" },
  ],
  // Add more districts as needed
};

const ALL_DISTRICTS = Object.keys(LABOURS_DATA);

export function Labours() {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <FaUserFriends className="mx-auto text-blue-600 text-6xl mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Labour District View
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Select a district to view labour-related information.
        </p>
      </div>

      {/* District Selection Form */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 flex items-center">
          <FaMapMarkerAlt className="mr-3 text-red-500" /> Select District
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select District</option>
              {ALL_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {}}
            disabled={!selectedDistrict}
            className="mt-6 w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 disabled:bg-gray-400"
          >
            View Labour Data
          </button>
        </div>
      </div>

      {/* Display Labour Data */}
      {selectedDistrict && (
        <div className="max-w-md mx-auto mt-8 bg-green-100 p-6 rounded-xl shadow-xl border-l-4 border-green-600">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Labour Data for: {selectedDistrict}
          </h3>

          <ul className="space-y-3">
            {LABOURS_DATA[selectedDistrict].map((labour, idx) => (
              <li
                key={idx}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{labour.name}</p>
                  <p className="text-gray-600">{labour.skill}</p>
                </div>
                <p className="text-blue-600 font-bold">{labour.contact}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Labours;
