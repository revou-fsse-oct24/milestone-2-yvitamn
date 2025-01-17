// import React from "react";
// import pagenotfound from "../assets/404.png";

// const NotFound: React.FC = () => {
//   return (
//     <div className="w-full wrapper flex items-center justify-center flex-col">
//       <img className="lg:w-96 md:w-80 w-48" src={pagenotfound} alt="Page Not Found" />
//       <p className="text-3xl font-extrabold">404</p>
//       <p className="lg:text-lg text-sm text-grayshade-100">
//         Oops! The page you're looking for can't be found.
//       </p>
//     </div>
//   );
// };

// export default NotFound;




import React from 'react';
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
