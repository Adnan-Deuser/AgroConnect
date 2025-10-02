import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import soilCSV from "../../Data/soil_ph.csv";

// Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SoilIntelligence = () => {
  const [district, setDistrict] = useState("");
  const [soilType, setSoilType] = useState("");
  const [phHistory, setPhHistory] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Load CSV data
  useEffect(() => {
    fetch(soilCSV)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data.map((row) => ({
              District: row.District?.trim(),
              Major_Soil_Type: row.Major_Soil_Type?.trim(),
              pH: parseFloat(row.pH),
            }));
            setCsvData(data);

            // Unique districts for dropdown
            const uniqueDistricts = [...new Set(data.map((row) => row.District))];
            setDistricts(uniqueDistricts);
          },
        });
      });
  }, []);

  // Simple moving average to smooth data
  const smoothData = (data, windowSize = 3) => {
    const smoothed = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - Math.floor(windowSize / 2));
      const end = Math.min(data.length, i + Math.ceil(windowSize / 2));
      const window = data.slice(start, end);
      const avg = window.reduce((a, b) => a + b, 0) / window.length;
      smoothed.push(avg);
    }
    return smoothed;
  };

  // Handle district selection
  const handleSubmit = () => {
    if (!district) return;

    const districtRows = csvData.filter(
      (r) => r.District.toLowerCase() === district.toLowerCase()
    );

    if (districtRows.length === 0) {
      alert("District not found in CSV!");
      return;
    }

    setSoilType(districtRows[0].Major_Soil_Type);

    // Use all pH values and smooth them
    const history = smoothData(districtRows.map((r) => r.pH));
    setPhHistory(history);
  };

  // Run TensorFlow.js prediction
  useEffect(() => {
    const runPrediction = async () => {
      if (phHistory.length < 2) return;

      const xs = tf.tensor1d(phHistory.slice(0, -1));
      const ys = tf.tensor1d(phHistory.slice(1));

      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

      await model.fit(xs, ys, { epochs: 200 });

      const nextTensor = model.predict(tf.tensor1d([phHistory[phHistory.length - 1]]));
      const nextVal = nextTensor.dataSync()[0].toFixed(2);
      setPrediction(nextVal);

      setChartData({
        labels: phHistory.map((_, i) => `Day ${i + 1}`).concat("Next"),
        datasets: [
          {
            label: "Soil pH",
            data: [...phHistory, parseFloat(nextVal)],
            borderColor: "green",
            fill: false,
          },
        ],
      });
    };

    runPrediction();
  }, [phHistory]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Soil Intelligence - Kerala</h1>

      <div className="mb-4">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={!district || districts.length === 0}
        >
          Submit
        </button>
      </div>

      {soilType && (
        <p className="mb-4">
          <strong>Major Soil Type:</strong> {soilType}
        </p>
      )}

      {chartData && (
        <div>
          <Line key={district} data={chartData} />
          <p className="mt-4 text-xl">Predicted Next pH: {prediction}</p>
        </div>
      )}
    </div>
  );
};

export default SoilIntelligence;
