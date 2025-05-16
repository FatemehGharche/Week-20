import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from "./Register.module.css"
import logo from '../assets/Union.png'

function Register() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required('نام کاربری الزامی است.'),
    password: yup
      .string()
      .required('رمز عبور الزامی است.')
      .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد.'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'رمز عبور و تکرار آن باید یکسان باشند.')
      .required('تکرار رمز عبور الزامی است.'),
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
      const result = await registerUser({
        username: data.username,
        password: data.password,
      });

      localStorage.setItem('token', result.token);
      toast.success('ثبت‌نام موفقیت‌آمیز بود!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="" />
      <h2>فرم ثبت نام</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.filed}>
          <label>نام کاربری:</label>
          <input type="text" {...register('username')} />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div className={styles.filed}>
          <label>رمز عبور:</label>
          <input type="password" {...register('password')} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div className={styles.filed}>
          <label>تکرار رمز عبور:</label>
          <input type="password" {...register('repeatPassword')} />
          {errors.repeatPassword && (
            <p style={{ color: 'red' }}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <button type="submit" className={styles.button} >
          ثبت‌نام
        </button>
      </form>
      <p className={styles.link}>
           <a href="/login">حساب کاربری دارید؟</a>
      </p>
    </div>
  );
}

export default Register;

