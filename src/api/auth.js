import axios from 'axios';

const BASE_URL = "http://localhost:3000";

const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};


const getProducts = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/products?page=1&limit=10`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const addProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${BASE_URL}/products`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const updateProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const { id, ...data } = productData;
  const res = await axios.put(`${BASE_URL}/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export {registerUser, getProducts, addProduct, deleteProduct, updateProduct };



