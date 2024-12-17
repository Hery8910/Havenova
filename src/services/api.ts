import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true, // Necesario para trabajar con cookies
});

export default api;
