import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from "./Login.module.css"
import logo from '../assets/Union.png'

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
    <div className={styles.container}>
      <img src={logo} alt="" />
      <h2>فرم ورود</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filed}>
          <label>نام کاربری</label>
          <input type="text" {...register('username')} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div className={styles.filed}>
          <label>رمز عبور</label>
          <input type="password" {...register('password')} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={styles.button}>ورود</button>
      </form>
      <p>
        <a href="/register">ایجاد حساب کاربری!</a>
      </p>
    </div>
  );
}

export default Login;

