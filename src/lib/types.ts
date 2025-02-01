

// Frontend representation of a product
export interface Product {
    id: string | number;
    title: string;
    description: string;
    price: number;
    imageUrl: string[]; // Single image URL for the frontend
    category: Category;
    quantity: number;
  }
  
// Category information
export interface Category {
    id: string | number;
    name: string;
    description?: string;
    image?: string; // URL of the category image
  }

  export type HomePageData = {
    products: Product[];
    categories: Category[];
  };

  // Order type
  export interface Order {
    id: number;
    userId: number; // ID of the user who placed the order
    //date: string; // ISO date string
    status: string; // e.g., "pending", "shipped", "delivered"
    items: OrderItem[]; // List of products in the order
    total: number; // Total price of the order
  }

    export interface OrderItem{
    productId : number | string;
    quantity: number;
    price:number;
    }
  
    export interface ApiErrorData {
    message: string;
    statusCode?: number;
  }

  
export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string;
  }
  
  // raw API response 
export interface ApiProductResponse {
    id: string | number;
    title: string;
    description: string;
    price: number;
    images: string[]; // Array of image URLs from the API
    quantity: number;
}

  
  // User type for registration and login
  export interface User {
    id: number;
    email: string;
    password: string; // Only for registration
    name: string;
    avatar?: string; // Optional avatar URL
    role?: string; // Optional role (e.g., "customer", "admin")

}
  
  // Login response type
  export interface LoginResponse {
    access_token: string;
    user: User;
  }
  
  
  
  // Statistics type
  export interface Stats {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  }
  
  // API Error type
  export interface ApiErrorData {
    message: string;
    statusCode?: number;
  }
  

// Interface for CartModal props
export interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Product[];
   // onAddToCart: () => void;
  }
  
  // Interface for CartSummary props
  export interface CartSummaryProps {
    cartItems: Product[];
    removeProductFromCart: (productId: string) => void;
    onCompleteCheckout: () => void;
    updateProductQuantity: (productId: string | number, increment: boolean) => void;
  }

  export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: Product;
  }
  
  
  export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    status: string;
    total: number;
  }
  
  
  export interface CheckoutFormData {
    email: string;
    name: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
//   export type HomePageData = {
//     products: {
//       id: number;
//       title: string;
//       price: number;
//       description: string;
//       category: Category;
//       images: string[];
//   }[];
//     categories: {
//       id: number;
//       name: string;
//       description?: string;
//       image?: string;
//     }[];
//   };
  


  // Custom API Error class
export class ApiError extends Error {
    constructor(
      public status: number,
      message: string,
      public data?: Record<string, unknown>
    ) {
      super(message);
      this.name = "ApiError";
    }
  }

