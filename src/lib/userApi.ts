
import { ApiError,  } from './types';

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

// Function to register a new user
  export async function register(email: string, password: string, name: string): Promise<{ id: number; email: string; name: string }> {
    
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      return await handleResponse<{ id: number; email: string; name: string }>(response);
    } 
  
  // Function to log in a user
  export async function login(email: string, password: string): Promise<{ access_token: string; user: { id: number; email: string; name: string } }> {
   
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await handleResponse<{ access_token: string; user: { id: number; email: string; name: string } }>(response);
    } 
