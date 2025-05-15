import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


function Register() {

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

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('ثبت‌نام با موفقیت انجام شد!');
  };


  return (
     <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>ثبت‌نام</h2>
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

        <div>
          <label>تکرار رمز عبور:</label>
          <input type="password" {...register('repeatPassword')} />
          {errors.repeatPassword && (
            <p style={{ color: 'red' }}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <button type="submit">ثبت‌نام</button>
      </form>
      <p>
        قبلاً ثبت‌نام کردی؟ <a href="/login">ورود</a>
      </p>
    </div>
  )
}

export default Register
