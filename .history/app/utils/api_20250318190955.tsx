import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/a";

// Create an Axios instance with a default base URL
const api = axios.create({
  baseURL: API_BASE_URL, // All requests will use this as the base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;