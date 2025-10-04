import React from 'react';
import { FaSeedling, FaCloudSun, FaChartLine, FaVirus, FaLanguage, FaRecycle,FaTools,FaUserFriends } from 'react-icons/fa';
import FeatureCard from './FeatureCard';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Soil Intelligence',
    icon: <FaSeedling />,
    description: 'Access real-time soil metrics and tailored recommendations to enhance fertility and crop yield.',
    route: '/soil'
  },
  {
    title: 'Weather Forecasting',
    icon: <FaCloudSun />,
    description: 'Hyper-local climate forecasts help optimize planting schedules and irrigation planning.',
    route: '/weather'
  },
  {
    title: 'Market Insights',
    icon: <FaChartLine />,
    description: 'Stay updated with dynamic commodity prices and identify lucrative market opportunities.',
    route: '/market' // Placeholder, create page later
  },
  {
    title: 'Disease Detection',
    icon: <FaVirus />,
    description: 'AI-powered image analysis spots early signs of crop disease directly from your camera.',
    route: '/disease' // ✅ added
  },
  {
    title: 'Multilingual Support',
    icon: <FaLanguage />,
    description: 'Chat, speak, or snap a photo in multiple Indian languages — our AI understands them all.',
    route: '/multilingual' // Placeholder
  },
  {
    title: 'Sustainability Scoring',
    icon: <FaRecycle />,
    description: 'Measure the environmental impact and receive actionable tips to farm more sustainably.',
    route: '/sustainability' // ✅ added
  },
    {
      title: 'Equipments',
      icon: <FaTools />,
      description: 'Easily manage and share farming equipment through the platform.',
      route: '/equipment'
  },
 {
  title: 'Labours',
  icon: <FaUserFriends />,
  description: 'Connect with skilled farm laborers when you need them most.',
  route: '/labour'
  }
];

const FeatureGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              onCardClick={feature.route ? () => navigate(feature.route) : undefined} // Navigate if route exists
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
