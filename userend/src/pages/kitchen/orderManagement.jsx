import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import { useEffect, useState } from "react";

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

  //marking order as ready
  const markOrderAsReady = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          orderStatus: "ready",
        }
      );

      refetchOrders();
    } catch (error) {
      console.log("Could not set order to ready:", error);
    }
  };

  return (
    <div>
      <h1>Order Management : Kitchen</h1>
      <div>
        <div>
          <h1>Orders in Preparation</h1>
        </div>
        {orders ? (
          <div>
            <div>
              <h1>All Orders Are Present</h1>
            </div>

            <div>
              {unReadyOrders.length > 0 ? (
                unReadyOrders.map((order, index) => (
                  <div key={index}>
                    <div>
                      <p>Table : {order.table}</p>
                      <p>Status: {order.orderStatus}</p>
                    </div>
                    <div>
                      <h1>Dishes</h1>
                      {order.dishes.map((dish, index) => (
                        <div key={index}>
                          <p>{dish.dishName}</p>
                          <p>X{dish.quantity}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          markOrderAsReady(order._id);
                        }}
                      >
                        Set To Ready
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>Seems there are no orders yet to be prepared</div>
              )}
            </div>
          </div>
        ) : ordersLoading ? (
          <div>Loading</div>
        ) : ordersError ? (
          <div>Error Loading Orders</div>
        ) : (
          <div>Order fetching was not performed</div>
        )}
      </div>

      <div>
        <div>
          <h1> Ready Orders</h1>
        </div>
        {orders ? (
          <div>
            <h1>All Orders Are Available</h1>
            {readyOrders.length > 0 ? (
              <div>
                <div>
                  <h1>Ready Orders</h1>
                </div>
                <div>
                  {readyOrders.map((order, index) => (
                    <div key={index}>
                      <div>
                        <p>Table: {order.table}</p>
                        <p>Status : {order.orderStatus}</p>
                      </div>
                      <div>
                        <h1>Dishes</h1>
                        {order.dishes.map((dish, index) => (
                          <div key={index}>
                            <p>{dish.dishName}</p>
                            <p>X{dish.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>Seems there are no ready orders yet to be served</div>
            )}
          </div>
        ) : ordersLoading ? (
          <div>Loading</div>
        ) : ordersError ? (
          <div>Error Loading Orders</div>
        ) : (
          <div>Order fetching was not performed</div>
        )}
      </div>
    </div>
  );
};

export default Kitchen;
