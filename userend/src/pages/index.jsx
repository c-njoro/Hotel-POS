import CashierHome from "@/components/CashierHome";
import useDishes from "@/components/hooks/dishHook";
import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
import KitchenHome from "@/components/KitchenHome";
import ManagerHome from "@/components/ManagerHome";
import WaiterHome from "@/components/WaiterHome";
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
          User Loading...
        </div>
      ) : error ? (
        <div className="w-screen h-[calc(90vh)] flex flex-col justify-center items-center text-4xl font-body">
          Error fetching user, login again...
        </div>
      ) : (
        <div className="w-screen h-[calc(90vh)] flex flex-col justify-center items-center text-4xl font-body">
          You are not logged in
        </div>
      )}
    </div>
  );
};

export default Home;
