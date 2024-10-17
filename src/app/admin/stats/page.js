'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Loader from '../products/Loader'; // Import your Loader component

const StatsPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [stats, setStats] = useState(null);
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
          setStats(
            {
                "totalProducts": 100,
                "totalSales": 15000,
                "highestRequestedItem": {
                  "name": "Product A",
                  "requests": 200
                },
                "lowestRequestedItem": {
                  "name": "Product B",
                  "requests": 10
                }
              }
              
          )
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
            className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
            >
            Pending Orders
            </button>
            <button
            onClick={() => router.push('/admin/stats')}
            className="w-full text-left py-2 px-4 bg-primary text-white rounded hover:bg-accent transition"
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
          <h1 className="text-3xl font-bold">Statistics</h1>
          <div className="text-gray-600">Logged in as: {email}</div>
        </header>

        <main className="p-6">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Total Sales</h2>
                <p className="text-3xl font-bold">${stats.totalSales}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Highest Requested Item</h2>
                <p className="text-lg">{stats.highestRequestedItem.name}</p>
                <p className="text-2xl font-bold">{stats.highestRequestedItem.requests} requests</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Lowest Requested Item</h2>
                <p className="text-lg">{stats.lowestRequestedItem.name}</p>
                <p className="text-2xl font-bold">{stats.lowestRequestedItem.requests} requests</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StatsPage;
