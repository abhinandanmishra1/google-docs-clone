import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io.connect(import.meta.env.VITE_DOCS_SERVER_BASE_URL, {
      query: {
        token,
      },
    });

    socket?.on("connect", () => {
      console.log("connected");
    });

    socket?.on("disconnect", () => {
      socket?.emit("disconnect-event");
    });

    setSocket(socket);

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, token }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
