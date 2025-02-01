


import { ApiError, Product } from './types';

// Base URL for the API
const BASE_URL = "https://api.escuelajs.co/api/v1";



// Utility function to handle API responses
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(response.status, error.message || "API Error", error);
  }
  return response.json();
}



// Function to update an order's status
  export async function updateOrderStatus(orderId: number, status: string): Promise<{ id: number; status: string }> {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      return await handleResponse<{ id: number; status: string }>(response);
    } catch (error) {
        throw new ApiError(500, "Failed to update order status");
      throw error;
    }
  }
  
  // Function to fetch all orders
  export async function getOrders(): Promise<{ id: number; status: string; products: Product[] }[]> {
    try {
      const response = await fetch(`${BASE_URL}/orders`);
      return await handleResponse<{ id: number; status: string; products: Product[] }[]>(response);
    } catch (error) {
        throw new ApiError(500, "Failed to update order status");
      throw error;
    }
  }