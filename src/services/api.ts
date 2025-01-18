// Base URL for the API
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Interface for Product type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

// Function to fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to fetch a single product by ID
export const fetchProductDetails = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
