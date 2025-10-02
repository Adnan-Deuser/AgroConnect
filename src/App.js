import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FeatureGrid from './components/FeatureGrid';
import Footer from './components/Footer';
import SoilIntelligence from "./components/pages/SoilIntelligence";
import WeatherForecasting from "./components/pages/WeatherForecasting";
import MarketInsights from "./components/pages/MarketInsights";
import DiseaseDetection from "./components/pages/DiseaseDetection";
import MultilingualSupport from "./components/pages/MultilingualSupport";
import SustainabilityScoring from "./components/pages/SustainabilityScoring";

// Local Images
import image1 from './Images/Image1.jpg'; 
import image2 from './Images/Image2.jpg';
import image3 from './Images/Image3.jpg';
import image4 from './Images/Image4.jpg'; 
import image5 from './Images/Image5.jpg';

const sliderImages = [image1, image2, image3, image4, image5];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const HomeContent = () => (
    <>
      <section className="relative h-screen overflow-hidden">
        {/* Slider Track */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sliderImages.map((image, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Empowering Farmers With Data-Driven Insights
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl">
              Real-time soil, weather, and market analytics — delivered through voice, text & images, right on your phone.
            </p>
            <a 
              href="#features" 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow inline-block"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeatureGrid />
    </>
  );

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/soil" element={<SoilIntelligence />} />
            <Route path="/weather" element={<WeatherForecasting />} />
            <Route path="/market" element={<MarketInsights />} />
            <Route path="/disease" element={<DiseaseDetection />} />
            <Route path="/multilingual" element={<MultilingualSupport />} />
            <Route path="/sustainability" element={<SustainabilityScoring />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
