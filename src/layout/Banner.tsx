import React, { useState, useEffect } from 'react';
import '../global.css';

const Header: React.FC = () => {
  // State to control whether the intro images are visible or not
  const [showIntroImage, setShowIntroImage] = useState(true);

  useEffect(() => {
    // Automatically hide the image after 5 seconds (or any duration you choose)
    const timer = setTimeout(() => {
      setShowIntroImage(false);
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  return (
    <header className="relative bg-transparent text-white p-4">
      <div className="container mx-auto flex justify-center items-center">
        {/* Conditionally render the intro image */}
        {showIntroImage && (
          <img
            src="/assets/images/header.jpg" // Path to the editorial image
            alt="Intro Editorial"
            className={`max-w-full h-auto transition-opacity duration-500 ${
              showIntroImage ? "fade-in" : "fade-out"
            }`}
            />
        )}
      </div>


      {/* Button to hide the image and proceed to the main content */}
      {showIntroImage && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => setShowIntroImage(false)}
            className="bg-white text-blue-500 px-6 py-2 rounded-full shadow-lg"
          >
            Enter Site
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
