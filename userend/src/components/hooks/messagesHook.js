import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMessages = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MESSAGES_URL}`);
  const dishes = response.data;
  return dishes;
};

const useMessages = () => {
  return useQuery({
    queryKey: ["dishes"], // Unique key for the query
    queryFn: fetchMessages, // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

export default useMessages;
