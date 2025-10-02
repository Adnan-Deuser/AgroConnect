import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import weatherCSV from "../../Data/weather_data.csv";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const aspectsList = [
  "Wind_Speed",
  "Wind_Direction",
  "Relative_Humidity",
  "Surface_Pressure",
  "Regional_Temperature",
];

const colors = {
  Wind_Speed: "red",
  Wind_Direction: "blue",
  Relative_Humidity: "green",
  Surface_Pressure: "orange",
  Regional_Temperature: "purple",
};

const WeatherForecasting = () => {
  const [csvData, setCsvData] = useState([]);
  const [daysToPredict, setDaysToPredict] = useState(5);
  const [selectedAspects, setSelectedAspects] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [predictionsResult, setPredictionsResult] = useState({});

  // Load CSV once
  useEffect(() => {
    Papa.parse(weatherCSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.map((row) => {
          const obj = {};
          aspectsList.forEach((aspect) => {
            const val = parseFloat(row[aspect]);
            obj[aspect] = isNaN(val) ? null : val; // filter invalid values
          });
          return obj;
        });
        setCsvData(data);
      },
    });
  }, []);

  const handleAspectChange = (aspect) => {
    setSelectedAspects((prev) =>
      prev.includes(aspect)
        ? prev.filter((a) => a !== aspect)
        : [...prev, aspect]
    );
  };

  const handlePredict = async () => {
    if (selectedAspects.length === 0) {
      alert("Select at least one aspect to predict.");
      return;
    }
    if (csvData.length === 0) return;

    const datasets = [];
    const predictionsObj = {};
    const historyLength = Math.min(csvData.length, 50); // last 50 days
    const recentData = csvData.slice(-historyLength);

    const labels = [
      ...recentData.map((_, i) => `Previous Data ${i + 1}`),
      ...Array.from({ length: daysToPredict }, (_, i) => `Predicted Day ${i + 1}`),
    ];

    let yAxisIndex = 0;
    const yAxesMap = {};

    for (const aspect of selectedAspects) {
      const history = recentData
        .map((row) => row[aspect])
        .filter((val) => val !== null);

      if (history.length === 0) {
        // skip if no valid data
        predictionsObj[aspect] = Array(daysToPredict).fill(null);
        continue;
      }

      // Check if all values are the same
      const allSame = history.every((val) => val === history[0]);

      let future = [];
      if (history.length < 2 || allSame) {
        // repeat last value
        future = Array(daysToPredict).fill(history[history.length - 1]);
      } else {
        const xs = tf.tensor1d(history.slice(0, -1));
        const ys = tf.tensor1d(history.slice(1));

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

        await model.fit(xs, ys, { epochs: 50, verbose: 0 }); // faster training

        let lastValue = history[history.length - 1];
        for (let i = 0; i < daysToPredict; i++) {
          const nextTensor = model.predict(tf.tensor1d([lastValue]));
          let nextVal = nextTensor.dataSync()[0];
          if (isNaN(nextVal)) nextVal = lastValue;
          future.push(parseFloat(nextVal.toFixed(2)));
          lastValue = nextVal;
        }
      }

      const dataPoints = [...history, ...future];
      yAxesMap[aspect] = `y${yAxisIndex}`;

      datasets.push({
        label: aspect,
        data: dataPoints,
        borderColor: colors[aspect],
        yAxisID: `y${yAxisIndex}`,
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 4,
      });

      predictionsObj[aspect] = future;
      yAxisIndex++;
    }

    // configure y axes
    const yAxesConfig = {};
    Object.keys(yAxesMap).forEach((aspect, index) => {
      const data = datasets.find((d) => d.label === aspect).data;
      yAxesConfig[`y${index}`] = {
        type: "linear",
        display: true,
        position: index % 2 === 0 ? "left" : "right",
        title: { display: true, text: aspect },
        min: Math.min(...data.filter((v) => !isNaN(v))) * 0.9,
        max: Math.max(...data.filter((v) => !isNaN(v))) * 1.1,
        grid: { drawOnChartArea: index === 0 },
      };
    });

    setChartData({ labels, datasets, yAxesConfig });
    setPredictionsResult(predictionsObj);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Weather Forecasting</h1>

      <div className="mb-4">
        <label className="mr-2">How many days to predict:</label>
        <input
          type="number"
          min={1}
          max={50}
          value={daysToPredict}
          onChange={(e) => setDaysToPredict(parseInt(e.target.value))}
          className="border p-1 rounded w-20 mr-4"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <span className="mr-2">Select aspects:</span>
        {aspectsList.map((aspect) => (
          <label key={aspect} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedAspects.includes(aspect)}
              onChange={() => handleAspectChange(aspect)}
            />
            {aspect}
          </label>
        ))}
      </div>

      <button
        onClick={handlePredict}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Predict
      </button>

      {chartData && (
        <div style={{ height: "500px" }}>
          <Line
            data={{ labels: chartData.labels, datasets: chartData.datasets }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                ...chartData.yAxesConfig,
                x: {
                  type: "category",
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                  },
                  grid: { display: false },
                },
              },
              plugins: {
                legend: { display: true, position: "top" },
                tooltip: { enabled: true },
              },
            }}
          />
        </div>
      )}

      {Object.keys(predictionsResult).length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Prediction Results:</h2>
          {Object.entries(predictionsResult).map(([aspect, values]) => (
            <p key={aspect} className="mb-1">
              <strong>{aspect}:</strong> {values.join(", ")}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecasting;
