import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaChartPie, FaCog, FaHome, FaUserFriends } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useOrders from "../hooks/orderHook";
import useStock from "../hooks/stockHook";
import useUsers from "../hooks/usersHook";

import {
  CheckCircle,
  Clock,
  DollarSign,
  Loader,
  ShoppingCart,
} from "lucide-react";

// Define the type for the sections object
interface Sections {
  [key: string]: ReactNode;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("users");

  //orders
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders, // Refetch function to refresh orders data
  } = useOrders();
  const [paid, setPaid] = useState([]);
  const [unpaid, setUnpaid] = useState([]);
  const [preparing, setPreparing] = useState([]);
  const [ready, setReady] = useState([]);
  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 8000 },
  ];

  const orderStatusData = [
    { status: "Completed", count: paid.length },
    { status: "Waiting Payment", count: unpaid.length },
    { status: "Ready & Unserved", count: ready.length },
    {
      status: "Preparing",
      count: preparing.length,
    },
    { status: "Cancelled", count: 2 },
  ];

  const userActivityData = [
    { day: "Monday", activeUsers: 8 },
    { day: "Tuesday", activeUsers: 9 },
    { day: "Wednesday", activeUsers: 10 },
    { day: "Thursday", activeUsers: 7 },
    { day: "Friday", activeUsers: 13 },
    { day: "Saturday", activeUsers: 8 },
    { day: "Sunday", activeUsers: 9 },
  ];

  const salesData = [
    { week: "Week 1", sales: 5000 },
    { week: "Week 2", sales: 7000 },
    { week: "Week 3", sales: 8000 },
    { week: "Week 4", sales: 6000 },
  ];

  //users
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers();

  //stock
  const {
    data: stock,
    isLoading: stockLoading,
    error: stockError,
  } = useStock();

  useEffect(() => {
    if (orders) {
      setPaid(orders.filter((or) => or.paymentStatus === "paid"));
      setUnpaid(
        orders.filter(
          (or) => or.paymentStatus === "pending" && or.orderStatus === "served"
        )
      );
      setPreparing(orders.filter((or) => or.orderStatus === "preparing"));
      setReady(orders.filter((or) => or.orderStatus === "ready"));
    }
  }, [orders]);

  // Sections content mapped to their keys
  const sections: Sections = {
    analytics: (
      <div className="p-6 bg-input rounded-lg shadow-md">
        <h2 className="font-heading text-lg mb-4">Analytics Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Revenue Trends */}
          <div className="bg-header p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-8">Revenue Trends</h3>
            <LineChart width={400} height={200} data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </div>

          {/* Order Status Breakdown */}
          <div className="bg-header p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-8">Order Status</h3>
            <PieChart width={300} height={200}>
              <Pie
                data={orderStatusData}
                dataKey="count"
                nameKey="status"
                outerRadius={80}
                fill="#8884d8"
              />
              <Tooltip />
            </PieChart>
          </div>

          {/* User Activity Trends */}
          <div className="bg-header p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-8">User Activity Trends</h3>
            <BarChart width={400} height={200} data={userActivityData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="activeUsers" fill="#3498db" />
            </BarChart>
          </div>
        </div>

        {/* Sales Performance */}
        <div className="bg-header p-4 rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold mb-8">Sales Performance</h3>
          <LineChart width={400} height={200} data={salesData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#ff7300" />
          </LineChart>
        </div>
      </div>
    ),
    overview: (
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-heading">Overview</h1>
          {/* <Button variant="outline" onClick={refetchOrders}>
    <RefreshCw className="mr-2 h-4 w-4" /> Refresh
  </Button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Total Orders */}
          <div className="p-6 bg-input rounded-lg shadow-md flex gap-8 items-center">
            <ShoppingCart className="text-primary w-10 h-10" />
            <div>
              <h2 className="font-heading text-lg">Total Orders</h2>
              <p className="text-3xl font-bold text-primary">
                {orders ? orders.length : "Loading..."}
              </p>
            </div>
          </div>

          {/* Expected Revenue */}
          <div className="p-6 bg-input rounded-lg shadow-md flex gap-8 items-center">
            <DollarSign className="text-green-600 w-10 h-10" />
            <div>
              <h2 className="font-heading text-lg">Expected Revenue</h2>
              <p className="text-3xl font-bold text-green-600">
                {orders
                  ? orders
                      .reduce((total, order) => total + order.totalAmount, 0)
                      .toFixed(2)
                  : "Loading..."}
              </p>
            </div>
          </div>

          {/* Completed Payments */}
          <div className="p-6 bg-input rounded-lg shadow-md flex gap-8 items-center">
            <CheckCircle className="text-green-800 w-10 h-10" />
            <div>
              <h2 className="font-heading text-lg">
                Completed Payments ({paid.length})
              </h2>
              <p className="text-3xl font-bold text-green-800">
                {paid.length > 0
                  ? paid
                      .reduce((total, order) => total + order.totalAmount, 0)
                      .toFixed(2)
                  : "00.00"}
              </p>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="p-6 bg-input rounded-lg shadow-md flex gap-8 items-center">
            <Clock className="text-yellow-500 w-10 h-10" />
            <div>
              <h2 className="font-heading text-lg">
                Pending Payments ({unpaid.length})
              </h2>
              <p className="text-3xl font-bold text-yellow-500">
                {unpaid.length > 0
                  ? unpaid
                      .reduce((total, order) => total + order.totalAmount, 0)
                      .toFixed(2)
                  : "00.00"}
              </p>
            </div>
          </div>

          {/* Waiting to Be Served */}
          <div className="p-6 bg-input rounded-lg shadow-md flex gap-8 items-center">
            <Loader className="text-yellow-900 w-10 h-10 animate-spin" />
            <div>
              <h2 className="font-heading text-lg">
                Waiting to Be Served ({ready.length})
              </h2>
              <p className="text-3xl font-bold text-yellow-900">
                {ready.length > 0
                  ? ready
                      .reduce((total, order) => total + order.totalAmount, 0)
                      .toFixed(2)
                  : "00.00"}
              </p>
            </div>
          </div>

          {/* In Preparation */}
          <div className="p-6 bg-input rounded-lg shadow-md flex gap-8 items-center">
            <Loader className="text-orange-500 w-10 h-10 animate-pulse" />
            <div>
              <h2 className="font-heading text-lg">
                In Preparation ({preparing.length})
              </h2>
              <p className="text-3xl font-bold text-orange-500">
                {preparing.length > 0
                  ? preparing
                      .reduce((total, order) => total + order.totalAmount, 0)
                      .toFixed(2)
                  : "00.00"}
              </p>
            </div>
          </div>
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
              <th className="p-3">Track More</th>
            </tr>
          </thead>
          {users ? (
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td
                    className={`p-3 ${
                      user.isActive ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {user.isActive ? "Online" : "Offline"}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/manager/${user._id}`}
                      className="text-orange-500"
                    >
                      Performance
                    </Link>
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

    settings: (
      <div className="p-6 bg-input rounded-lg shadow-md">
        <h2 className="font-heading text-lg mb-4">Settings</h2>
        <p>Configure application preferences here.</p>
      </div>
    ),
    stock: (
      <div className="bg-input rounded-lg shadow-md p-6">
        <h2 className="font-heading text-lg mb-4 font-bold">
          Stock Management
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          {stock ? (
            <tbody>
              {stock.map((stk, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-3">{stk.name}</td>
                  <td className="p-3">{stk.quantity}</td>
                  <td className="p-3">{stk.unit}</td>
                  <td
                    className={`p-3 ${
                      stk.quantity > stk.threshold
                        ? "text-green-600"
                        : stk.quantity === 0
                        ? "text-red-600"
                        : "text-orange-600"
                    }`}
                  >
                    {stk.quantity > stk.threshold
                      ? "Safe"
                      : stk.quantity === 0
                      ? "Finished"
                      : "Below Minimum"}
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
  };

  return (
    <div className="min-h-[calc(90vh)] bg-blue-200  text-foreground font-body">
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-primary  p-4 space-y-4">
          <h1 className="font-heading text-2xl mb-6">Admin Panel</h1>
          <ul className="space-y-4">
            <li
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded hover:font-bold ${
                activeSection === "analytics"
                  ? "bg-blue-100 border-l-2 border-green-500"
                  : ""
              }`}
            >
              <FaChartPie className="mr-3" />
              Analytics
            </li>

            <li
              onClick={() => setActiveSection("overview")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded hover:font-bold ${
                activeSection === "overview"
                  ? "bg-blue-100 border-l-2 border-green-500"
                  : ""
              }`}
            >
              <FaHome className="mr-3" />
              Overview
            </li>
            <li
              onClick={() => setActiveSection("users")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded hover:font-bold ${
                activeSection === "users"
                  ? "bg-blue-100 border-l-2 border-green-500"
                  : ""
              }`}
            >
              <FaUserFriends className="mr-3" />
              Users
            </li>
            <li
              onClick={() => setActiveSection("stock")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded hover:font-bold ${
                activeSection === "stock"
                  ? "bg-blue-100 border-l-2 border-green-500"
                  : ""
              }`}
            >
              <MdOutlineInventory className="mr-3" />
              stock
            </li>

            <li
              onClick={() => setActiveSection("settings")}
              className={`flex items-center p-3 cursor-pointer hover:bg-primary-dark rounded hover:font-bold ${
                activeSection === "settings"
                  ? "bg-blue-100 border-l-2 border-green-500"
                  : ""
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
