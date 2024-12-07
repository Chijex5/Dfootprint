'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from './Loader'; // Import a custom loader component
import CustomModal from './CustomModal'; // Import your custom modal component
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import ImageOverlayPopup from './ImageOverlayPopup';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [section, setSection] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isActionLoading, setIsActionLoading] = useState(false);


  const handleOpenPopup = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImageUrl('');
  };

  const baseUrl = "https://chijex5-backend2-1.onrender.com"

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      showCustomModal('Error', 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setModalContent({
      isOpen: true,
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      onConfirm: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseUrl}/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            setProducts((prev) => prev.filter((product) => product.id !== id));
            showCustomModal('Success', 'Product deleted successfully');
          }else{
            showCustomModal('Error', 'Failed to delete product');
          }
        } catch (error) {
          console.error('Error deleting product:', error);
          showCustomModal('Error', 'Failed to delete product');
        }
      },
    });
  };

  const handleEdit = (product) => {
    setShowAddForm(true)
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setSection(product.section);
    setImageUrl(null); // Reset imageUrl
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !section) {
      showCustomModal('Error', 'All fields are required');
      return;
    }
    const token = localStorage.getItem('token');
    const productData = {
      name,
      price,
      section,
      image_url: imageUrl ? URL.createObjectURL(imageUrl) : editingProduct.image_url, // Use existing image if not changing
    };

    try {
      const response = await fetch(`${baseUrl}/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === editingProduct.id ? { ...product, ...productData } : product))
      );

      setName('');
      setPrice('');
      setSection('');
      setImageUrl(null);
      setEditingProduct(null); // Clear the editing state
      showCustomModal('Success', 'Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      showCustomModal('Error', 'Failed to update product');
    }
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
  
      // Assuming `product` contains name, price, section, and image
      formData.append('name', name);
      formData.append('price', price);
      formData.append('section',  section);
  
      // Assuming `product.image` contains the file object
      formData.append('image', imageUrl);
  
      const response = await fetch(`${baseUrl}/api/products/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const newProduct = await response.json();
        setProducts((prev) => [...prev, newProduct]);
        setName('');
        setPrice('');
        setSection('');
        setImageUrl(null);
        showCustomModal('Success', 'Product added successfully');
      } else {
        const errorData = await response.json();
        showCustomModal('Error', `Failed to add product: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      showCustomModal('Error', 'Failed to add product');
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const showCustomModal = (title, message, onConfirm = null) => {
    setModalContent({
        isOpen: true,
        title,
        message,
        onConfirm,
    });

    setTimeout(() => {
        setModalContent({
            isOpen: false,
            title: '',
            message: '',
            onConfirm: null,
        });
    }, 3000); // Automatically close after 3 seconds
  };


  const closeModal = () => {
    setModalContent({
      isOpen: false,
    });
  };

  const handleConfirm = () => {
    if (modalContent.onConfirm) {
      modalContent.onConfirm();
      setModalContent((prev) => ({ ...prev, isOpen: false, onConfirm: null })); // Clear callback after confirmation
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/admin/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          router.push('/admin/login');
        } else {
          setEmail(decodedToken.sub);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    }
  }, [router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Enable click for mobile
    };

    checkMobile(); // Check on initial render

    window.addEventListener('resize', checkMobile); // Check when window resizes

    return () => {
      window.removeEventListener('resize', checkMobile); // Clean up listener
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if(!isMobile) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
          {/* Sidebar */}
          <aside className="bg-background shadow text-secondary w-64 p-6 flex flex-col h-screen">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav className="flex-grow space-y-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/admin/products')}
                className="w-full text-left py-2 px-4 bg-primary text-white rounded hover:bg-accent transition"
              >
                Manage Products
              </button>
              <button
                onClick={() => router.push('/admin/orders')}
                className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                View Orders
              </button>
              <button
                onClick={() => router.push('/admin/orders/pending')}
                className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Pending Orders
              </button>
              <button
                onClick={() => router.push('/admin/stats')}
                className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Item Stats
              </button>
            </nav>
            <button
              onClick={() => router.push('/admin/settings')} // Adjust the route as needed
              className="mt-4 w-full py-2 px-4 bg-primary rounded hover:bg-accent transition"
            >
              Settings
            </button>
          </aside>
    
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow p-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-primary">Product Management</h1>
              <div className="text-secondary">Logged in as: {email}</div>
            </header>
            <main className="p-6">
              {/* Add Product Button */}
              <button
                onClick={() => setShowAddForm((prev) => !prev)}
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-accent transition-all duration-300 mb-6"
              >
                {showAddForm ? 'Cancel' : 'Add Product'}
              </button>
    
              {/* Add Product Form */}
              {showAddForm && (
                <form onSubmit={editingProduct ? handleSubmit : addProduct} className="mb-6">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full mb-4"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 w-full mb-4"
                  />
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                    className="border p-2 w-full mb-4"
                    >
                    <option value="" disabled>Select Section</option>
                    <option value="male">Male Section</option>
                    <option value="female">Female Section</option>
                    </select>
                    <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageUrl(e.target.files[0]); // Set imageUrl as File object
            }}
            className="w-full p-4 border border-secondary text-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          />

          {/* Image Preview */}
          {imageUrl && (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(imageUrl)}
                alt="Product Preview"
                width={640}
                height={480}
                className="object-cover rounded"
              />
            </div>
          )}

          {!imageUrl && editingProduct && (
            <div className="mt-4">
              <h3>Current Image:</h3>
              <Image
                src={editingProduct.image_url}
                alt="Current Product"
                width={640}
                height={480}
                className="object-cover rounded"
              />
            </div>
          )}
                  <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg" disabled={isActionLoading}>
                    {isActionLoading ? 'Loading...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
    
                </form>
              )}
    
              {/* Product List */}
              {loading ? (
                <Loader />
            ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead>
                    <tr>
                    <th className="py-3 px-6 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-6 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-6 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Section</th>
                    <th className="py-3 px-6 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-primary">
                    {products.map((product) => (
                    <tr key={product.id}>
                        <td className="py-3 px-6 border-b border-gray-200">{product.name}</td>
                        <td className="py-3 px-6 border-b border-gray-200">{product.price}</td>
                        <td className="py-3 px-6 border-b border-gray-200">{product.section}</td>
                        <td className="py-3 px-6 border-b border-gray-200 flex space-x-2">
                        <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleOpenPopup(product.image_url)}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition"
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </main>
        </div>
    
          {/* Modal for confirmation */}
          <CustomModal
            isOpen={modalContent.isOpen}
            title={modalContent.title}
            message={modalContent.message}
            onConfirm={handleConfirm}
            onClose={closeModal}
          />
    
          {/* Image Overlay Popup */}
          <ImageOverlayPopup isOpen={isPopupOpen} onClose={handleClosePopup} imageUrl={selectedImageUrl} />
        </div>
      );
  }
  if(isMobile) {
    return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="text-gray-600 text-sm">Logged in as: {email}</div>
              <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                {/* Hamburger Icon */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </header>

        {/* Sidebar for Mobile (Hidden on larger screens) */}
        {isMenuOpen && (
            <aside className="bg-background shadow-lg p-4 absolute top-0 left-0 w-full h-full z-10">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/admin/products')}
                className="py-2 px-4 bg-primary text-white rounded hover:bg-accent transition"
              >
                Manage Products
              </button>
              <button
                onClick={() => router.push('/admin/orders')}
                className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                View Orders
              </button>
              <button
                onClick={() => router.push('/admin/orders/pending')}
                className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Pending Orders
              </button>
              <button
                onClick={() => router.push('/admin/stats')}
                className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Item Stats
              </button>
              <button
                onClick={() => router.push('/admin/settings')}
                className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
              >
                Settings
              </button>
            </nav>
            </aside>
        )}

        {/* Main Content */}
        <main className="p-4 flex-1">
            {/* Add Product Button */}
            <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-accent transition-all duration-300 mb-4 w-full"
            >
            {showAddForm ? 'Cancel' : 'Add Product'}
            </button>

            {/* Add/Edit Product Form */}
            {showAddForm && (
            <form onSubmit={editingProduct ? handleSubmit : addProduct} className="mb-4">
                <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mb-4"
                />
                <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 w-full mb-4"
                />
                <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                className="border p-2 w-full mb-4"
                >
                <option value="" disabled>Select Section</option>
                <option value="male">Male Section</option>
                <option value="female">Female Section</option>
                </select>
                <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageUrl(e.target.files[0]); // Set imageUrl as File object
            }}
            className="w-full p-4 border border-secondary text-primary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
          />

          {/* Image Preview */}
          {imageUrl && (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(imageUrl)}
                alt="Product Preview"
                width={640}
                height={480}
                className="object-cover rounded"
              />
            </div>
          )}

          {!imageUrl && editingProduct && (
            <div className="mt-4">
              <h3>Current Image:</h3>
              <Image
                src={editingProduct.image_url}
                alt="Current Product"
                width={640}
                height={480}
                className="object-cover rounded"
              />
            </div>
          )}
                <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg w-full">
                {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
            </form>
            )}

            {/* Product List */}
            {loading ? (
            <Loader />
            ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <thead>
                    <tr>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-100 text-xs font-medium text-gray-600 text-left">Name</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-100 text-xs font-medium text-gray-600 text-left">Price</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-100 text-xs font-medium text-gray-600 text-left">Section</th>
                    <th className="py-3 px-4 border-b border-gray-200 bg-gray-100 text-xs font-medium text-gray-600 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-primary">
                    {products.map((product) => (
                    <tr key={product.id}>
                        <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{product.price}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{product.section}</td>
                        <td className="py-2 px-4 border-b border-gray-200 flex space-x-2">
                        <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleOpenPopup(product.image_url)}
                            className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-accent transition"
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </main>

        {/* Modal for confirmation */}
        <CustomModal
            isOpen={modalContent.isOpen}
            title={modalContent.title}
            message={modalContent.message}
            onConfirm={handleConfirm}
            onCancel={() => setModalContent({ ...modalContent, isOpen: false })}
        />

        {/* Image Overlay Popup */}
        <ImageOverlayPopup isOpen={isPopupOpen} onClose={handleClosePopup} imageUrl={selectedImageUrl} />
        </div>
    );
  }
  return null;
};

export default ProductManagementPage;
