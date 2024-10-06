import useDishes from "@/components/hooks/dishHook";
import useSessionHook from "@/components/hooks/sessionHook";
import useUser from "@/components/hooks/userHook";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const Kitchen = () => {
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

  const [filteredDishes, setFilteredDishes] = useState([]);
  const nameSearchRef = useRef("");

  //function to store dishes into the filtered dishes for easy manipulation
  useEffect(() => {
    setFilteredDishes(dishes);
  }, [dishes]);

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

  //functions to change dish availability
  const setToAvailable = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DISHES_URL}/update/${id}`,
        {
          availabilityStatus: true,
        }
      );

      refetchDishes();
    } catch (error) {
      console.log("Cannot change status; ", error);
    }
  };

  const setToUnavailable = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DISHES_URL}/update/${id}`,
        {
          availabilityStatus: false,
        }
      );

      refetchDishes();
    } catch (error) {
      console.log("Cannot change status; ", error);
    }
  };

  return (
    <div className="kitchen-dishes-container">
      <div className={`dishes`}>
        {filteredDishes ? (
          <div className="all-dishes">
            <div className="header">
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
                      <p className="text-green-500">
                        <FaCheck /> Available
                      </p>
                    ) : (
                      <p className="text-red-500">
                        <FaTimes /> Not Available
                      </p>
                    )}
                    {dish.availabilityStatus ? (
                      <button
                        onClick={() => {
                          setToUnavailable(dish._id);
                        }}
                      >
                        Make Unavailable
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setToAvailable(dish._id);
                        }}
                      >
                        Make Available
                      </button>
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
  );
};

export default Kitchen;
