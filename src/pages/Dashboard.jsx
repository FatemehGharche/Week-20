import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../api/auth.js';
import { toast } from 'react-toastify';

import Modal from './Modal'; 
import SearchBox from './SearchBox';

import styles from "./Dashboard.module.css"
import managment from "../assets/setting-3.png"
import edit from "../assets/edit.png"
import trash from "../assets/trash.png"

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    enabled: !loading,
    onError: (err) => {
      const message = err.response?.data?.message || 'خطا در دریافت کالاها';
      toast.error(message);
    },
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('کالا اضافه شد!');
    },
    onError: () => {
      toast.error('خطا در اضافه کردن کالا');
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('کالا حذف شد!');
    },
    onError: () => {
      toast.error('خطا در حذف کالا');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('کالا به‌روزرسانی شد!');
    },
    onError: () => {
      toast.error('خطا در به‌روزرسانی کالا');
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('با موفقیت خارج شدید!');
    navigate('/login');
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این کالا را حذف کنید؟')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleSaveProduct = (product) => {
    if (product.id) {
      updateProductMutation.mutate(product);
    } else {
      addProductMutation.mutate(product);
    }
  };

  if (loading) return <p>در حال بررسی ورود...</p>;
  if (isLoading) return <p>در حال دریافت لیست کالاها...</p>;

  const products = data?.data || [];

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.containner}>
      

      <SearchBox
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="جستجو بر اساس نام کالا..."
      />

      <div className={styles.header}>
        <div>
          <button
        onClick={handleAddProduct}
        style={{ margin: '1rem', padding: '0.5rem 1rem' }}
      >
        افزودن محصول
      </button>

      <button
        onClick={handleLogout}
        style={{ margin: '1rem', padding: '0.5rem 1rem' }}
      >
        خروج
      </button>
        </div>

      <div className={styles.managment}>
        <img src={managment} alt="" />
        <p>مدیریت کالا</p>
      </div>
      </div>

      <table>
        <thead>
          <tr>
            <th >نام کالا</th>
            <th >موجودی</th>
            <th >قیمت</th>
            <th >شناسه</th>
            <th >عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td >{product.name}</td>
              <td >{product.inventory}</td>
              <td >{product.price}</td>
              <td >{product.id}</td>
              <td >
                <button onClick={() => handleEditProduct(product)} >
                  <img src={edit} alt="" />
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  <img src={trash} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProduct}
        initialData={selectedProduct}
      />
    </div>
  );
}

export default Dashboard;
