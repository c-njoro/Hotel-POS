import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStock = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_STOCK_URL}`);
  const dishes = response.data;
  return dishes;
};

const useStock = () => {
  return useQuery({
    queryKey: ["stock"], // Unique key for the query
    queryFn: fetchStock, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 10000,
  });
};

export default useStock;
