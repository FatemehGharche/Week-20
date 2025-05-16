import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, addProduct, deleteProduct, updateProduct } from '../api/auth.js';
import { toast } from 'react-toastify';
import Modal from './Modal'; 

function Dashboard() {
  const [loading, setLoading] = useState(true);
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

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>خوش اومدی به داشبورد!</h1>
      <p>تو الان وارد حساب کاربری‌ات شدی.</p>

      <button
        onClick={handleAddProduct}
        style={{ margin: '1rem', padding: '0.5rem 1rem' }}
      >
        اضافه کردن کالا جدید
      </button>

      <button
        onClick={handleLogout}
        style={{ margin: '1rem', padding: '0.5rem 1rem' }}
      >
        خروج
      </button>

      <table
        style={{
          margin: '2rem auto',
          borderCollapse: 'collapse',
          width: '80%',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>نام کالا</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>موجودی</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>قیمت</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>شناسه</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{product.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{product.inventory}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{product.price}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{product.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                <button onClick={() => handleEditProduct(product)} style={{ marginRight: '0.5rem' }}>
                  ویرایش
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>حذف</button>
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
