import axios from 'axios';

const API_BASE = 'https://your-backend.onrender.com/api'; // Replace with your deployed backend URL

export const getHouses = () => axios.get(`${API_BASE}/houses`);
export const matchHouses = (data) => axios.post(`${API_BASE}/match`, data);
export const predictRent = (data) => axios.post(`${API_BASE}/predict-rent`, data);
export const postReview = (data) => axios.post(`${API_BASE}/review`, data);
export const getReviews = (houseId) => axios.get(`${API_BASE}/reviews/${houseId}`);
export const getLandlordStats = (id) => axios.get(`${API_BASE}/landlord/${id}/stats`);
