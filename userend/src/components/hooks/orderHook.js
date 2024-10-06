import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ORDERS_URL}`);
  const orders = response.data;
  return orders;
};

const useOrders = () => {
  return useQuery({
    queryKey: ["orders"], // Unique key for the query
    queryFn: fetchOrders, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 10000,
  });
};

export default useOrders;
