import { useRouter } from "next/router";
import { useEffect } from "react";

const useConfirmExit = (message) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      const confirmLeave = window.confirm(message);
      if (!confirmLeave) {
        // Prevent navigation by emitting an error
        router.events.emit("routeChangeError");
        throw new Error("Route change cancelled");
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [message, router.events]);
};

export default useConfirmExit;
