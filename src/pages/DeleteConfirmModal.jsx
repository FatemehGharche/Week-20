import React from 'react';

import styles from './DeleteConfirmModal.module.css';
import icon from '../assets/Close.png'; 

function DeleteConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img src={icon} alt="حذف" className={styles.icon} />
        <p className={styles.text}>آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onCancel}>
            لغو
          </button>
          <button className={styles.deleteButton} onClick={onConfirm}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
