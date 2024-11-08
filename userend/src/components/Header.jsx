import Image from "next/image";
import Link from "next/link";
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
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser(sessionData?.email);
  return (
    <div className="main-header-container">
      <div className="logo">
        <Image
          src="/images/SAVEDLOGO.png"
          alt="hotel logo"
          className="image"
          priority
          width={700}
          height={700}
        ></Image>
      </div>
      <div className="icons">
        <div className="icon">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon-itself "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="user">
        {user ? (
          <div className="info">
            <p className="name">
              {user.name}, {user.role}
            </p>
          </div>
        ) : userLoading ? (
          <div className="info">
            <p className="name">Loading...</p>
          </div>
        ) : userError ? (
          <div className="info">
            <p className="name">Error occurred</p>
            <Link href="/api/auth/signin?callbackUrl=/" className="login-link">
              Log in again
            </Link>
          </div>
        ) : (
          <div className="info">
            <Link className="login-link" href="/api/auth/signin?callbackUrl=/">
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
