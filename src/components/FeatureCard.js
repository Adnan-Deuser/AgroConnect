import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow">
    <div className="text-green-600 mb-4 text-4xl flex justify-center">
      {icon}

      
    </div>

    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard;
