'use client';
const baseUrl = "https://chijex5-backend2-1.onrender.com"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous errors

    try {
        const response = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      
        const data = await response.json();
      
        if (response.ok) {
          // Store the token if login is successful
          localStorage.setItem('token', data.token);
      
          // Redirect to the admin dashboard
          router.push('/admin/dashboard');
        } else {
          // Display error message from the response, or a default message
          setError(data.message || 'Login failed. Please check your credentials and try again.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    };
      

  return (
    <div className="flex items-center text-primary justify-center min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e0e5e9]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl border border-[#295255] max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-[#295255] text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>}
        <div className="mb-6 text-primary">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-[#c3cbd2] rounded-md focus:outline-none text-primary focus:ring-2 focus:ring-[#295255] focus:border-transparent transition duration-300"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 border border-[#c3cbd2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#295255] focus:border-transparent transition duration-300"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-[#295255] text-white font-semibold rounded-lg hover:bg-[#203f42] transition duration-300 shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
