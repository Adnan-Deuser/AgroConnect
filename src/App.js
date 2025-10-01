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

// Image Array
const sliderImages = [image1, image2, image3, image4, image5];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % sliderImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Home page content
  const HomeContent = () => (
    <>
      {/* Hero Section with Slider */}
      <section className="relative flex-grow flex items-center h-screen overflow-hidden">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`} 
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="relative z-10 bg-black bg-opacity-50 w-full py-24">
          <div className="container mx-auto px-4 text-center text-white">
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
            <Route path="/soil" element={<SoilIntelligence />} />  {/* Soil page */}
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
