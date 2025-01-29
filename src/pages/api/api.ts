



export interface Product {
    id: string | number;
    title: string;
    description: string;
    price: number;
    imageUrl: string; // The first image in the images array
    category: {
      name: string;
      image: string; // Category image URL
    };
  }
  
  const BASE_URL = "https://api.escuelajs.co/api/v1"; 
  
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
      }[] = await response.json();
  
      // Validate data
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
  
      // Map over the data and return it with the needed structure
      return data.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.images[0], // Use the first image from the array
        category: {
          name: product.category.name,
          image: product.category.image, // Category image URL
        },
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };