import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSession = async () => {
  const response = await axios.get("/api/check-auth");
  const received = response.data;
  return received.user;
};

const useSessionHook = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export default useSessionHook;
