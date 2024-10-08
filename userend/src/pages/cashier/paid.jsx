import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

const paid = () => {
  const {
    data: sessionData,
    isLoading: sessionLoading,
    error: sessionError,
    refetch: refetchSession,
  } = useSessionHook();
  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
  } = useUser(sessionData?.email);
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useOrders();

  const [filteredPaidOrders, setFilteredPaidOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);

  //set orders with respective to their payment status
  const setOrders = () => {
    if (user && orders) {
      const paid = orders.filter((order) => order.paymentStatus == "paid");
      setPaidOrders(paid);
    }
  };

  useEffect(() => {
    setOrders();
  }, [orders, user]);

  useEffect(() => {
    setFilteredPaidOrders(paidOrders);
  }, [paidOrders]);

  //on table search
  const tableSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setFilteredPaidOrders(paidOrders);
      return;
    }

    const searches = paidOrders.filter((order) =>
      order.table.includes(searchTerm)
    );

    if (searches.length <= 0) {
      toast.error("The table you have entered has nor unpaid order!!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setFilteredPaidOrders(searches);
  };

  //mark orders as paid or unpaid
  const markOrderAsPaid = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          paymentStatus: "paid",
        }
      );

      refetchOrders();
    } catch (error) {
      console.log("Could not mark as paid due to : ", error);
    }
  };

  const markOrderAsUnPaid = async (id) => {
    const managerPassword = process.env.NEXT_PUBLIC_MANAGER_AUTH;
    const userPassword = window.prompt(
      "Manager Enter Password To Revert To Unpaid: "
    );

    if (managerPassword !== userPassword) {
      alert("Wrong Password");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          paymentStatus: "pending",
        }
      );

      refetchOrders();
    } catch (error) {
      console.log("Could not mark as unpaid due to : ", error);
    }
  };

  return (
    <div className="main-cashier-orders-container">
      <div className="heading">
        <h1>Cashiers Desk</h1>
      </div>
      {orders ? (
        <div className="all-orders">
          <div className="sub-heading">
            <h1>Paid Orders</h1>
            <Link href="/cashier" className="link">
              <FaArrowLeftLong />
              <p>UnPaid Orders</p>
            </Link>
          </div>

          <div className="search-part">
            <label htmlFor="table">Search</label>
            <input
              type="text"
              id="table"
              name="table"
              placeholder="Enter table..."
              onChange={tableSearch}
            />
          </div>
          <div className="order-holder">
            {filteredPaidOrders.length > 0 ? (
              filteredPaidOrders.map((order, index) => (
                <div className="an-order" key={index}>
                  <div className="top">
                    <h1>Table : {order.table}</h1>
                    <h1>Served by: {order.waiter.name}</h1>
                  </div>

                  <div className="dishes">
                    {order.dishes.length > 0 ? (
                      order.dishes.map((dish, index) => (
                        <div className="dish" key={index}>
                          <p>X{dish.quantity}</p>
                          <p>{dish.dishName}</p>
                          <p>{dish.unitPrice}</p>
                          <p>{dish.totalPrice}</p>
                        </div>
                      ))
                    ) : (
                      <h1>
                        Seems the order was wrongly created without dishes
                      </h1>
                    )}
                  </div>
                  <div className="totals">
                    <button
                      onClick={() => {
                        markOrderAsUnPaid(order._id);
                      }}
                    >
                      Revert To Unpaid
                    </button>
                    <p>Total : {order.totalAmount}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-present">
                <h1>Seems there are no served and paid orders.</h1>
              </div>
            )}
          </div>
        </div>
      ) : ordersLoading ? (
        <div>
          <h1>Loading Orders</h1>
        </div>
      ) : ordersError ? (
        <div>
          <h1>Error Loading orders</h1>
        </div>
      ) : (
        <div>
          <h1>Did not fetch orders</h1>
        </div>
      )}
    </div>
  );
};

export default paid;
