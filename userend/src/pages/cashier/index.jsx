import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import { useEffect, useState } from "react";

const index = () => {
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

  const [paidOrders, setPaidOrders] = useState([]);
  const [unPaidOrders, setUnPaidOrders] = useState([]);

  //set orders with respective to their payment status
  const setOrders = () => {
    if (user && orders) {
      const unpaid = orders.filter((order) => order.paymentStatus == "pending");
      const paid = orders.filter((order) => order.paymentStatus == "paid");
      setPaidOrders(paid);
      setUnPaidOrders(unpaid);
    }
  };

  useEffect(() => {
    setOrders();
  }, [orders, user]);

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
    <div>
      <div>
        <h1>Cashiers Desk</h1>
      </div>
      <div>
        {orders ? (
          <div>
            <h1>All Unpaid Orders+</h1>
            {unPaidOrders.length > 0 ? (
              unPaidOrders.map((order, index) => (
                <div key={index} className="mb-6">
                  <p>Table: {order.table}</p>
                  {order.dishes.map((dish, index) => (
                    <div key={index}>
                      <p>{`${dish.quantity} ${dish.dishName}`}</p>
                      <p>{dish.totalPrice}</p>
                    </div>
                  ))}
                  <p>Order Totals : {order.totalAmount}</p>
                  <p>Served By : {order.waiter.name}</p>
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
                </div>
              ))
            ) : (
              <div>Orders Present but all paid!!!</div>
            )}
          </div>
        ) : ordersLoading ? (
          <div>Orders Loading ...</div>
        ) : ordersError ? (
          <div>An error occured while loading orders</div>
        ) : (
          <div>Did not fetch orders from database</div>
        )}
      </div>

      <div>
        {orders ? (
          <div>
            <h1>All Paid Orders</h1>
            {paidOrders.length > 0 ? (
              paidOrders.map((order, index) => (
                <div key={index} className="mb-6">
                  <p>Table: {order.table}</p>
                  {order.dishes.map((dish, index) => (
                    <div key={index}>
                      <p>{`${dish.quantity} ${dish.dishName}`}</p>
                      <p>{dish.totalPrice}</p>
                    </div>
                  ))}
                  <p>Order Totals : {order.totalAmount}</p>
                  <p>Served By : {order.waiter.name}</p>
                  <button
                    onClick={() => {
                      markOrderAsUnPaid(order._id);
                    }}
                  >
                    Revert to Unpaid
                  </button>
                </div>
              ))
            ) : (
              <div>Orders Present but no paid orders</div>
            )}
          </div>
        ) : ordersLoading ? (
          <div>Orders Loading ...</div>
        ) : ordersError ? (
          <div>An error occured while loading orders</div>
        ) : (
          <div>Did not fetch orders from database</div>
        )}
      </div>
    </div>
  );
};

export default index;
