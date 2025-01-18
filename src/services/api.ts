
// Base URL for the API
const BASE_URL = "https://api.escuelajs.co/api/v1";

// Interface for Product type
export interface Product {
  id: string | number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string;
}



// Function to fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: {
      id: string | number;
      title: string;
      description: string;
      price: number;
      category: { id: string | number; name: string; image: string };
      images: string[]; // Array of image URLs
    }[] = await response.json(); // Inline the type


   // Ensure that the response is an array and has the necessary properties
   if (
    !Array.isArray(data) ||
    !data.every(
      (product) =>
        product.id &&
        product.title &&
        product.price &&
        product.images.length > 0
    )
  ) {
    throw new Error('Invalid data format');
  }

     // Adding a default quantity to each product
    return data.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.images[0], // Use the first image in the images array
      quantity: 1, // Set default quantity to 1
    }));
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

     // Ensure that the response contains valid product data
     if (!data.id || !data.title || !data.price || !data.images) {
      console.log("data", data)
      throw new Error('Invalid product data format');
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      quantity: 1, // Set default quantity to 1
      imageUrl: data.images[0], // Use imageUrl as per your interface
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};













