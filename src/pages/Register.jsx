import React from 'react';
import { useForm } from 'react-hook-form';



function Register() {

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password !== data.repeatPassword) {
      alert('رمز عبور و تکرار آن یکسان نیستند!');
      return;
    }

    console.log('Form Data:', data);
    alert('ثبت‌نام با موفقیت انجام شد!');
  };



    console.log('Form Data:', data);
    alert('ثبت‌نام با موفقیت انجام شد!')

  return (
    <div>
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>ثبت‌نام</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>نام کاربری:</label>
          <input type="text" {...register('username', { required: true })} />
          {errors.username && <p style={{ color: 'red' }}>نام کاربری الزامی است.</p>}
        </div>
        <div>
          <label>رمز عبور:</label>
          <input type="password" {...register('password', { required: true })} />
          {errors.password && <p style={{ color: 'red' }}>رمز عبور الزامی است.</p>}
        </div>
        <div>
          <label>تکرار رمز عبور:</label>
          <input type="password" {...register('repeatPassword', { required: true })} />
          {errors.repeatPassword && <p style={{ color: 'red' }}>تکرار رمز عبور الزامی است.</p>}
        </div>
        <button type="submit">ثبت‌نام</button>
      </form>
      <p>
        قبلاً ثبت‌نام کردی؟ <a href="/login">ورود</a>
      </p>
    </div>
    </div>
  )
}

export default Register
