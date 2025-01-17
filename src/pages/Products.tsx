import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';

// Define a Product type for type-checking
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Function to display the list of products
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);  // State to store fetched products
  const [notFound, setNotFound] = useState<boolean>(false);  // State to track if no products are found

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();  // Fetch products from API
      setProducts(data);  // Update state with fetched products
    };

    getProducts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Effect to check if products are found or not
  useEffect(() => {
    if (products.length === 0) {
      setNotFound(true);  // Set to true if no products are found
    } else {
      setNotFound(false);  // Set to false if there are products
    }
  }, [products]);  // Re-run this effect whenever the 'products' state changes

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Products</h1>
      
      {/* Display a message if no products are found */}
      {notFound && (
        <p className="text-red-500 text-xl">No products found</p>
      )}

      {/* Display the products in a grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-500 mb-4">{product.description}</p>
            <Link to={`/products/${product.id}`} className="text-blue-600 hover:text-blue-400">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
