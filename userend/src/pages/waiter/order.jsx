import useDishes from "@/components/hooks/dishHook";
import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Order = () => {
  const router = useRouter();
  const message = "Any progress you made will not be saved. Confirm exit!";
  const {
    data: dishes,
    isLoading: dishesLoading,
    error: dishesError,
    refetch: refetchDishes,
  } = useDishes();
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

  const [dishesList, setDishesList] = useState([]);
  const [dishesFetched, setDishesFetched] = useState([]);
  const nameSearchRef = useRef("");
  const [filteredDishes, setFilteredDishes] = useState([]);

  const [orderClass, setOrderClass] = useState("show");
  const [dishClass, setDishClass] = useState("hide");

  //i will use the following while submiting my order
  const [table, setTable] = useState("");
  const [fetchedCounts, setCounts] = useState({});
  const [total, setTotal] = useState();
  const waiter = { name: user?.name, waiterId: user?._id };
  const [dishesToBeSent, setSentDishes] = useState([]);

  //functions to toggle between dishes and order display
  const orderToDishes = () => {
    setOrderClass("hide");
    setDishClass("show");
  };

  const dishesToOrder = () => {
    setOrderClass("show");
    setDishClass("hide");
  };

  //function to store dishes into the filtered dishes for easy manipulation
  useEffect(() => {
    setFilteredDishes(dishes);
  }, [dishes]);

  //handle the input table field
  const tableInput = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setTable(inputValue);
  };

  //function to confirm that the products in the order are correct
  const setUpDishes = () => {
    //first clear it
    setSentDishes([]);

    //now map trhough the confirmed dishes
    Object.values(fetchedCounts).map((dish) => {
      setSentDishes((previousState) => [
        ...previousState,
        {
          dishId: dish._id,
          dishName: dish.name,
          quantity: dish.count,
          unitPrice: dish.price,
          totalPrice: dish.price * dish.count,
        },
      ]);
    });

    toast.success(
      "Dishes confirmed, click Submit to kitchen to complete the order!!",
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  //this submits and creates the order
  const submittingOrder = async () => {
    if (dishesToBeSent && table.length > 0) {
      try {
        const newOrder = await axios.post(
          `${process.env.NEXT_PUBLIC_ORDERS_URL}/create`,
          {
            table: table,
            totalAmount: total,
            dishes: dishesToBeSent,
            waiter: waiter,
          }
        );

        toast.success("Order submited to kitchen!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        //clear everything after the order has been made
        setDishesFetched([]);
        setDishesList([]);
        setSentDishes([]);
        setTable([]);
        refetchOrders();
      } catch (error) {
        console.log("The error while creating order was: ", error);
        toast.error("Error sending the order !!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      console.log("Some data Still missing");
      if (table.length < 1) {
        toast.error("Please input the table to serve!!", {
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
    }
  };

  //a function to fetch bulk dishes from the ones selected by the user
  const fetchThem = async () => {
    const url = `${process.env.NEXT_PUBLIC_DISHES_URL}/fetchBulk`;

    const response = await axios.post(url, {
      ids: dishesList,
    });

    const allDishesFetched = await response.data;
    setDishesFetched(allDishesFetched);
  };

  useEffect(() => {
    if (dishesList.length > 0) {
      fetchThem();
    } else {
      setDishesFetched([]);
    }
  }, [dishesList]);

  //this is for counting occurences of a dish in the fetched dishes, i then returns an object which has dishes ids as their names and
  //their data in them and also add an attribute count which indicates how many times it has appeared
  useEffect(() => {
    if (dishesFetched.length > 0) {
      const countOccurrences = () => {
        let tempCounts = {};
        dishesFetched.forEach((obj) => {
          if (tempCounts[obj._id]) {
            tempCounts[obj._id].count++;
          } else {
            tempCounts[obj._id] = { ...obj, count: 1 };
          }
        });
        setCounts(tempCounts);
      };

      countOccurrences();
    }
  }, [dishesFetched]);

  //this goes through all the dishes fetched and gets their total, it goes though them even without having to count them
  useEffect(() => {
    if (dishesFetched.length > 0) {
      const dishesAndTotals = dishesFetched.map((dish) => ({
        ...dish,
        total: dish.price,
      }));
      const grandTotal = dishesAndTotals.reduce(
        (sum, dish) => sum + dish.total,
        0
      );
      const rounded = parseFloat(grandTotal.toFixed(2));
      setTotal(rounded);
    } else {
      setTotal(0);
    }
  }, [dishesFetched]);

  //these functions manipulate dishes in the order, adding , increasing, reducing and also complete removal from the order
  const addDishToOrder = (id) => {
    setSentDishes([]);
    const count = dishesList.filter((iD) => iD === id).length;
    if (count < 1) {
      setDishesList((previousState) => [...previousState, id]);
      toast.success("Dish added to order !!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.warn("Already in the order, increase from there !!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    dishesToOrder();
  };

  const increaseDishOrder = (id) => {
    setDishesList((previousState) => [...previousState, id]);
  };

  const reduceDishInOrder = (id) => {
    const count = dishesList.filter((iD) => iD === id).length;
    if (count >= 1) {
      toast.warn("Only one remaining!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setDishesList((previousState) => {
      const count = previousState.filter((iD) => iD === id).length;
      if (count > 1) {
        setSentDishes([]);
        const newDishes = [...previousState];
        const firstIndex = newDishes.indexOf(id);
        if (firstIndex !== -1) {
          newDishes.splice(firstIndex, 1);
        }
        return newDishes;
      } else {
        console.log("Only one remaining");
        return previousState;
      }
    });
  };

  const removeDishFromOrder = (id) => {
    setDishesList((previousState) => {
      return previousState.filter((iD) => iD !== id);
    });
    toast.success("Dish removed from order", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  //this is meant to prevent the user from leaving the page without saving the progress
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!window.confirm(message)) {
        router.events.emit("routeChangeError");
        throw "Route change cancelled";
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  //here is the code for searching through dishes to finding the one the user wants
  //on change of the input
  const onSearchNameInput = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setFilteredDishes(dishes);
    }
    const searchedDishes = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchedDishes.length > 0) {
      setFilteredDishes(searchedDishes);
      return;
    }

    setFilteredDishes((previousState) => [...previousState]);
  };

  //this is now the page rendered
  return (
    <div className="main-order-container">
      <div className="heading">
        <h1>Make A new order</h1>
      </div>

      <div className={`${orderClass}`}>
        <div className={`the-order`}>
          <form className="table-form">
            <label htmlFor="table">Table: </label>
            <input
              type="text"
              name="table"
              id="table"
              onChange={tableInput}
              value={table}
            />
          </form>
          <div className="dishes-selected">
            {dishesFetched.length > 0 ? (
              Object.values(fetchedCounts).map((dish, index) => (
                <div key={dish._id} className="dish">
                  <div className="intro">
                    <p>Dish {index + 1}</p>
                    <p>{dish.name}</p>
                    <button
                      onClick={() => {
                        removeDishFromOrder(dish._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="info">
                    <div className="image-side">
                      <Image
                        width={200}
                        height={150}
                        src={`${dish.image}`}
                        className="image"
                        alt="dish image"
                      ></Image>
                    </div>

                    <div className="prices">
                      <p>Price: {dish.price}</p>
                      <p>Total: {dish.price * dish.count}</p>
                    </div>

                    <div className="numbers">
                      <button
                        className="bg-red-400 hover:bg-red-700"
                        onClick={() => {
                          reduceDishInOrder(dish._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>
                      <p>{dish.count}</p>
                      <button
                        className="bg-green-400 hover:bg-green-700"
                        onClick={() => {
                          increaseDishOrder(dish._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1>No dishes Yet</h1>
              </div>
            )}
          </div>
          <div className="totals heading">
            <h1>Order total: {total ? `${total}` : "__"}</h1>
          </div>
          <div className="add-new" onClick={orderToDishes}>
            <button>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add A Dish
            </button>
          </div>
          <div className="submission-btn">
            {dishesFetched.length > 0 ? (
              <div>
                {dishesToBeSent.length > 0 ? (
                  <button
                    onClick={() => {
                      submittingOrder();
                    }}
                    className="bg-green-500 hover:background-white hover:translate-x-2 py-2 px-5 rounded-full uppercase font-semibold tracking-wide text-gray-800 shadow-lg"
                  >
                    Submit Order to Kitchen
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUpDishes();
                    }}
                    className="bg-green-100 hover:background-white hover:translate-x-2 py-2 px-5 rounded-full uppercase font-semibold tracking-wide text-gray-500 shadow-lg"
                  >
                    Confirm Dishes
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className={`${dishClass}`}>
        <div className={`dishes`}>
          {filteredDishes ? (
            <div className="all-dishes">
              <div className="header">
                <button onClick={dishesToOrder}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <h1>All Dishes</h1>
              </div>
              <div className="search-part">
                <form className="search-form">
                  <label htmlFor="name">Search</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter dish name..."
                    ref={nameSearchRef}
                    onChange={onSearchNameInput}
                  />
                </form>
              </div>
              <div className="card-holder">
                {filteredDishes.map((dish) => (
                  <div key={dish._id} className="card">
                    <div className="image-side">
                      <Image
                        src={`${dish.image}`}
                        alt="dish image"
                        width={200}
                        height={200}
                        className="image"
                      ></Image>
                    </div>
                    <div className="info">
                      <p className="text-gray-600">{dish.name}</p>
                      {dish.availabilityStatus ? (
                        <button
                          onClick={() => {
                            addDishToOrder(dish._id);
                          }}
                        >
                          Add to Order
                        </button>
                      ) : (
                        <p className="text-red-500">
                          {" "}
                          <FaTimes /> Not Available
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : dishesLoading ? (
            <div>Loading</div>
          ) : dishesError ? (
            <div>Error While Getting Dishes</div>
          ) : (
            <div>Dishes were not fetched</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
