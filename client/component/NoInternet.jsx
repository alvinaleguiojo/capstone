import React, { useState, useEffect, useMemo } from "react";
import { notification } from "antd";

const Context = React.createContext({
  name: "Default",
});
const NoInternet = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isReady, setIsReady] = useState(false);
  const [isOnline, setIsOnline] = useState(isReady && navigator.onLine);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
      setIsReady(true);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  const openNotification = (placement) => {
    <Context.Consumer>
      {!isOnline
        ? api.error({
            // message: `No Internet Connection`,
            description: `Please check your Internet connection`,
            placement,
          })
        : api.success({
            // message: `You are connected`,
            description: `Internet connection was restored`,
            placement,
          })}
    </Context.Consumer>;
  };

  useEffect(() => {
    isReady && openNotification("bottomLeft");
  }, [isOnline]);

  const contextValue = useMemo(
    () => ({
      name: "Offline",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>{contextHolder}</Context.Provider>
  );
};

export default NoInternet;
