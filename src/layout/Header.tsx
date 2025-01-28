import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-center items-center">
        
        <img
          src="/header.jpg"  // image path
          alt="Logo"
          className="h-16" // Adjust the height of the image
        />
      </div>
    </header>
  );
};

export default Header;