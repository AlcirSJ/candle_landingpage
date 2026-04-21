import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import axios from 'axios';

// Define a Product type for better type safety
interface Product {
  name: string;
  price: string;
  description: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();

  // Simulated authentication check
  const isAuthenticated = false; // Replace with real authentication logic

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleProductSubmit = async (product: Product) => {
    try {
      const response = await axios.post('/api/products', product); // Replace with your database API endpoint
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Manage your products here.</p>
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};

export default AdminPanel;