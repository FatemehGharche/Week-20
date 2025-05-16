import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/auth.js';
import { toast } from 'react-toastify';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('با موفقیت خارج شدید!');
    navigate('/login');
  };

  if (loading) return <p>در حال بررسی ورود...</p>;

  if (isLoading) return <p>در حال دریافت لیست کالاها...</p>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>خوش اومدی به داشبورد!</h1>
      <p>تو الان وارد حساب کاربری‌ات شدی.</p>
      <button
        onClick={handleLogout}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
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
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
              نام کالا
            </th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
              موجودی
            </th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
              قیمت
            </th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
              شناسه
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data?.data) ? (
            data.data.map((product) => (
              <tr key={product.id}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  {product.name}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  {product.inventory}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  {product.price}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  {product.id}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">کالایی برای نمایش وجود ندارد</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
