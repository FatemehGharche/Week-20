import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required('نام کاربری الزامی است.'),
    password: yup.string().required('رمز عبور الزامی است.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
      localStorage.setItem('token', result.token);
      toast.success('ورود موفقیت‌آمیز بود!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'خطا در ورود. لطفاً دوباره تلاش کنید.';
      toast.error(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>ورود</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>نام کاربری:</label>
          <input type="text" {...register('username')} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div>
          <label>رمز عبور:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <button type="submit">ورود</button>
      </form>
      <p>
        حساب نداری؟ <a href="/register">ثبت‌نام</a>
      </p>
    </div>
  );
}

export default Login;

