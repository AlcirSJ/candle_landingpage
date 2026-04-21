import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: productName,
      price: productPrice,
      description: productDescription,
    });
    setProductName('');
    setProductPrice('');
    setProductDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Product Price:</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Product Description:</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;