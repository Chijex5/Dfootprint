'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Loader from '../products/Loader'; // Import your Loader component

const SettingsPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);  // Enable click for mobile
      } else {
        setIsMobile(false); // Disable click for desktop, enable hover
      }
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

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    router.push('/admin/login'); // Redirect to the login page
  };

  if (!isMobile) {
    return (
        <div className="min-h-screen text-primary bg-gray-100 flex">
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
                className="w-full text-left py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
                >
                Item Stats
                </button>
            </nav>
            <button
                onClick={() => router.push('/admin/settings')} // Adjust the route as needed
                className="mt-4 w-full py-2 px-4 text-background bg-secondary rounded hover:bg-primary transition"
            >
                Settings
            </button>
            </aside>
    
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow p-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Settings</h1>
              <div className="text-gray-600">Logged in as: {email}</div>
            </header>
    
            <main className="p-6 flex-grow">
              {loading ? (
                <Loader />
              ) : (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <p className="mb-4">Manage your account settings here.</p>
                  
                  {/* Additional settings can be added here */}
    
                  <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      );
  }
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center rounded">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="text-gray-600 text-sm">Logged in as: {email}</div>
          <button onClick={toggleMenu} className="text-gray-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          </button>
        </header>

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
              className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
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
              className="py-2 px-4 bg-primary text-white rounded hover:bg-accent transition"
            >
              Settings
            </button>
          </nav>
        </aside>
        )}

        <main className="flex-grow p-4 bg-white rounded-lg shadow mt-4">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <p className="mb-4">Manage your account settings here.</p>
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  return null; // No rendering for non-mobile, if you want to handle it differently.
};

export default SettingsPage;
