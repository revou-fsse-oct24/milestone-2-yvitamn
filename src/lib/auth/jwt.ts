
import jwt from 'jsonwebtoken';


// Decode the JWT token and return the payload (user info)
export const decodeJwt = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

// Verify if JWT is valid (check if it's expired)
export const verifyJwt = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};


// Function to handle the API request for user signup
export const signupWithJwt = async (email: string, password: string) => {
    try {
      const response = await fetch('https://fakeapi.platzi.com/en/rest/auth-jwt/', { // Replace with your signup API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
  
      const data = await response.json();
      const token = data.token; // Assuming the API responds with a 'token' field
  
      // Save JWT in localStorage (or you can use cookies)
      localStorage.setItem('token', token);
  
      return token;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };


// const loginWithJwt = async (email: string, password: string) => {
//     try {
//       const response = await fetch('https://fakeapi.platzi.com/en/rest/auth-jwt/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Invalid credentials');
//       }
  
//       const data = await response.json();
//       const token = data.token; // Assuming the API responds with a 'token' field
  
//       // You could save the JWT token in a cookie or local storage
//       document.cookie = `token=${token}; path=/; secure`;  // Store token in a cookie
//       return token;
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw error;
//     }
//   };



  