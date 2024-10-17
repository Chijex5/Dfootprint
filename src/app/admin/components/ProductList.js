// src/app/admin/components/ProductList.js
import { useEffect, useState } from 'react';

const ProductList = ({ onDelete }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion of a product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id); // Call the callback to update the list
        fetchProducts(); // Refresh the product list
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary">Product List</h2>
      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
              <p className="text-lg text-gray-700">${product.price}</p>
              <p className="text-sm text-gray-500">Section: {product.section}</p>
              <img src={product.image_url} alt={product.name} className="mt-2 h-32 w-full object-cover rounded" />
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
