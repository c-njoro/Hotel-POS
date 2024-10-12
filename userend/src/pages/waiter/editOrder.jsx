import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const EditOrder = () => {
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
  const [myOrders, setMyOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [servedOrders, setServedOrders] = useState([]);

  //putting orders in place
  const setOrders = useCallback(() => {
    if (orders && user) {
      const ordersByMyName = orders.filter(
        (order) => order.waiter.waiterId === user._id
      );
      setMyOrders(ordersByMyName);
    }
  }, [orders, user]);

  useEffect(() => {
    setOrders();
  }, [setOrders]);

  //separating orders in terms of their status
  const separateOrders = useCallback(() => {
    const ready = myOrders.filter((order) => order.orderStatus === "ready");
    const served = myOrders.filter((order) => order.orderStatus === "served");
    const preparing = myOrders.filter(
      (order) => order.orderStatus === "preparing"
    );

    // Only update if the orders are different
    if (JSON.stringify(ready) !== JSON.stringify(readyOrders)) {
      setReadyOrders(ready);
    }
    if (JSON.stringify(served) !== JSON.stringify(servedOrders)) {
      setServedOrders(served);
    }
    if (JSON.stringify(preparing) !== JSON.stringify(preparingOrders)) {
      setPreparingOrders(preparing);
    }
  }, [myOrders, readyOrders, servedOrders, preparingOrders]);

  useEffect(() => {
    if (myOrders.length > 0) {
      separateOrders();
    }
  }, [myOrders, separateOrders]);

  //refetch orders at render of the page
  useEffect(() => {
    refetchOrders();
  }, [refetchOrders]);

  //marking ready orders as served
  const setOrderToServed = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          orderStatus: "served",
        }
      );

      refetchOrders();
    } catch (error) {
      console.log("Could not set order to served:", error);
    }
  };

  return (
    <div className="main-editorders-container">
      <div className="heading">
        <h1> my orders</h1>
      </div>
      {orders ? (
        <div className="all-orders">
          {myOrders?.length > 0 ? (
            <div className="orders-separate">
              <div className="sub-heading">
                <h1>Ready Orders</h1>
              </div>
              <div className="order-part">
                {readyOrders.length > 0 ? (
                  readyOrders.map((order, index) => (
                    <div className="an-order" key={index}>
                      <p>Table: {order.table}</p>
                      <p>Waiting to be served</p>
                      <button
                        onClick={() => {
                          setOrderToServed(order._id);
                        }}
                      >
                        Mark as served
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="not-present">
                    <h1>No ready orders for you</h1>
                  </div>
                )}
              </div>

              <div className="sub-heading">
                <h1>In preparation</h1>
              </div>
              <div className="order-part">
                {preparingOrders.length > 0 ? (
                  preparingOrders.map((order, index) => (
                    <div className="an-order" key={index}>
                      <p>Table: {order.table}</p>
                      <p>Kitchen is preparing this order</p>
                    </div>
                  ))
                ) : (
                  <div className="not-present">
                    <h1>None of tour orders are in preparation</h1>
                  </div>
                )}
              </div>

              <div className="sub-heading">
                <h1>My served orders</h1>
              </div>
              <div className="order-part">
                {servedOrders.length > 0 ? (
                  servedOrders.map((order, index) => (
                    <div className="an-order" key={index}>
                      <p>Table: {order.table}</p>
                      <p>Order was served</p>
                    </div>
                  ))
                ) : (
                  <div className="not-present">
                    <h1>You have not served any orders</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-orders">
              <p>There is no orders on your name.</p>
              <button onClick={setOrders}>Try Again</button>
            </div>
          )}
        </div>
      ) : ordersLoading ? (
        <div>Loading</div>
      ) : ordersError ? (
        <div>Error Loading Orders</div>
      ) : (
        <div>Did not fetch orders</div>
      )}
    </div>
  );
};

export default EditOrder;
