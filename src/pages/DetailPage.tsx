



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../services/api'; // Assuming you have this function

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

const DetailPage: React.FC = () => {
  const { id } = useParams(); // Fetch the product ID from the URL params
  const [product, setProduct] = useState<Product | null>(null); // State to store product details
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track error

  useEffect(() => {
    const getProductDetail = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductDetails(id); // Fetch product details using the API
        setProduct(data); // Set the product details in state
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    getProductDetail(); // Call the function to fetch product details
  }, [id]); // Effect depends on the product ID

  if (loading) {
    return <div className="text-center text-lg">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-lg">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-60 object-cover mb-4" />
      <p className="text-xl mb-4">{product.description}</p>
      <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default DetailPage;
