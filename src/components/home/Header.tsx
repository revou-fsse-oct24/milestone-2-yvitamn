// src/components/home/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <Link to="/" className="text-white">
            ShopSmart
          </Link>
        </div>
        <div>
          {/* You can add more elements here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
