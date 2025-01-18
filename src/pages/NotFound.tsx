

//import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold text-purpleshade-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-grayshade-700 dark:text-white mb-6">
          Oops! The page you're looking for doesn't exist.
        </h2>
        <Link
          to="/"
          className="px-6 py-3 bg-purpleshade-400 text-white rounded-lg hover:bg-purpleshade-500"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
