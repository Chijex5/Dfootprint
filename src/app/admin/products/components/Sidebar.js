"use client";
import React from "react";
import { Home, Box, ClipboardList, Settings, PackagePlus } from "lucide-react";

const Sidebar = ({ onMenuSelect }) => {
  const menuItems = [
    { label: "Dashboard", icon: <Home />, value: "dashboard" },
    { label: "Add Product", icon: <PackagePlus />, value: "add-product" },
    { label: "Products", icon: <Box />, value: "products" },
    { label: "Orders", icon: <ClipboardList />, value: "orders" },
    { label: "Settings", icon: <Settings />, value: "settings" },
  ];

  return (
    <div className="w-64 h-screen bg-background dark:bg-darkSecondary shadow-lg flex flex-col">
      <div className="p-6 border-b border-primary dark:border-darkAccent">
        <h1 className="text-xl font-bold text-primary dark:text-darkPrimary">Admin Board</h1>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.value}
            onClick={() => onMenuSelect(item.value)}
            className="flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-transparent hover:bg-accent dark:hover:bg-darkAccent text-primary dark:text-darkPrimary hover:text-white"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <footer className="p-4 border-t border-primary dark:border-darkAccent">
        <p className="text-sm text-secondary dark:text-darkAccent">© 2025 D&apos;Footprint </p>
      </footer>
    </div>
  );
};

export default Sidebar;
