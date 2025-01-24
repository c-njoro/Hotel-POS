import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSessionHook from "./hooks/sessionHook";
import useUser from "./hooks/userHook";

const Header = () => {
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
  const router = useRouter();

  const [menuClass, setMenuClass] = useState("hide");
  const toggleMenu = () => {
    if (menuClass === "hide") {
      setMenuClass("menu-show");
    } else {
      setMenuClass("hide");
    }
  };

  useEffect(() => {
    // Set menu to hide on route change
    setMenuClass("hide");
  }, [router.asPath]);

  return (
    <div className="bg-blue-300 w-screen h-max flex flex-col text-black relative">
      <div className="bg-blue-100 flex flex-row justify-between p-4 items-center w-[calc(100vw)] h-[calc(10vh)] fixed z-10">
        <div className="logo sm:w-[calc(30vw)] w-[calc(50vw)] sm:h-[calc(10vh)] flex flex-col justify-center items-center">
          <Image
            src={`https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg`}
            alt="company logo"
            width={100}
            height={100}
            className="rounded-full"
          ></Image>
        </div>
        {user ? (
          <div className="sm:w-[calc(70vw)] w-[calc(50vw)] h-[calc(10vh)] flex flex-row justify-end items-center gap-10 ">
            <Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
            <button className="" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <Link
              href="/api/auth/signin?callbackUrl=/"
              className="font-body font-semi-bold"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      <div
        className={`${menuClass} flex flex-col justify-center items-center bg-blue-100 z-20 absolute top-[calc(10vh)] right-0`}
      >
        {user ? (
          <div className="w-screen sm:w-max   p-10 grid grid-cols-1 " id="menu">
            {user.role == "waiter" ? (
              <div className="link-holder">
                <Link href="/waiter/order" className="the-link">
                  Make an order
                </Link>
                <Link href="/changePassword" className="the-link">
                  Change Password
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
                <Link href="/" className="the-link">
                  Manage Orders Placed
                </Link>
                <Link href="/kitchen/dishesManagement" className="the-link">
                  Manage Dishes
                </Link>
                <Link href="/changePassword" className="the-link">
                  Change Password
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
                <Link href="/changePassword" className="the-link">
                  Change Password
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
                <Link href="/changePassword" className="the-link">
                  Change Password
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
        ) : (
          <div>You are not logged in</div>
        )}
      </div>
    </div>
  );
};

export default Header;
