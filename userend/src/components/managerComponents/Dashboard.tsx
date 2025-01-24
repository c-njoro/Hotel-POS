import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaChartPie, FaCog, FaHome, FaUserFriends } from "react-icons/fa";
import useOrders from "../hooks/orderHook";
import useUsers from "../hooks/usersHook";

// Define the type for the sections object
interface Sections {
  [key: string]: ReactNode;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("overview");

  //orders
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useOrders();
  const [paid, setPaid] = useState([]);
  const [unpaid, setUnpaid] = useState([]);

  //users
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();

  useEffect(() => {
    if (orders) {
      setPaid(orders.filter((or) => or.paymentStatus === "paid"));
      setUnpaid(orders.filter((or) => or.paymentStatus === "pending"));
    }
  }, [orders]);

  // Sections content mapped to their keys
  const sections: Sections = {
    overview: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-input rounded-lg shadow-md">
          <h2 className="font-heading text-lg mb-4">Total Orders</h2>
          {orders ? (
            <p className="text-3xl font-bold text-primary">{orders.length}</p>
          ) : ordersLoading ? (
            <p>Loading...</p>
          ) : ordersError ? (
            <p className="text-red-500">Error Loading orders</p>
          ) : (
            <p>Orders were not fetched</p>
          )}
        </div>
        <div className="p-6 bg-input rounded-lg shadow-md">
          <h2 className="font-heading text-lg mb-4">Expected Revenue</h2>
          {orders ? (
            <p className="text-3xl font-bold text-primary text-green-600">
              {orders
                .reduce((total, order) => total + order.totalAmount, 0)
                .toFixed(2)}
            </p>
          ) : ordersLoading ? (
            <p>Loading...</p>
          ) : ordersError ? (
            <p className="text-red-500">Error Loading orders</p>
          ) : (
            <p>Orders were not fetched</p>
          )}
        </div>
        <div className="p-6 bg-input rounded-lg shadow-md">
          <h2 className="font-heading text-lg mb-4">
            Completed Payments({paid.length})
          </h2>
          {paid.length > 0 ? (
            <p className="text-3xl font-bold text-green-800">
              {paid
                .reduce((total, order) => total + order.totalAmount, 0)
                .toFixed(2)}
            </p>
          ) : (
            <p className="text-3xl font-bold text-green-800">00.00</p>
          )}
        </div>
        <div className="p-6 bg-input rounded-lg shadow-md">
          <h2 className="font-heading text-lg mb-4">
            Pending Payments({unpaid.length})
          </h2>
          {unpaid.length > 0 ? (
            <p className="text-3xl font-bold text-yellow-500">
              {unpaid
                .reduce((total, order) => total + order.totalAmount, 0)
                .toFixed(2)}
            </p>
          ) : (
            <p className="text-3xl font-bold text-green-800">00.00</p>
          )}
        </div>
      </div>
    ),
    users: (
      <div className="bg-input rounded-lg shadow-md p-6">
        <h2 className="font-heading text-lg mb-4 font-bold">User Management</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          {users ? (
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.isActive ? "Online" : "Offline"}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div>
              <p>Loading users...</p>
            </div>
          )}
        </table>
      </div>
    ),
    analytics: (
      <div className="p-6 bg-input rounded-lg shadow-md">
        <h2 className="font-heading text-lg mb-4">Analytics</h2>
        <div className="h-64 bg-header flex items-center justify-center rounded-lg">
          <p>Chart Placeholder</p>
        </div>
      </div>
    ),
    settings: (
      <div className="p-6 bg-input rounded-lg shadow-md">
        <h2 className="font-heading text-lg mb-4">Settings</h2>
        <p>Configure application preferences here.</p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-blue-200  text-foreground font-body">
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-primary  p-4 space-y-4">
          <h1 className="font-heading text-2xl mb-6">Admin Panel</h1>
          <ul className="space-y-4">
            <li
              onClick={() => setActiveSection("overview")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded ${
                activeSection === "overview" ? "bg-primary-dark" : ""
              }`}
            >
              <FaHome className="mr-3" />
              Overview
            </li>
            <li
              onClick={() => setActiveSection("users")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded ${
                activeSection === "users" ? "bg-primary-dark" : ""
              }`}
            >
              <FaUserFriends className="mr-3" />
              Users
            </li>
            <li
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded ${
                activeSection === "analytics" ? "bg-primary-dark" : ""
              }`}
            >
              <FaChartPie className="mr-3" />
              Analytics
            </li>
            <li
              onClick={() => setActiveSection("settings")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded ${
                activeSection === "settings" ? "bg-primary-dark" : ""
              }`}
            >
              <FaCog className="mr-3" />
              Settings
            </li>
          </ul>
          <Link
            href={`/manager/Management`}
            target="_blank"
            className="flex items-center p-3 mt-6 bg-green-600 hover:bg-green-700 rounded w-full"
          >
            Main Management
          </Link>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">{sections[activeSection]}</main>
      </div>
    </div>
  );
};

export default Dashboard;
