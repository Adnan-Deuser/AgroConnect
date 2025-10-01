import React from 'react';
import { FaSeedling, FaCloudSun, FaChartLine, FaVirus, FaLanguage, FaRecycle } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: 'Soil Intelligence',
    icon: <FaSeedling />,
    description: 'Access real-time soil metrics and tailored recommendations to enhance fertility and crop yield.'
  },
  {
    title: 'Weather Forecasting',
    icon: <FaCloudSun />,
    description: 'Hyper-local climate forecasts help optimize planting schedules and irrigation planning.'
  },
  {
    title: 'Market Insights',
    icon: <FaChartLine />,
    description: 'Stay updated with dynamic commodity prices and identify lucrative market opportunities.'
  },
  {
    title: 'Disease Detection',
    icon: <FaVirus />,
    description: 'AI-powered image analysis spots early signs of crop disease directly from your camera.'
  },
  {
    title: 'Multilingual Support',
    icon: <FaLanguage />,
    description: 'Chat, speak, or snap a photo in multiple Indian languages — our AI understands them all.'
  },
  {
    title: 'Sustainability Scoring',
    icon: <FaRecycle />,
    description: 'Measure the environmental impact and receive actionable tips to farm more sustainably.'
  }
];

const FeatureGrid = () => (
  <section id="features" className="py-12 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
