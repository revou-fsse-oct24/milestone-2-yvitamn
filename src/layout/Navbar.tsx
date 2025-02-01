import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';


interface NavbarProps {
  onCartClick: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const { isAuthenticated, user, logout } = useAuth(); // Access user and authentication state
  const pathname = usePathname(); // To track the current route

  const handleLogout = () => {
    logout(); // Call the logout function from context
    // You can also clear local storage or token if you're saving it
    localStorage.removeItem('token');
  };

  // Check if the current route is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          ShopSmart
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className={`${isActive('/') ? 'text-gray-300' : 'hover:text-gray-300'}`}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/products"
                className={`${isActive('/products') ? 'text-gray-300' : 'hover:text-gray-300'}`}
              >
                Products
              </Link>
              
                  {/* Checkout Link - Opens Cart Modal */}
              <button
              onClick={onCartClick}
              className={`${isActive('/checkout') ? 'text-gray-300' : 'hover:text-gray-300'}`}
            >
                Checkout
                </button>
              
              <span className="text-gray-300">Welcome, {user?.name}!</span> {/* Display user name */}
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
                href="/login"
                className={`${isActive('/login') ? 'text-gray-300' : 'hover:text-gray-300'}`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`${isActive('/signup') ? 'text-gray-300' : 'hover:text-gray-300'}`}
              >
                Sign Up
              </Link>
            </>
          )}
          {/* Cart Button */}
          {/* <button
            onClick={onCartClick}
            className="hover:text-gray-300"
          >
            Cart
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;