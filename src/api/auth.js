import axios from 'axios';

const BASE_URL = "http://localhost:3000"

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};
