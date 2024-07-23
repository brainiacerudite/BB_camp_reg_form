import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_URL;

if (!API_ENDPOINT) {
  throw new Error(
    "Confirm 'API_ENDPOINT' is set in the environment variables; create one if it's not there"
  );
}

// Create an Axios instance
const apiClient = axios.create({
  withCredentials: true,
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
