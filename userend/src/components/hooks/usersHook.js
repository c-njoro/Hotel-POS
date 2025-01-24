import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_USERS_URL}`);
  const orders = response.data;
  return orders;
};

const useUsers = () => {
  return useQuery({
    queryKey: ["users"], // Unique key for the query
    queryFn: fetchUsers, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 10000,
  });
};

export default useUsers;
