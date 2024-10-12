import useDishes from "@/components/hooks/dishHook";
import useOrders from "@/components/hooks/orderHook";
import useSessionHook from "@/components/hooks/sessionHook";
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
    <div className="main-home-container">
      <div className="mini-container">
        {user ? (
          <div key={user._id} className="links">
            {user.role == "waiter" ? (
              <div className="link-holder">
                <Link href="/waiter/order" className="the-link">
                  Make an order
                </Link>
                <Link href="/waiter/editOrder" className="the-link">
                  Update my orders
                </Link>

                <Link
                  href="/api/auth/signout?callbackUrl=/"
                  className="the-link"
                >
                  Log Out
                </Link>
              </div>
            ) : user.role == "kitchen" ? (
              <div className="link-holder">
                <Link href="/kitchen/orderManagement" className="the-link">
                  Manage Orders Placed
                </Link>
                <Link href="/kitchen/dishesManagement" className="the-link">
                  Manage Dishes
                </Link>
                <Link
                  href="/api/auth/signout?callbackUrl=/"
                  className="the-link"
                >
                  Log Out
                </Link>
              </div>
            ) : user.role == "manager" ? (
              <div className="link-holder">
                <Link href="/manager" className="the-link">
                  Go to my manager page
                </Link>
                <Link
                  href="/api/auth/signout?callbackUrl=/"
                  className="the-link"
                >
                  Log Out
                </Link>
              </div>
            ) : user.role == "cashier" ? (
              <div className="link-holder">
                <Link href="/cashier" className="the-link">
                  Go to cashiers page
                </Link>
                <Link
                  href="/api/auth/signout?callbackUrl=/"
                  className="the-link"
                >
                  Log Out
                </Link>
              </div>
            ) : (
              <div className="link-holder">
                <h1>You have no role in the company</h1>
              </div>
            )}
          </div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>User Error</div>
        ) : (
          <div className="uppercase font-bold text-red-700 tracking-wider ">
            You are not logged in
          </div>
        )}
        <div className="motivation">
          <h1>A way to be happy is to make someone else happy</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
