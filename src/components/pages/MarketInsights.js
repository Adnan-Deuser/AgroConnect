import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import marketCSV from "../../Data/market_data.csv";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const itemsList = ["Tomato", "Onion", "Carrot", "Rice", "Wheat"];
const colors = { Tomato: "red", Onion: "blue", Carrot: "green", Rice: "orange", Wheat: "purple" };

const WINDOW_SIZE = 5; // Number of previous days to look at

const MarketInsights = () => {
  const [csvData, setCsvData] = useState([]);
  const [daysToPredict, setDaysToPredict] = useState(30);
  const [selectedItems, setSelectedItems] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [predictionsResult, setPredictionsResult] = useState({});
  const [loading, setLoading] = useState(false);

  // Load CSV
  useEffect(() => {
    Papa.parse(marketCSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data
          .map((row) => {
            const obj = { Date: row.Date };
            itemsList.forEach((item) => {
              const val = parseFloat(row[item]);
              if (!isNaN(val)) obj[item] = val;
            });
            return obj;
          })
          .filter((row) => Object.keys(row).length > 1);
        setCsvData(data);
      },
    });
  }, []);

  const handleItemChange = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Safe sequence creation
  const createSequences = (data) => {
    const xs = [];
    const ys = [];
    for (let i = 0; i < data.length - WINDOW_SIZE; i++) {
      const seq = data.slice(i, i + WINDOW_SIZE);
      if (seq.some(v => typeof v !== "number" || isNaN(v))) continue;
      xs.push(seq.map(v => [v])); // shape [WINDOW_SIZE, 1]
      ys.push([data[i + WINDOW_SIZE]]); // shape [1]
    }
    if (xs.length === 0) return [null, null];
    return [tf.tensor3d(xs), tf.tensor2d(ys)];
  };

  const predictNextValue = (model, sequence) => {
    const cleanSeq = sequence.map(v => (isNaN(v) ? 0 : v));
    return tf.tidy(() => {
      const input = tf.tensor3d([cleanSeq.map(v => [v])]); // shape [1, WINDOW_SIZE, 1]
      return model.predict(input).dataSync()[0];
    });
  };

  const handlePredict = async () => {
    if (selectedItems.length === 0 || csvData.length === 0) return;
    setLoading(true);

    const datasets = [];
    const last50 = csvData.slice(-50); 
    const labels = last50.map((_, i) => `Day ${i + 1}`);
    const futureLabels = Array.from({ length: daysToPredict }, (_, i) => `Day ${last50.length + i + 1}`);
    const allLabels = [...labels, ...futureLabels];
    const predictionsObj = {};

    for (const item of selectedItems) {
      const history = last50.map(row => row[item]).filter(v => v != null);
      if (history.length <= WINDOW_SIZE) continue;

      // Normalize
      const min = Math.min(...history);
      const max = Math.max(...history);
      const normalize = val => (val - min) / (max - min);
      const denormalize = val => val * (max - min) + min;
      const normalizedHistory = history.map(normalize);

      const [xs, ys] = createSequences(normalizedHistory);
      if (!xs || !ys) continue; // skip if no valid sequences

      // LSTM model
      const model = tf.sequential();
      model.add(tf.layers.lstm({ units: 16, inputShape: [WINDOW_SIZE, 1] }));
      model.add(tf.layers.dense({ units: 1 }));
      model.compile({ loss: "meanSquaredError", optimizer: "adam" });

      await model.fit(xs, ys, { epochs: 200, verbose: 0 });

      let lastSequence = normalizedHistory.slice(-WINDOW_SIZE);
      const future = [];
      for (let i = 0; i < daysToPredict; i++) {
        const nextNorm = predictNextValue(model, lastSequence);
        const nextVal = denormalize(nextNorm);
        future.push(parseFloat(nextVal.toFixed(2)));
        lastSequence = [...lastSequence.slice(1), nextNorm];
      }

      const dataPoints = [...history, ...future];

      // Dashed line for predicted points
      const borderDashArray = [
        ...Array(history.length).fill(0),
        ...Array(future.length).fill(5),
      ];

      datasets.push({
        label: item,
        data: dataPoints,
        borderColor: colors[item],
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 4,
        borderDash: borderDashArray,
      });

      predictionsObj[item] = future;

      xs.dispose();
      ys.dispose();
      model.dispose();
      tf.disposeVariables();
    }

    setChartData({ labels: allLabels, datasets });
    setPredictionsResult(predictionsObj);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Market Insights</h1>

      <div className="mb-4">
        <label className="mr-2">Days to predict:</label>
        <input
          type="number"
          min={1}
          max={50}
          value={daysToPredict}
          onChange={(e) => setDaysToPredict(parseInt(e.target.value))}
          className="border p-1 rounded w-20"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <span>Select items:</span>
        {itemsList.map((item) => (
          <label key={item} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => handleItemChange(item)}
            />
            {item}
          </label>
        ))}
      </div>

      <button
        onClick={handlePredict}
        className={`px-4 py-2 rounded mb-6 ${loading ? "bg-gray-400" : "bg-blue-600 text-white"}`}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {chartData && (
        <div style={{ height: "500px" }}>
          <Line
            data={{ labels: chartData.labels, datasets: chartData.datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: { x: { grid: { display: false } } },
              plugins: { legend: { display: true, position: "top" } },
            }}
          />
        </div>
      )}

      {Object.keys(predictionsResult).length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Predicted Prices (Next {daysToPredict} Days):</h2>
          {Object.entries(predictionsResult).map(([item, values]) => (
            <p key={item}>
              <strong>{item}:</strong> {values.join(", ")}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketInsights;
