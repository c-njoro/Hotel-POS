import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Kitchen = () => {
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

  const [unReadyOrders, setUnReadyOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);

  useEffect(() => {
    refetchOrders();
  }, []);

  //setting orders
  const setOrders = () => {
    if ((orders, user)) {
      const unprepared = orders.filter(
        (order) => order.orderStatus == "preparing"
      );
      setUnReadyOrders(unprepared);
      const prepared = orders.filter((order) => order.orderStatus == "ready");
      setReadyOrders(prepared);
    }
  };

  useEffect(() => {
    setOrders();
  }, [orders, user]);

  //marking order as ready or reversing to unready
  const markOrderAsReady = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          orderStatus: "ready",
        }
      );
      toast.success("Order marked as ready!!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      refetchOrders();
    } catch (error) {
      console.log("Could not set order to ready:", error);
    }
  };

  const markOrderAsUnReady = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          orderStatus: "preparing",
        }
      );
      toast.success("Order reversed to preparing state!!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      refetchOrders();
    } catch (error) {
      console.log("Could not set order to unready:", error);
    }
  };

  return (
    <div className="main-kitchen-orders-container">
      <div className="heading">
        <h1>Order Management</h1>
      </div>
      {orders ? (
        <div className="all-orders">
          <div className="sub-heading">
            <h1>Orders in Preparation</h1>
          </div>

          <div className="order-holder">
            {unReadyOrders.length > 0 ? (
              unReadyOrders.map((order, index) => (
                <div className="an-order" key={index}>
                  <div className="top">
                    <h1>Table : {order.table}</h1>
                    <h1>Waiter: {order.waiter.name}</h1>
                  </div>
                  <div className="dishes">
                    {order.dishes.length > 0 ? (
                      order.dishes.map((dish, index) => (
                        <div className="dish" key={index}>
                          <p>Dish {index + 1}</p>
                          <p>{dish.dishName}</p>
                          <p>{dish.unitPrice}</p>
                          <p>X{dish.quantity}</p>
                        </div>
                      ))
                    ) : (
                      <h1>
                        Seems the order was wrongly created without dishes
                      </h1>
                    )}
                  </div>
                  <div className="btn">
                    <button
                      onClick={() => {
                        markOrderAsReady(order._id);
                      }}
                    >
                      Mark as ready
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-present">
                <h1>You have no orders in preparation</h1>
              </div>
            )}
          </div>

          <div className="sub-heading">
            <h1>Ready and Unserved</h1>
          </div>

          <div className="order-holder">
            {readyOrders.length > 0 ? (
              readyOrders.map((order, index) => (
                <div className="an-order" key={index}>
                  <div className="top">
                    <h1>Table : {order.table}</h1>
                    <h1>Waiter: {order.waiter.name}</h1>
                  </div>
                  <div className="dishes">
                    {order.dishes.length > 0 ? (
                      order.dishes.map((dish, index) => (
                        <div className="dish" key={index}>
                          <p>Dish {index + 1}</p>
                          <p>{dish.dishName}</p>
                          <p>{dish.unitPrice}</p>
                          <p>X{dish.quantity}</p>
                        </div>
                      ))
                    ) : (
                      <h1>
                        Seems the order was wrongly created without dishes
                      </h1>
                    )}
                  </div>
                  <div className="btn">
                    <button
                      onClick={() => {
                        markOrderAsUnReady(order._id);
                      }}
                    >
                      Reverse to unready
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-present">
                <h1>Seems no ready orders are unserved</h1>
              </div>
            )}
          </div>
        </div>
      ) : ordersLoading ? (
        <div className="loading">
          <h1>Loading orders...</h1>
        </div>
      ) : ordersError ? (
        <div className="error">
          <h1>Error Loading Orders</h1>
        </div>
      ) : (
        <div className="no">
          <h1>Did not fetch orders</h1>
        </div>
      )}
    </div>
  );
};

export default Kitchen;
