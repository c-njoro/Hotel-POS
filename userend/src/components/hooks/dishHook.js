import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDishes = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_DISHES_URL}`);
  const dishes = response.data;
  return dishes;
};

const useDishes = () => {
  return useQuery({
    queryKey: ["dishes"], // Unique key for the query
    queryFn: fetchDishes, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 5000,
  });
};

export default useDishes;
