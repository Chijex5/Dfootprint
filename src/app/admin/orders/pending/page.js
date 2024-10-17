'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Loader from '../Loader'; // Import your Loader component

const PendingOrdersPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
          fetchPendingOrders();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    }
  }, [router]);

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('/api/orders/pending'); // Adjust API endpoint as needed
      const data = await response.json();
      setPendingOrders(data);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-secondary flex">
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
            className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
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
            className="w-full text-left py-2 px-4 bg-primary text-white rounded hover:bg-accent transition"
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
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pending Orders</h1>
          <div className="text-gray-600">Logged in as: {email}</div>
        </header>

        <main className="p-6">
          {loading ? (
            <Loader />
          ) : pendingOrders.length === 0 ? (
            <p className="text-gray-600">No pending orders available.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-200 p-2">Order ID</th>
                  <th className="border border-gray-200 p-2">Customer Name</th>
                  <th className="border border-gray-200 p-2">Total Amount</th>
                  <th className="border border-gray-200 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order.id}>
                    <td className="border border-gray-200 p-2">{order.id}</td>
                    <td className="border border-gray-200 p-2">{order.customerName}</td>
                    <td className="border border-gray-200 p-2">${order.totalAmount}</td>
                    <td className="border border-gray-200 p-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default PendingOrdersPage;
