"use client";

import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import { useRouter } from "next/router";
import { AiFillPrinter } from "react-icons/ai";
import { BsCashStack } from "react-icons/bs";
import { FaCcVisa } from "react-icons/fa";

const PrintOrder = ({ currentOrder }) => {
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
  const router = useRouter();
  const { refetch: refetchOrders } = useOrders();

  //mark orders as paid using the cash method
  const markOrderAsPaid = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_ORDERS_URL}/update/${id}`,
        {
          paymentStatus: "paid",
        }
      );

      refetchOrders();
      router.push("/");
    } catch (error) {
      console.log("Could not mark as paid due to : ", error);
    }
  };

  //make payment via card or m-pesa
  const makePayment = async (e) => {
    e.preventDefault();

    localStorage.setItem("paidId", currentOrder._id);

    try {
      const response = await axios.post(
        "/api/sendPayment",
        {
          amount: currentOrder.totalAmount,
          email: "c-starhotel@gmail.com",
          redirect: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success`,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 && response.data) {
        console.log("Payment response: ", response.data.checkout_url);
        window.location.href = response.data.checkout_url; // Redirect user to payment page
      } else {
        alert("Payment failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="main-bill-container">
      <div className="the-bill">
        <div className="hotel">
          <h1>C Star Restaurant</h1>
        </div>
        <div className="dishes-holder">
          <div className="one-dish">
            <p>Dish</p>
            <p>Unit Price</p>
            <p>Total Price</p>
          </div>

          {currentOrder ? (
            currentOrder.dishes ? (
              currentOrder.dishes.map((dish, index) => (
                <div className="one-dish" key={index}>
                  <p>
                    {dish.quantity}-{dish.dishName}
                  </p>
                  <p>{dish.unitPrice}</p>
                  <p>{dish.totalPrice}</p>
                </div>
              ))
            ) : (
              <div className="no-dishes">No Dishes In the order</div>
            )
          ) : (
            <div className="no-order">No Order</div>
          )}
        </div>

        <div className="bill-total">
          <p>Total Price</p>
          <p>{currentOrder.totalAmount}</p>
        </div>

        <div className="more-details">
          <p>Served By: {currentOrder.waiter.name}</p>
          <p>Order Time: {currentOrder.dateCreated}</p>
        </div>

        <div className="welcome-again">
          <p>Thankyou for visiting c-star, welcome again for another meal!</p>
        </div>
      </div>

      <div className="btn">
        <button
          onClick={async () => {
            try {
              const notifyWaiter = await axios.post(
                `${process.env.NEXT_PUBLIC_MESSAGES_URL}/create`,
                {
                  sender: user._id,
                  receiver: currentOrder.waiter.waiterId,
                  text: `Cashier: Your bill for table: ${currentOrder.table} has been printed out. Pick at the cashiers counter.`,
                }
              );
            } catch (error) {
              console.log("Could not notify the waiter: ", error);
            }
          }}
        >
          <AiFillPrinter /> Print Bill
        </button>
      </div>
      <div className="btn">
        <button
          onClick={() => {
            const isConfirmed = window.confirm(
              `Confirm table ${currentOrder.table} has completed payment of Ksh.${currentOrder.totalAmount}`
            );

            if (!isConfirmed) {
              return;
            }
            markOrderAsPaid(currentOrder._id);
          }}
        >
          <BsCashStack /> Pay Cash
        </button>
      </div>
      <div className="btn">
        <button onClick={makePayment}>
          <FaCcVisa /> Pay Card / M-Pesa
        </button>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ORDERS_URL}`);
  const orders = response.data;

  const allPaths = orders.map((od) => {
    return {
      params: {
        order: od._id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.order;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ORDERS_URL}/findOne/${id}`
  );
  const currentOrder = res.data;
  return { props: { currentOrder } };
}

export default PrintOrder;
