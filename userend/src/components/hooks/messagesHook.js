import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMessages = async (userId) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_MESSAGES_URL}?receiver=${userId}`
  );
  const messages = response.data;
  console.log(userId);
  console.log(messages);
  return messages;
};

const useMessages = (userId) => {
  return useQuery({
    queryKey: ["messages"], // Unique key for the query
    queryFn: () => fetchMessages(userId), // The function that fetches the data
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

export default useMessages;
