import CashierHome from "@/components/CashierHome";
import useDishes from "@/components/hooks/dishHook";
import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import KitchenHome from "@/components/KitchenHome";
import ManagerHome from "@/components/ManagerHome";
import WaiterHome from "@/components/WaiterHome";
import Link from "next/link";
import useUser from "../components/hooks/userHook";

const Home = () => {
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

  return (
    <div className="">
      {user ? (
        <div>
          {user.role === "waiter" ? (
            <WaiterHome />
          ) : user.role === "cashier" ? (
            <CashierHome />
          ) : user.role === "manager" ? (
            <ManagerHome />
          ) : user.role === "kitchen" ? (
            <KitchenHome />
          ) : (
            <h1>You got no role in this company</h1>
          )}
        </div>
      ) : isLoading ? (
        <div className="w-screen h-[calc(90vh)] flex flex-col justify-center items-center text-4xl font-body">
          Loading session...
        </div>
      ) : error ? (
        <div className="w-screen h-[calc(90vh)] flex flex-col justify-center items-center  font-body bg-blue-50 gap-8">
          <p className="text-4xl">
            Previous session expired. Please login again
          </p>
          <Link
            href="/api/auth/signin?callbackUrl=/"
            className="font-body font-semi-bold bg-blue-100 px-10 py-2 rounded-full shadow-md"
          >
            Log In
          </Link>
        </div>
      ) : (
        <div className="w-screen h-[calc(90vh)] flex flex-col justify-center items-center  font-body bg-blue-50 gap-8">
          <p className="text-4xl">You are not logged in</p>
          <Link
            href="/api/auth/signin?callbackUrl=/"
            className="font-body font-semi-bold bg-blue-100 px-10 py-2 rounded-full shadow-md"
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
