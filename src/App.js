import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FeatureGrid from './components/FeatureGrid';
import Footer from './components/Footer';

// 1. IMPORT YOUR LOCAL IMAGES HERE
// IMPORTANT: You must ensure these 5 files exist in your ./Images/ directory
// and that their file names and extensions (e.g., .jpg) are correct.
import image1 from './Images/Image1.jpg'; 
import image2 from './Images/Image2.jpg';
import image3 from './Images/Image3.jpg';
import image4 from './Images/Image4.jpg'; // ADDED: 4th image import
import image5 from './Images/Image5.jpg'; // ADDED: 5th image import

// --- Image Array for the Slider ---
// 2. UPDATED: Array now contains 5 image variables
const sliderImages = [
  image1, 
  image2, 
  image3, 
  image4, // Added to the array
  image5, // Added to the array
];


function App() {
  // State to track the index of the currently displayed image (0 through 4)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to automatically cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      // The modulo operator (%) ensures the index wraps back to 0 after the last image (5 images = length 5)
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % sliderImages.length
      );
    }, 5000); // Change image every 5 seconds (5000ms)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // MODIFIED: Dependency array is now empty [] as sliderImages is a static constant
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* MODIFIED: Hero Section for Image Slider */}
      <section 
        className="relative flex-grow flex items-center h-screen overflow-hidden" 
      >
        {/* Background Image Slider */}
        {sliderImages.map((image, index) => (
          <div
            key={index}
            // FIX: Changed bg-contain back to bg-cover to ensure images cover the entire section. Removed bg-no-repeat.
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`} 
            style={{
              backgroundImage: `url(${image})`, 
              opacity: index === currentImageIndex ? 1 : 0, 
            }}
          ></div>
        ))}
        
        {/* Content Overlay - Ensure text is always on top (z-10) */}
        <div className="relative z-10 bg-black bg-opacity-50 w-full py-24">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering Farmers With Data-Driven Insights</h1>
            <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl">Real-time soil, weather, and market analytics — delivered through voice, text & images, right on your phone.</p>
            <a href="#features" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow inline-block">Explore Features</a>
          </div>
        </div>
      </section>
      
      <FeatureGrid />
      <Footer />
    </div>
  );
}

export default App;
