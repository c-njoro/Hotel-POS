"use client";

import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";

const PrintOrder = ({ currentOrder }) => {
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
        <button>
          <AiFillPrinter /> Print Bill
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
