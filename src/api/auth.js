import axios from 'axios';

const BASE_URL = "http://localhost:3000"

const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};



const getProducts = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/products?page=1&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



export {registerUser , getProducts}