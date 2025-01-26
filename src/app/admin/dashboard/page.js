'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import { jwtDecode } from 'jwt-decode'; // Fix: remove the curly braces from jwtDecode import
import DashboardOverview from './DashboardOverview'
import Sidebar from '../components/Sidebar';

export default function AdminDashboard() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


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

  if(!isMobile) {
    return (
        <div className="bg-backgroud dark:bg-darkBackground flex">
        <Sidebar 
          onCurrent={'dashboard'}
        />
      
    
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
        onName={'Admin Dashboard'}
        />
        {/* Main Section */}
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Welcome to your dashboard!</h2>
          <DashboardOverview />
        </main>
      </div>
    </div>
    
      );
    }
    if (isMobile) {
        return (
          <div className="dark:bg-darkSecondary flex flex-col">
            {/* Header with Hamburger Menu */}
            <header className="bg-white shadow flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="text-gray-600 text-sm">Logged in as: {email}</div>
              <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
                {/* Hamburger Icon */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </header>
    
            {/* Side Navigation Menu */}
            {isMenuOpen && (
              <aside className="bg-background shadow-lg p-4 absolute top-0 left-0 w-full h-full z-10">
                <nav className="flex flex-col space-y-4">
                  <button
                    onClick={() => router.push('/admin/dashboard')}
                    className="py-2 px-4 bg-primary text-white rounded hover:bg-accent transition"
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
                    className="py-2 px-4 bg-background text-secondary rounded hover:bg-accent transition"
                  >
                    Settings
                  </button>
                </nav>
              </aside>
            )}
    
            {/* Main Section */}
            <main className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Welcome to your dashboard!</h2>
              <div className="mx-4 p-4 md:mx-10 md:p-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-primary dark:text-darkPrimary">Total Products</h2>
                    <p className="text-3xl mt-2 text-secondary dark:text-darkAccent">56</p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-primary dark:text-darkPrimary">Pending Orders</h2>
                    <p className="text-3xl mt-2 text-secondary dark:text-darkAccent">12</p>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-primary dark:text-darkPrimary">Highest Requested Item</h2>
                    <p className="text-2xl mt-2 text-secondary dark:text-darkAccent">Product A</p>
                    </div>
                </div>
                </div>

            </main>
          </div>
        );
    }
    return null;
};
