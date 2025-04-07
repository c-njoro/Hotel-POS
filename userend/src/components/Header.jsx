import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useMessages from "./hooks/messagesHook";
import useSessionHook from "./hooks/sessionHook";
import useUser from "./hooks/userHook";

const Header = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [menuClass, setMenuClass] = useState("hide");
  const [bell, setBell] = useState("");

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
    data: messages,
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessages(user?._id);

  useEffect(() => {
    if (messages) {
      const unread = messages.filter((msg) => !msg.opened);

      setBell(unread.length > 0 ? "on" : "");

      if (unread.length > 0) {
        playNotificationSound();
      }
    }
  }, [messages]);

  //play a notification mp3 sound
  const playNotificationSound = () => {
    const audio = new Audio("/images/notificationsound2.mp3"); // Replace with your audio file path
    audio.play().catch((err) => {
      console.error("Error playing notification sound: ", err);
    });
  };

  const toggleMenu = () => {
    if (menuClass === "hide") {
      setMenuClass("menu-show");
    } else {
      setMenuClass("hide");
    }
  };

  //hide the drop menu bar as the pages change and set previous page and current page to their respective changes
  useEffect(() => {
    setMenuClass("hide");
    setPrevPage(currentPage);
    setCurrentPage(router.pathname);
  }, [router.asPath]);

  //mark all messages as read once user visits the notifications page and then leaves
  useEffect(() => {
    if (prevPage === "/notifications") {
      const unread = messages.filter((msg) => !msg.opened);
      if (unread.length > 0) {
        try {
          unread.forEach((msg) => {
            axios
              .put(
                `${process.env.NEXT_PUBLIC_MESSAGES_URL}/markOpened/${msg._id}`
              )
              .catch((error) =>
                console.log("Could not mark message as opened:", error)
              );
          });
        } catch (error) {
          console.log("Error while reading all messages; ", error);
        }
      }
    }
  }, [currentPage, prevPage]);

  return (
    <div className="bg-blue-300 w-screen h-max flex flex-col text-black relative">
      <div className="bg-blue-100 flex flex-row justify-between p-4 items-center w-[calc(100vw)] h-[calc(10vh)] fixed z-10">
        <div className="logo sm:w-[calc(30vw)] w-[calc(50vw)] sm:h-[calc(10vh)] flex flex-col justify-center items-center">
          <Image
            src={`/images/SAVEDLOGO.png`}
            alt="company logo"
            width={300}
            height={100}
            className="rounded-full mix-blend-difference"
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
            <Link href="/notifications" className={`${bell} relative`}>
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
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
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
                <Link href="/profile" className="the-link">
                  Profile
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
                <Link href="/profile" className="the-link">
                  Profile
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
                <Link href="/profile" className="the-link">
                  Profile
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
                <Link href="/profile" className="the-link">
                  Profile
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
