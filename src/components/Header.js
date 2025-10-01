import React from 'react';

const Header = () => (
  <header className="bg-green-700 text-white">
    <div className="container mx-auto flex items-center justify-between px-4 py-4">
      <h1 className="text-2xl font-bold">AgroSense AI</h1>
      <nav className="space-x-4 hidden sm:block">
        <a href="#features" className="hover:underline">Features</a>
        <a href="#impact" className="hover:underline">Impact</a>
        <a href="#benefits" className="hover:underline">Benefits</a>
      </nav>
    </div>
  </header>
);

export default Header;
