import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";

const Cashier = () => {
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

  const [filteredUnPaidOrders, setFilteredUnPaidOrders] = useState([]);
  const [unPaidOrders, setUnPaidOrders] = useState([]);

  //set orders with respective to their payment status
  const setOrders = useCallback(() => {
    if (user && orders) {
      const unpaid = orders.filter(
        (order) =>
          order.paymentStatus == "pending" && order.orderStatus == "served"
      );

      if (JSON.stringify(unPaidOrders) !== JSON.stringify(unpaid)) {
        setUnPaidOrders(unpaid);
      }
    }
  }, [orders, user, unPaidOrders]);

  useEffect(() => {
    setOrders();
  }, [setOrders]);

  useEffect(() => {
    setFilteredUnPaidOrders(unPaidOrders);
  }, [unPaidOrders]);

  //on table search
  const tableSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setFilteredUnPaidOrders(unPaidOrders);
      return;
    }

    const searches = unPaidOrders.filter((order) =>
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

    setFilteredUnPaidOrders(searches);
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

  return (
    <div className="main-cashier-orders-container">
      <div className="heading">
        <h1>Cashiers Desk</h1>
      </div>
      {orders ? (
        <div className="all-orders">
          <div className="sub-heading">
            <h1>Unpaid Orders</h1>
            <Link href="/cashier/paid" className="link">
              <p>Go To Paid Orders</p>
              <FaArrowRight />
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
            {filteredUnPaidOrders.length > 0 ? (
              filteredUnPaidOrders.map((order, index) => (
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
                        const isConfirmed = window.confirm(
                          `Confirm table ${order.table} has completed payment of Ksh.${order.totalAmount}`
                        );

                        if (!isConfirmed) {
                          return;
                        }
                        markOrderAsPaid(order._id);
                      }}
                    >
                      Mark Order As Paid
                    </button>
                    <p>Total : {order.totalAmount}</p>
                    <button>
                      <Link
                        href={`/cashier/${order._id}`}
                        className="flex flex-row gap-5"
                      >
                        <AiFillPrinter /> Print Bill
                      </Link>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-present">
                <h1>Seems there are no served unpaid orders.</h1>
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

export default Cashier;
