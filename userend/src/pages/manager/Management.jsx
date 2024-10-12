import { Suspense, lazy, useEffect, useState } from "react";

const ManagerPanel = lazy(() =>
  import("../../components/managerComponents/ManagerPanel")
);

const Management = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true on client side
    setIsClient(true);
  }, [isClient]);

  return (
    <div>
      {isClient && (
        <Suspense fallback={<div>Loading...</div>}>
          <ManagerPanel />
        </Suspense>
      )}
    </div>
  );
};

export default Management;
