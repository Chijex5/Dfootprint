'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const StatsPage = () => {
  const products = [
    { name: "Product A", sales: 120, stock: 80 },
    { name: "Product B", sales: 200, stock: 50 },
    { name: "Product C", sales: 150, stock: 70 },
    { name: "Product D", sales: 80, stock: 100 },
    { name: "Product E", sales: 50, stock: 30 },
  ];

  const totalProducts = products.length;
  const totalSold = products.reduce((sum, product) => sum + product.sales, 0);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const bestSellingProduct = products.reduce((prev, current) =>
    prev.sales > current.sales ? prev : current
  );


  

  return (
    <div className="bg-background dark:bg-darkBackground text-primary dark:text-darkPrimary min-h-screen flex ">
      <Sidebar onCurrent="statistics" />
      <div className='flex flex-1 flex-col'>
      <Header onName="Statistics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mb-6 ">
        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Sold</h3>
          <p className="text-3xl font-bold">{totalSold}</p>
        </div>

        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Stock</h3>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>

        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Best Seller</h3>
          <p className="text-xl font-medium">{bestSellingProduct.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sales: {bestSellingProduct.sales}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6">
        <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Product Details</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Sales</th>
                <th className="text-left p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.sales}</td>
                  <td className="p-2">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
