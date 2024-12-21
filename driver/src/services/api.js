import axios from 'axios';

// Create an axios instance with the base URL from environment variables
const API = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach an interceptor to inject the authorization token
API.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services for driver-related API operations
export const registerDriver = async (credentials) => {
    try {
      const response = await API.post('/driver/register', credentials);
      return response.data; // Return the response data for further usage
    } catch (error) {
      handleApiError(error);
    }
};

export const loginDriver = async (credentials) => {
  try {
    const response = await API.post('/driver/login', credentials);
    return response.data; // Return the response data for further usage
  } catch (error) {
    handleApiError(error);
  }
};

export const getDriverOrders = async () => {
  try {
    const response = await API.get('/driver/orders');
    return response.data; // Return the fetched orders
  } catch (error) {
    handleApiError(error);
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await API.put(`/driver/orders/${id}`, { status });
    return response.data; // Return the updated order
  } catch (error) {
    handleApiError(error);
  }
};

// Utility function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the range of 2xx
    console.error('API Error:', error.response.data.message || 'An error occurred');
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // Request was made but no response was received
    console.error('Network Error:', error.message);
    throw new Error('Network error. Please try again later.');
  } else {
    // Something else happened during the request setup
    console.error('Error:', error.message);
    throw new Error('An unexpected error occurred.');
  }
};
