const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Setup multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Dummy disease predictions
const getDummyPrediction = (crop) => {
  if (crop === "tomato") {
    return [
      { disease: "Tomato Early Blight", confidence: 70 },
      { disease: "Tomato Leaf Mold", confidence: 20 },
      { disease: "Healthy Leaf", confidence: 10 },
    ];
  } else if (crop === "onion") {
    return [
      { disease: "Onion Downy Mildew", confidence: 65 },
      { disease: "Onion Purple Blotch", confidence: 25 },
      { disease: "Healthy Leaf", confidence: 10 },
    ];
  } else if (crop === "carrot") {
    return [
      { disease: "Carrot Leaf Blight", confidence: 60 },
      { disease: "Powdery Mildew", confidence: 30 },
      { disease: "Healthy Leaf", confidence: 10 },
    ];
  } else {
    return [{ disease: "Unknown Crop", confidence: 0 }];
  }
};

// API route for disease detection
app.post("/detect", upload.single("image"), (req, res) => {
  const { crop } = req.body;
  // In real scenario, you would run ML model on req.file.buffer
  const results = getDummyPrediction(crop);
  setTimeout(() => {
    res.json({ results });
  }, 1500); // simulate delay
});

app.listen(port, () => {
  console.log(`Crop Disease API running on http://localhost:${port}`);
});
