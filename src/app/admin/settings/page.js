"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const SettingsPage = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", position: "Manager" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", position: "Supervisor" },
  ]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    position: "",
    password: "",
  });
  const [passwordChange, setPasswordChange] = useState("");

  const [showAddAdminForm, setShowAddAdminForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const notify = (message, type = "info") => {
    toast[type](message, { position: "top-right", autoClose: 3000 });
  };

  const handleInputChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.position || !newAdmin.password) {
      notify("All fields are required to add an admin!", "error");
      return;
    }

    setAdmins([...admins, { ...newAdmin, id: admins.length + 1 }]);
    setNewAdmin({ name: "", email: "", position: "", password: "" });
    setShowAddAdminForm(false);
    notify("Admin added successfully!", "success");
  };

  const handleRemoveAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
    notify("Admin removed successfully!", "success");
  };

  const handleChangePassword = () => {
    if (!passwordChange) {
      notify("Password cannot be empty!", "error");
      return;
    }
    setPasswordChange("");
    setShowChangePasswordForm(false);
    notify("Password changed successfully!", "success");
  };

  const handleLogout = () => {
    notify("Logged out successfully!", "info");
    // Add your logout logic here
  };

  return (
    <div className="bg-background dark:bg-darkBackground text-secondary dark:text-darkAccent min-h-screen flex">
      <Sidebar onCurrent="settings" />
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        <Header onName="Admin Settings" />
        <div className="p-8">

      {/* Add Admin Section */}
      <div className="mb-8 p-6 bg-white text-secondary dark:bg-darkSecondary rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl dark:text-white font-semibold">Add New Admin</h2>
          <button
            onClick={() => setShowAddAdminForm(!showAddAdminForm)}
            className="px-4 py-2 bg-accent hover:bg-accent/90 dark:bg-darkAccent dark:hover:bg-darkAccent/90 text-white rounded-lg"
          >
            {showAddAdminForm ? "Cancel" : "Add Admin"}
          </button>
        </div>
        {showAddAdminForm && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newAdmin.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-3 border rounded-md focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-3 border rounded-md focus:outline-none"
            />
            <input
              type="text"
              name="position"
              value={newAdmin.position}
              onChange={handleInputChange}
              placeholder="Position"
              className="p-3 border rounded-md focus:outline-none"
            />
            <input
              type="password"
              name="password"
              value={newAdmin.password}
              onChange={handleInputChange}
              placeholder="Default Password"
              className="p-3 border rounded-md focus:outline-none"
            />
            <button
              onClick={handleAddAdmin}
              className="col-span-2 px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Admin List Section */}
      <div className="mb-8 p-6 bg-white text-secondary dark:bg-darkSecondary  dark:text-white rounded-lg shadow-md">
        <h2 className="text-2xl text-primary dark:text-white font-semibold mb-4">Current Admins</h2>
        <ul className="grid grid-cols-1 gap-4">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="flex items-center justify-between text-primary dark:text-darkAccent border rounded-lg p-4 shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold">{admin.name}</h3>
                <p className="text-sm">{admin.email}</p>
                <p className="text-sm">Position: {admin.position}</p>
              </div>
              <button
                onClick={() => handleRemoveAdmin(admin.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Change Password Section */}
      <div className="mb-8 p-6 bg-white text-secondary dark:bg-darkSecondary  rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold dark:text-white">Change Password</h2>
          <button
            onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}
            className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg"
          >
            {showChangePasswordForm ? "Cancel" : "Change Password"}
          </button>
        </div>
        {showChangePasswordForm && (
          <div className="mt-4">
            <input
              type="password"
              value={passwordChange}
              onChange={(e) => setPasswordChange(e.target.value)}
              placeholder="New Password"
              className="p-3 border rounded-md w-full focus:outline-none"
            />
            <button
              onClick={handleChangePassword}
              className="mt-4 px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Logout Section */}
      <div className="p-6 bg-white text-secondary dark:bg-darkSecondary  rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Logout</h2>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Logout
        </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SettingsPage;
