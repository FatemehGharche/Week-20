import React, { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setInventory(initialData.inventory);
      setPrice(initialData.price);
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

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000,
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px'
      }}>
        <h2>{initialData ? 'ویرایش کالا' : 'اضافه کردن کالا'}</h2>
        <div>
          <label>نام کالا:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label>موجودی:</label><br />
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>
        <div>
          <label>قیمت:</label><br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit" style={{ marginRight: '1rem' }}>
            ذخیره
          </button>
          <button type="button" onClick={onClose}>
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
