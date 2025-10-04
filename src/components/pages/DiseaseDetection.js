import React, { useState } from "react";

function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle detection by calling backend API
  const handleDetect = async () => {
    if (!selectedImage) return alert("Please upload an image first!");
    setLoading(true);
    setResults([]);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("crop", selectedCrop);

      const response = await fetch("http://localhost:5000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      alert("Error detecting disease. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Crop Disease Detection</h1>
      <p className="mb-8 text-lg text-gray-700">
        Select a crop and upload a picture of its leaf to detect possible diseases.
      </p>

      {/* Crop Selection */}
      <div className="mb-6">
        <label className="mr-4 font-medium">Select Crop:</label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="tomato">Tomato</option>
          <option value="onion">Onion</option>
          <option value="carrot">Carrot</option>
        </select>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col items-center space-y-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 rounded-lg"
        />

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-lg shadow-lg mx-auto"
            />
          </div>
        )}

        {/* Detect Button */}
        <button
          onClick={handleDetect}
          disabled={loading}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Detect Disease"}
        </button>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Detection Results:</h2>
            <ul className="space-y-3">
              {results.map((res, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-100 border rounded-lg shadow"
                >
                  <span className="font-medium">{res.disease}</span>
                  <span className="text-green-700 font-bold">{res.confidence}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;
