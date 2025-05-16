import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setInventory(initialData.inventory || '');
      setPrice(initialData.price || '');
    } else {
      setName('');
      setInventory('');
      setPrice('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !inventory || !price) {
      alert('لطفا همه فیلدها را پر کنید');
      return;
    }
    onSubmit({
      name,
      inventory: Number(inventory),
      price: Number(price),
      id: initialData?.id,
    });
    onClose();
  };

  const isEditMode = Boolean(initialData);

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.modalContent}>
        <h2 className={styles.title}>
          {isEditMode ? 'ویرایش اطلاعات' : 'ایجاد محصول جدید'}
        </h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>نام کالا</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام کالا"
            className={styles.input}
            autoFocus
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>تعداد موجودی</label>
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            placeholder="تعداد"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>قیمت</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="قیمت"
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={onClose} className={styles.buttonSecondary}>
            انصراف
          </button>
          <button type="submit" className={styles.buttonPrimary}>
            {isEditMode ? 'ثبت اطلاعات جدید' : 'ایجاد'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
