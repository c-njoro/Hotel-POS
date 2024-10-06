import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch user by email from the API
const fetchUserByEmail = async (email) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_USERS_URL}/find`,
    { params: { email } }
  );
  return response.data;
};

// Custom React Query hook to fetch user data
const useUser = (email) => {
  return useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
    staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache remains for 10 minutes
    enabled: !!email, // Only fetch if email exists
  });
};

export default useUser;
