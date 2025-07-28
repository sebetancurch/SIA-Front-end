"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/LoggedUserStore";

const SyncComponent = () => {
  const fetchNavigationData = useAuthStore((state) => state.fetchUserData);

  useEffect(() => {
    const syncData = async () => {
      await fetchNavigationData();
      // Optionally, fetch user data similarly
    };

    const intervalId = setInterval(syncData, 60000); // Sync every 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchNavigationData]);

  return null; // This component doesn't render anything
};

export default SyncComponent;
