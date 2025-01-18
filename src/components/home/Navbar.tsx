
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function
  const location = useLocation(); // To track the current route

  const handleLogout = () => {
    logout(); // Call the logout function from context
    // You can also clear local storage or token if you're saving it
    localStorage.removeItem('token');
  };

  // Check if the current route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          ShopSmart
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className={`${isActive("/") ? "text-gray-300" : "hover:text-gray-300"}`}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/products"
                className={`${isActive("/products") ? "text-gray-300" : "hover:text-gray-300"}`}
              >
                Products
              </Link>
              <Link
                to="/checkout"
                className={`${isActive("/checkout") ? "text-gray-300" : "hover:text-gray-300"}`}
              >
                Checkout
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${isActive("/login") ? "text-gray-300" : "hover:text-gray-300"}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`${isActive("/signup") ? "text-gray-300" : "hover:text-gray-300"}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
