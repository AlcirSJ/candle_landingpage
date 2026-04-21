import React, { useState } from 'react';

interface Product {
  name: string;
  price: number;
  description: string;
}

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(productPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    onSubmit({
      name: productName,
      price,
      description: productDescription,
    });
    setProductName('');
    setProductPrice('');
    setProductDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productName">Product Name:</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="productPrice">Product Price:</label>
        <input
          id="productPrice"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
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